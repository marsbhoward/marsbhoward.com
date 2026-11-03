// The game itself: a small tile-based engine that draws to a 160x144 canvas.
// It knows nothing about React or routing. The UI feeds it button presses and
// is told which door the player walked through via `onDoor`.
import {
  TILE,
  MAP,
  BUILDINGS,
  ROVER_AT,
  windowOf,
  drawText,
  buildSprites,
  buildMapCanvas,
} from "./art";

export type Direction = "up" | "down" | "left" | "right";
export type GameButton = Direction | "a" | "b" | "select";
export type DoorId = (typeof BUILDINGS)[number]["id"];

type Building = (typeof BUILDINGS)[number];
type Mode = "boot" | "play" | "dialog" | "entering" | "left";
type Dialog = {
  pages: string[][];
  page: number;
  shown: number;
  // Runs if the player answers the last page with A.
  onConfirm?: () => void;
};
type Entering = {
  building: Building;
  elapsed: number;
  startY: number;
  left: boolean;
};

type GameOptions = {
  onDoor: (id: DoorId) => void;
  onBooted?: () => void;
  onNightChoice?: (night: boolean) => void;
  skipBoot?: boolean;
  returnDoor?: DoorId | null;
  reducedMotion?: boolean;
};

const WIDTH = 160;
const HEIGHT = 144;
const MAP_WIDTH = MAP[0].length * TILE;
const MAP_HEIGHT = MAP.length * TILE;

const DIRECTIONS: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

const isDirection = (button: GameButton): button is Direction =>
  button in DIRECTIONS;

const WALK_MS = 200;
const RUN_MS = 110;

// Colours change every 250ms, keeping the flash under 3 flashes per second
// (the WCAG photosensitivity threshold).
const BOOT_FRAME_MS = 250;
const BOOT_FRAMES = [
  ["#102060", "#f8e060"],
  ["#f8e060", "#102060"],
  ["#084848", "#50e0c0"],
  ["#50e0c0", "#084848"],
  ["#401858", "#f898c8"],
  ["#f898c8", "#401858"],
  ["#102060", "#f8f8f8"],
  ["#f8f8f8", "#102060"],
];
const REDUCED_BOOT_MS = 1500;

const DOOR_OPEN_MS = 180;
const DOOR_WALK_MS = 420;
const FADE_MS = 350;
const NIGHT_MS = 600;

const INTRO = [
  "BEEP BOOP! WELCOME, VISITOR! I'M ROVER.",
  "MARS IS A SOFTWARE ENGINEER.",
  "WALK THROUGH A DOOR TO LEARN MORE ABOUT MARS.",
  "PRESS A TO TALK OR READ.",
  "TALK TO ME ANY TIME TO SWITCH DAY AND NIGHT.",
];
const ROVER_ASK_NIGHT = "WANT ME TO MAKE IT NIGHT? A: YES. B: NO.";
const ROVER_ASK_DAY = "WANT ME TO MAKE IT DAY? A: YES. B: NO.";
const HELP = [
  "D-PAD: WALK. HOLD B: RUN. A: TALK, READ OR OPEN. SKIP: LEAVE THE GAME.",
];

const LINE_CHARS = 24;
const LINES_PER_PAGE = 2;
const CHAR_MS = 22;

function paginate(paragraphs: string[]) {
  const pages: string[][] = [];
  paragraphs.forEach((text) => {
    const lines: string[] = [];
    let line = "";
    text.split(" ").forEach((word) => {
      if (line && line.length + 1 + word.length > LINE_CHARS) {
        lines.push(line);
        line = word;
      } else {
        line = line ? `${line} ${word}` : word;
      }
    });
    lines.push(line);
    for (let i = 0; i < lines.length; i += LINES_PER_PAGE) {
      pages.push(lines.slice(i, i + LINES_PER_PAGE));
    }
  });
  return pages;
}

const doorAt = (x: number, y: number) =>
  BUILDINGS.find((b) => b.door.x === x && b.door.y === y);
const signAt = (x: number, y: number) =>
  BUILDINGS.find((b) => b.signAt.x === x && b.signAt.y === y);
const roverAt = (x: number, y: number) => x === ROVER_AT.x && y === ROVER_AT.y;

function isWalkable(x: number, y: number) {
  const tile = MAP[y]?.[x];
  return (tile === "." || tile === "p" || tile === "f") && !roverAt(x, y);
}

