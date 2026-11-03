// All pixel art for the Game Boy landing page: font, sprites and the town map.
// Everything is drawn in code at the handheld's native 160x144 resolution.

export const TILE = 16;

// Each glyph is 7 rows of 5-bit pixels, written as hex pairs.
const FONT: Record<string, string> = {
  A: "0E11111F111111",
  B: "1E11111E11111E",
  C: "0E11101010110E",
  D: "1E11111111111E",
  E: "1F10101E10101F",
  F: "1F10101E101010",
  G: "0E11101711110F",
  H: "1111111F111111",
  I: "0E04040404040E",
  J: "0702020202120C",
  K: "11121418141211",
  L: "1010101010101F",
  M: "111B1515111111",
  N: "11191513111111",
  O: "0E11111111110E",
  P: "1E11111E101010",
  Q: "0E11111115120D",
  R: "1E11111E141211",
  S: "0F10100E01011E",
  T: "1F040404040404",
  U: "1111111111110E",
  V: "11111111110A04",
  W: "1111111515150A",
  X: "11110A040A1111",
  Y: "11110A04040404",
  Z: "1F01020408101F",
  ".": "00000000000C0C",
  ",": "000000000C0408",
  "!": "04040404040004",
  "?": "0E110102040004",
  "'": "04040800000000",
  "-": "0000001F000000",
  ":": "000C0C000C0C00",
};

export function drawText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  color: string,
  scaleX = 1,
  scaleY = 1,
) {
  ctx.fillStyle = color;
  let cursor = x;
  for (const char of text) {
    const glyph = FONT[char];
    if (glyph) {
      for (let row = 0; row < 7; row++) {
        const bits = parseInt(glyph.slice(row * 2, row * 2 + 2), 16);
        for (let col = 0; col < 5; col++) {
          if (bits & (16 >> col)) {
            ctx.fillRect(
              cursor + col * scaleX,
              y + row * scaleY,
              scaleX,
              scaleY,
            );
          }
        }
      }
    }
    cursor += 6 * scaleX;
  }
}

const COLORS: Record<string, string> = {
  k: "#181828",
  w: "#f8f8f8",
  g: "#a8b0c8",
  v: "#203060",
  b: "#70c8f8",
  r: "#e04830",
  o: "#e89030",
  y: "#f8e060",
  c: "#50d0a0",
};

const HEAD_DOWN = [
  "....kkkkkkkk....",
  "...kwwwwwwwwk...",
  "..kwwwwwwwwwwk..",
  "..kwvvvvvvvvwk..",
  "..kwvbbvvvvvwk..",
  "..kwvvvvvvvvwk..",
  "..kgwwwwwwwwgk..",
  "...kkkkkkkkkk...",
];
const HEAD_UP = [
  "....kkkkkkkk....",
  "...kwwwwwwwwk...",
  "..kwwwwwwwwwwk..",
  "..kwwwwwwwwwwk..",
  "..kwwwwwwwwwwk..",
  "..kwwwwwwwwwwk..",
  "..kgwwwwwwwwgk..",
  "...kkkkkkkkkk...",
];
const HEAD_SIDE = [
  "....kkkkkkkk....",
  "...kwwwwwwwwk...",
  "..kwwwwwwwwwwk..",
  "..kwwwwvvvvvvk..",
  "..kwwwwvbbvvvk..",
  "..kwwwwvvvvvvk..",
  "..kgwwwwwwwwgk..",
  "...kkkkkkkkkk...",
];
const BODY_DOWN = [
  "..kwwwrrrrwwwk..",
  ".kgkwwrrrrwwkgk.",
  ".kgkwwwwwwwwkgk.",
  "..kkwwwwwwwwkk..",
];
const BODY_UP = [
  "..kwggggggggwk..",
  ".kgkggggggggkgk.",
  ".kgkggggggggkgk.",
  "..kkwwwwwwwwkk..",
];
const BODY_SIDE = [
  "...kgwwwrrwwk...",
  "..kggkwwrrwwk...",
  "..kggkwwwwwwk...",
  "...kkwwwwwwk....",
];
const LEGS_STAND = [
  "...kwwwkkwwwk...",
  "...kgggkkgggk...",
  "...krrkkkkrrk...",
  "....kk....kk....",
];
const LEGS_LEFT = [
  "...kwwwkkwwwk...",
  "...kgggkkgggk...",
  "...krrk..kggk...",
  "....kk...krrk...",
];
const LEGS_RIGHT = [
  "...kwwwkkwwwk...",
  "...kgggkkgggk...",
  "...kggk..krrk...",
  "...krrk...kk....",
];
const LEGS_SIDE_STAND = [
  "....kwwwwwwk....",
  "....kggkkggk....",
  "....krrkkrrk....",
  ".....kk..kk.....",
];
const LEGS_SIDE_WALK = [
  "...kwwwwwwwwk...",
  "..kggkk...kggk..",
  "..krrk....krrk..",
  "...kk......kk...",
];
const ROVER = [
  "................",
  "....kkkkkkkk....",
  "....kbcwwbbk....",
  "....kkkkkkkk....",
  ".......kk.......",
  ".......kk.......",
  "..kkkkkkkkkkkk..",
  "..kooooooooook..",
  "..koyyoooooook..",
  "..kooooooooook..",
  "..kkkkkkkkkkkk..",
  "...k........k...",
  "..kkk..kk..kkk..",
  ".kgggkkgggkkgggk",
  ".kgkgkkgkgkkgkgk",
  "..kkk..kkk..kkk.",
];