export function createGame(
  canvas: HTMLCanvasElement,
  {
    onDoor,
    onBooted,
    onNightChoice,
    skipBoot = false,
    returnDoor = null,
    reducedMotion = false,
  }: GameOptions,
) {
  const ctx = canvas.getContext("2d")!;
  const sprites = buildSprites();
  const mapCanvas = buildMapCanvas();

  const player = {
    x: 7,
    y: 7,
    facing: "right" as Direction,
    stepping: false,
    progress: 0,
    fromX: 7,
    fromY: 7,
    foot: 1,
  };
  let mode: Mode = "boot";
  let held: Direction[] = [];
  let pendingDirection: Direction | null = null;
  let running = false;
  let bootElapsed = 0;
  let fade = 0;
  let fadeSpeed = 0;
  let dialog: Dialog | null = null;
  let night = false;
  let nightLevel = 0;
  // Set once the player starts through a door, which is the end of the game.
  let entering: Entering | null = null;
  let clock = 0;
  let frameId = 0;
  let lastTime: number | null = null;

  function placeAtDoor(id: DoorId) {
    const building = BUILDINGS.find((b) => b.id === id);
    if (!building) return;
    player.x = player.fromX = building.door.x;
    player.y = player.fromY = building.door.y + 1;
    player.facing = "down";
  }

  function fadeIn() {
    fade = 1;
    fadeSpeed = -1 / FADE_MS;
  }

  function openDialog(paragraphs: string[], onConfirm?: () => void) {
    dialog = {
      pages: paginate(paragraphs),
      page: 0,
      shown: reducedMotion ? Infinity : 0,
      onConfirm,
    };
    mode = "dialog";
  }

  function closeDialog() {
    dialog = null;
    mode = "play";
  }

  function advanceDialog(button: GameButton) {
    if (!dialog) return;
    const pageLength = dialog.pages[dialog.page].join("").length;
    if (dialog.shown < pageLength) {
      dialog.shown = Infinity;
    } else if (dialog.page < dialog.pages.length - 1) {
      dialog.page += 1;
      dialog.shown = reducedMotion ? Infinity : 0;
    } else {
      const confirm = button === "a" ? dialog.onConfirm : undefined;
      closeDialog();
      confirm?.();
    }
  }

  // The page owns the theme, so a choice goes out through `onNightChoice` and
  // comes back here. It jumps when nobody could watch the change happen.
  function setNight(value: boolean) {
    night = value;
    if (reducedMotion || mode === "boot" || fade > 0) nightLevel = value ? 1 : 0;
  }

  function askAboutNight() {
    openDialog([night ? ROVER_ASK_DAY : ROVER_ASK_NIGHT], () =>
      onNightChoice?.(!night),
    );
  }

  function endBoot() {
    pendingDirection = null;
    fadeIn();
    openDialog(INTRO);
    onBooted?.();
  }

  function enterDoor(building: Building) {
    mode = "entering";
    player.facing = "up";
    entering = { building, elapsed: 0, startY: player.y * TILE, left: false };
  }

  // The browser's back button can restore this page exactly as it was left: mid
  // exit, with a white screen. Put the player back outside that door.
  function returnToTown() {
    if (!entering) return;
    placeAtDoor(entering.building.id);
    entering = null;
    mode = "play";
    releaseAll();
    fadeIn();
  }

  function interact() {
    const direction = DIRECTIONS[player.facing];
    const x = player.x + direction.x;
    const y = player.y + direction.y;
    const door = player.facing === "up" && doorAt(x, y);
    const sign = signAt(x, y);
    if (door) enterDoor(door);
    else if (sign) openDialog([sign.sign]);
    else if (roverAt(x, y)) askAboutNight();
  }

  function press(button: GameButton) {
    if (isDirection(button)) {
      held = held.filter((d) => d !== button).concat(button);
      pendingDirection = button;
    }
    if (button === "b") running = true;

    if (mode === "boot") {
      endBoot();
    } else if (mode === "dialog") {
      if (isDirection(button)) closeDialog();
      else if (button === "a" || button === "b") advanceDialog(button);
    } else if (mode === "play" && !player.stepping) {
      if (button === "a") interact();
      if (button === "select") openDialog(HELP);
    }
  }

  function release(button: GameButton) {
    held = held.filter((d) => d !== button);
    if (button === "b") running = false;
  }

  function releaseAll() {
    held = [];
    running = false;
  }

  function tryStartStep() {
    const direction = pendingDirection || held[held.length - 1];
    pendingDirection = null;
    if (!direction) return;
    player.facing = direction;
    const x = player.x + DIRECTIONS[direction].x;
    const y = player.y + DIRECTIONS[direction].y;
    const door = direction === "up" && doorAt(x, y);
    if (door) {
      enterDoor(door);
    } else if (isWalkable(x, y)) {
      player.fromX = player.x;
      player.fromY = player.y;
      player.x = x;
      player.y = y;
      player.stepping = true;
      player.progress = 0;
      player.foot = player.foot === 1 ? 2 : 1;
    }
  }

  function updatePlay(dt: number) {
    if (player.stepping) {
      player.progress += dt / (running ? RUN_MS : WALK_MS);
      if (player.progress < 1) return;
      player.stepping = false;
      player.progress = 0;
      player.fromX = player.x;
      player.fromY = player.y;
    }
    tryStartStep();
  }

  function updateEntering(dt: number) {
    if (!entering) return;
    entering.elapsed += dt;
    if (entering.elapsed >= DOOR_OPEN_MS + DOOR_WALK_MS && fadeSpeed <= 0) {
      fadeSpeed = 1 / FADE_MS;
    }
    if (fade >= 1 && !entering.left) {
      entering.left = true;
      mode = "left";
      onDoor(entering.building.id);
    }
  }

  function update(dt: number) {
    clock += dt;
    fade = Math.min(1, Math.max(0, fade + fadeSpeed * dt));
    nightLevel = Math.min(
      1,
      Math.max(0, nightLevel + ((night ? 1 : -1) * dt) / NIGHT_MS),
    );

    if (mode === "boot") {
      bootElapsed += dt;
      const total = reducedMotion
        ? REDUCED_BOOT_MS
        : BOOT_FRAME_MS * BOOT_FRAMES.length;
      if (bootElapsed >= total) endBoot();
    } else if (mode === "play") {
      updatePlay(dt);
    } else if (mode === "dialog" && dialog && dialog.shown !== Infinity) {
      dialog.shown += dt / CHAR_MS;
    } else if (mode === "entering") {
      updateEntering(dt);
    }
  }

  function drawBoot() {
    const index = reducedMotion
      ? 0
      : Math.min(
          Math.floor(bootElapsed / BOOT_FRAME_MS),
          BOOT_FRAMES.length - 1,
        );
    const [background, foreground] = BOOT_FRAMES[index];
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    // Letters are stretched tall so that the two words fill the whole screen.
    drawText(ctx, "HELLO", 7, 6, foreground, 5, 9);
    drawText(ctx, "WORLD", 7, 75, foreground, 5, 9);
  }

  function playerPixels() {
    if (entering) {
      const walked = Math.min(
        1,
        Math.max(0, (entering.elapsed - DOOR_OPEN_MS) / DOOR_WALK_MS),
      );
      return { x: player.x * TILE, y: entering.startY - walked * TILE * 2 };
    }
    const t = player.stepping ? player.progress : 1;
    return {
      x: (player.fromX + (player.x - player.fromX) * t) * TILE,
      y: (player.fromY + (player.y - player.fromY) * t) * TILE,
    };
  }

  function drawWaterRipples(camX: number, camY: number) {
    const phase = reducedMotion ? 0 : Math.floor(clock / 500) % 2;
    ctx.fillStyle = "#88c8f8";
    MAP.forEach((line, row) => {
      for (let col = 0; col < line.length; col++) {
        if (line[col] !== "W") continue;
        const x = col * TILE - camX;
        const y = row * TILE - camY;
        ctx.fillRect(x + 2 + phase * 2, y + 4, 4, 1);
        ctx.fillRect(x + 9 - phase * 2, y + 10, 4, 1);
      }
    });
  }

  function drawNight(camX: number, camY: number) {
    if (nightLevel === 0) return;
    // Hard steps, like the fade.
    const level = Math.ceil(nightLevel * 4) / 4;
    ctx.save();
    ctx.globalAlpha = level;
    ctx.globalCompositeOperation = "multiply";
    ctx.fillStyle = "#40488c";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "#f8d868";
    BUILDINGS.forEach((building) => {
      const { x, y } = windowOf(building);
      ctx.fillRect(x - camX + 1, y - camY + 1, 7, 9);
      ctx.fillRect(x - camX + 10, y - camY + 1, 7, 9);
    });
    ctx.restore();
  }

  function drawDialog() {
    if (!dialog) return;
    const page = dialog.pages[dialog.page];
    const top = HEIGHT - 34;
    ctx.fillStyle = "#181828";
    ctx.fillRect(2, top, WIDTH - 4, 32);
    ctx.fillStyle = "#f8f8f8";
    ctx.fillRect(4, top + 2, WIDTH - 8, 28);

    let remaining = Math.floor(dialog.shown);
    page.forEach((line, index) => {
      const visible = line.slice(0, Math.max(0, remaining));
      drawText(ctx, visible, 8, top + 6 + index * 11, "#181828");
      remaining -= line.length;
    });

    const finished = dialog.shown >= page.join("").length;
    if (finished && (reducedMotion || Math.floor(clock / 400) % 2 === 0)) {
      ctx.fillStyle = "#e04830";
      ctx.fillRect(WIDTH - 15, top + 23, 7, 1);
      ctx.fillRect(WIDTH - 14, top + 24, 5, 1);
      ctx.fillRect(WIDTH - 13, top + 25, 3, 1);
      ctx.fillRect(WIDTH - 12, top + 26, 1, 1);
    }
  }

  function draw() {
    if (mode === "boot") {
      drawBoot();
      return;
    }

    const position = playerPixels();
    // The camera stays put while the player walks in through a door.
    const focusY = entering ? entering.startY : position.y;
    const camX = Math.round(
      Math.min(
        MAP_WIDTH - WIDTH,
        Math.max(0, position.x + TILE / 2 - WIDTH / 2),
      ),
    );
    const camY = Math.round(
      Math.min(
        MAP_HEIGHT - HEIGHT,
        Math.max(0, focusY + TILE / 2 - HEIGHT / 2),
      ),
    );

    ctx.drawImage(mapCanvas, -camX, -camY);
    drawWaterRipples(camX, camY);
    ctx.drawImage(
      sprites.rover,
      ROVER_AT.x * TILE - camX,
      ROVER_AT.y * TILE - camY,
    );

    if (entering && entering.elapsed >= DOOR_OPEN_MS / 2) {
      const door = entering.building.door;
      ctx.fillStyle = "#100808";
      ctx.fillRect(door.x * TILE - camX + 2, door.y * TILE - camY + 1, 12, 15);
    }

    const frames = sprites[player.facing];
    let frame = 0;
    if (entering && mode === "entering") {
      frame = Math.floor(entering.elapsed / 100) % 2 ? 1 : 2;
    } else if (player.stepping && player.progress < 0.5) {
      frame = player.foot;
    }
    const spriteX = Math.round(position.x) - camX;
    const spriteY = Math.round(position.y) - camY;
    if (entering) {
      // Hide the part of the sprite that has passed through the door frame.
      const door = entering.building.door;
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, door.y * TILE - camY + 1, WIDTH, HEIGHT);
      ctx.clip();
      ctx.drawImage(frames[frame], spriteX, spriteY);
      ctx.restore();
    } else {
      ctx.drawImage(frames[frame], spriteX, spriteY);
    }

    drawNight(camX, camY);

    if (mode === "dialog") drawDialog();

    if (fade > 0) {
      // Four hard steps rather than a smooth fade, as on the original hardware.
      ctx.fillStyle = `rgba(248, 248, 248, ${Math.ceil(fade * 4) / 4})`;
      ctx.fillRect(0, 0, WIDTH, HEIGHT);
    }
  }

  function tick(time: number) {
    const dt = lastTime === null ? 0 : Math.min(50, time - lastTime);
    lastTime = time;
    update(dt);
    draw();
    frameId = requestAnimationFrame(tick);
  }

  function start() {
    frameId = requestAnimationFrame(tick);
  }

  function destroy() {
    cancelAnimationFrame(frameId);
  }

  if (returnDoor) placeAtDoor(returnDoor);
  if (skipBoot) {
    mode = "play";
    fadeIn();
  }

  return { start, destroy, press, release, releaseAll, returnToTown, setNight };
}