const SPRITE_FRAMES = {
  down: [
    HEAD_DOWN.concat(BODY_DOWN, LEGS_STAND),
    HEAD_DOWN.concat(BODY_DOWN, LEGS_LEFT),
    HEAD_DOWN.concat(BODY_DOWN, LEGS_RIGHT),
  ],
  up: [
    HEAD_UP.concat(BODY_UP, LEGS_STAND),
    HEAD_UP.concat(BODY_UP, LEGS_LEFT),
    HEAD_UP.concat(BODY_UP, LEGS_RIGHT),
  ],
  side: [
    HEAD_SIDE.concat(BODY_SIDE, LEGS_SIDE_STAND),
    HEAD_SIDE.concat(BODY_SIDE, LEGS_SIDE_WALK),
    HEAD_SIDE.concat(BODY_SIDE, LEGS_SIDE_WALK),
  ],
};

function renderSprite(rows: string[], mirror = false) {
  const canvas = document.createElement("canvas");
  canvas.width = TILE;
  canvas.height = TILE;
  const ctx = canvas.getContext("2d")!;
  rows.forEach((row, y) => {
    for (let x = 0; x < TILE; x++) {
      const color = COLORS[row[x]];
      if (color) {
        ctx.fillStyle = color;
        ctx.fillRect(mirror ? TILE - 1 - x : x, y, 1, 1);
      }
    }
  });
  return canvas;
}

export function buildSprites() {
  return {
    down: SPRITE_FRAMES.down.map((rows) => renderSprite(rows)),
    up: SPRITE_FRAMES.up.map((rows) => renderSprite(rows)),
    right: SPRITE_FRAMES.side.map((rows) => renderSprite(rows)),
    left: SPRITE_FRAMES.side.map((rows) => renderSprite(rows, true)),
    rover: renderSprite(ROVER),
  };
}

// T tree, # building, . grass, p path, f flower, W water, S sign
export const MAP = [
  "TTTTTTTTTTTTTTTT",
  "T####.####.####T",
  "T####f####.####T",
  "T####.####f####T",
  "T####.####.####T",
  "T.pS...pS...pS.T",
  "T.ppppppppppp..T",
  "T......p...####T",
  "T.f....p...####T",
  "T..WWW.p...####T",
  "T..WWW.p.f.####T",
  "T......ppppppS.T",
  "TTTTTTTTTTTTTTTT",
];

// `col` and `row` are the building's top-left tile. Its door is one tile in, on the bottom row,
// and its sign stands on the grass just right of the doorstep.
export const BUILDINGS = [
  {
    id: "about",
    label: "ABOUT",
    col: 1,
    row: 1,
    roof: "#d84848",
    roofDark: "#a83038",
    sign: "ABOUT: GET TO KNOW MARS.",
  },
  {
    id: "projects",
    label: "PROJECTS",
    col: 6,
    row: 1,
    roof: "#3878d0",
    roofDark: "#2858a0",
    sign: "PROJECTS: SEE WHAT MARS HAS BUILT.",
  },
  {
    id: "resume",
    label: "RESUME",
    col: 11,
    row: 1,
    roof: "#e88a28",
    roofDark: "#b86818",
    sign: "RESUME: EXPERIENCE AND SKILLS.",
  },
  {
    id: "github",
    label: "GITHUB",
    col: 11,
    row: 7,
    roof: "#8850c8",
    roofDark: "#6838a0",
    sign: "GITHUB: READ MARS'S CODE. THIS DOOR LEADS OUT OF TOWN!",
  },
].map((building) => ({
  ...building,
  door: { x: building.col + 1, y: building.row + 3 },
  signAt: { x: building.col + 2, y: building.row + 4 },
}));

export const ROVER_AT = { x: 8, y: 7 };

const px = (
  ctx: CanvasRenderingContext2D,
  color: string,
  x: number,
  y: number,
  w = 1,
  h = 1,
) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
};

function paintGrass(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  col: number,
  row: number,
) {
  px(ctx, "#78c850", x, y, TILE, TILE);
  // Tufts vary by tile so the field doesn't look like wallpaper.
  const seed = (col * 7 + row * 13) % 5;
  px(ctx, "#58a838", x + 3 + seed, y + 4, 1, 2);
  px(ctx, "#58a838", x + 2 + seed, y + 5, 1, 1);
  px(ctx, "#58a838", x + 11 - seed, y + 11, 1, 2);
  px(ctx, "#58a838", x + 12 - seed, y + 12, 1, 1);
}

function paintPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  col: number,
  row: number,
) {
  px(ctx, "#e8d090", x, y, TILE, TILE);
  const seed = (col * 5 + row * 3) % 6;
  px(ctx, "#c8a868", x + 2 + seed, y + 3);
  px(ctx, "#c8a868", x + 10 - seed, y + 8);
  px(ctx, "#c8a868", x + 5 + seed, y + 13);
}

function paintTree(ctx: CanvasRenderingContext2D, x: number, y: number) {
  px(ctx, "#78c850", x, y, TILE, TILE);
  px(ctx, "#785028", x + 6, y + 12, 4, 4);
  px(ctx, "#205830", x + 3, y + 1, 10, 12);
  px(ctx, "#205830", x + 1, y + 3, 14, 8);
  px(ctx, "#38883c", x + 4, y + 2, 8, 9);
  px(ctx, "#38883c", x + 2, y + 4, 12, 5);
  px(ctx, "#60b050", x + 5, y + 3, 3, 2);
  px(ctx, "#60b050", x + 3, y + 5, 2, 2);
}

function paintFlower(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  col: number,
  row: number,
) {
  paintGrass(ctx, x, y, col, row);
  const spots: [number, number, string][] = [
    [3, 3, "#f85888"],
    [10, 5, "#f8e060"],
    [5, 11, "#f8f8f8"],
  ];
  spots.forEach(([dx, dy, color]) => {
    px(ctx, color, x + dx - 1, y + dy);
    px(ctx, color, x + dx + 1, y + dy);
    px(ctx, color, x + dx, y + dy - 1);
    px(ctx, color, x + dx, y + dy + 1);
    px(ctx, "#e8a020", x + dx, y + dy);
  });
}

function paintSign(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  col: number,
  row: number,
) {
  paintGrass(ctx, x, y, col, row);
  px(ctx, "#785028", x + 7, y + 10, 2, 5);
  px(ctx, "#583818", x + 2, y + 2, 12, 9);
  px(ctx, "#c89858", x + 3, y + 3, 10, 7);
  px(ctx, "#583818", x + 5, y + 5, 6, 1);
  px(ctx, "#583818", x + 5, y + 7, 6, 1);
}

function paintBuilding(
  ctx: CanvasRenderingContext2D,
  building: (typeof BUILDINGS)[number],
) {
  const x = building.col * TILE;
  const y = building.row * TILE;
  const width = TILE * 4;

  // Roof
  px(ctx, "#181828", x, y, width, 33);
  px(ctx, building.roof, x + 1, y + 1, width - 2, 31);
  for (let stripe = 5; stripe < 31; stripe += 6) {
    px(ctx, building.roofDark, x + 1, y + stripe, width - 2, 2);
  }

  // Wall
  px(ctx, "#f8e8c8", x, y + 32, width, 32);
  px(ctx, "#181828", x, y + 32, 1, 32);
  px(ctx, "#181828", x + width - 1, y + 32, 1, 32);
  px(ctx, "#c8b090", x + 1, y + 61, width - 2, 3);

  // Name plate
  px(ctx, "#203060", x + 2, y + 34, width - 4, 11);
  const textWidth = building.label.length * 6 - 1;
  drawText(
    ctx,
    building.label,
    x + Math.floor((width - textWidth) / 2),
    y + 36,
    "#f8f8f8",
  );

  // Window, to the right of the door
  const windowX = x + TILE * 2 + 6;
  px(ctx, "#181828", windowX, y + 48, 18, 11);
  px(ctx, "#70c8f8", windowX + 1, y + 49, 16, 9);
  px(ctx, "#181828", windowX + 8, y + 49, 2, 9);
  px(ctx, "#f8f8f8", windowX + 2, y + 50, 3, 1);

  // Door
  const doorX = building.door.x * TILE;
  const doorY = building.door.y * TILE;
  px(ctx, "#181828", doorX + 1, doorY, 14, TILE);
  px(ctx, "#985828", doorX + 2, doorY + 1, 12, 15);
  px(ctx, "#784018", doorX + 4, doorY + 3, 8, 4);
  px(ctx, "#784018", doorX + 4, doorY + 9, 8, 5);
  px(ctx, "#f8e060", doorX + 11, doorY + 8, 2, 2);
}

export function buildMapCanvas() {
  const canvas = document.createElement("canvas");
  canvas.width = MAP[0].length * TILE;
  canvas.height = MAP.length * TILE;
  const ctx = canvas.getContext("2d")!;
  MAP.forEach((line, row) => {
    for (let col = 0; col < line.length; col++) {
      const x = col * TILE;
      const y = row * TILE;
      switch (line[col]) {
        case "T":
          paintTree(ctx, x, y);
          break;
        case "p":
          paintPath(ctx, x, y, col, row);
          break;
        case "f":
          paintFlower(ctx, x, y, col, row);
          break;
        case "S":
          paintSign(ctx, x, y, col, row);
          break;
        case "W":
          px(ctx, "#3880e0", x, y, TILE, TILE);
          break;
        default:
          paintGrass(ctx, x, y, col, row);
      }
    }
  });
  BUILDINGS.forEach((building) => paintBuilding(ctx, building));
  return canvas;
}
