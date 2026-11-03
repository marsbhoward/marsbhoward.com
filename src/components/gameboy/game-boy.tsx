"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type PointerEvent,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { site } from "@/lib/data";
import {
  createGame,
  type Direction,
  type DoorId,
  type GameButton,
} from "./game";
import "./gameboy.css";

type HandheldButton = GameButton | "skip";

// Where the Skip button goes: the normal site.
const SKIP_ROUTE = "/home";
const DOOR_ROUTES: Record<DoorId, string> = {
  about: "/home#about",
  projects: "/home#projects",
  resume: "/resume",
  github: site.socials.github,
};

const KEY_BINDINGS: Record<string, HandheldButton> = {
  ArrowUp: "up",
  w: "up",
  ArrowDown: "down",
  s: "down",
  ArrowLeft: "left",
  a: "left",
  ArrowRight: "right",
  d: "right",
  z: "a",
  Enter: "a",
  " ": "a",
  x: "b",
  Shift: "select",
  Escape: "skip",
};

const DPAD_DEADZONE = 0.12;

// Survives trips to other routes within the app, so that coming back skips the
// flash and puts you outside the door you left through. A page load starts over.
const session: { booted: boolean; door: DoorId | null } = {
  booted: false,
  door: null,
};

const LOGO = [
  ["M", "#e04850"],
  ["A", "#f0a030"],
  ["R", "#f0d840"],
  ["S", "#50c878"],
  [" ", ""],
  ["B", "#48a8e8"],
  ["O", "#a070e0"],
  ["Y", "#f070b0"],
];

export function GameBoy() {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<ReturnType<typeof createGame>>(null);
  const dpadDirection = useRef<Direction | null>(null);
  const [pressed, setPressed] = useState<
    Partial<Record<HandheldButton, boolean>>
  >({});

  const press = useCallback(
    (button: HandheldButton) => {
      setPressed((current) => ({ ...current, [button]: true }));
      if (button === "skip") {
        session.booted = true;
        router.push(SKIP_ROUTE);
      } else {
        gameRef.current?.press(button);
      }
    },
    [router],
  );

  const release = useCallback((button: HandheldButton) => {
    setPressed((current) => ({ ...current, [button]: false }));
    if (button !== "skip") gameRef.current?.release(button);
  }, []);

  useEffect(() => {
    const game = createGame(canvasRef.current!, {
      skipBoot: session.booted,
      returnDoor: session.door,
      reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)")
        .matches,
      // Recorded when the flash ends, not on mount: Strict Mode mounts this
      // effect twice in development, which would otherwise skip the flash.
      onBooted: () => {
        session.booted = true;
      },
      onDoor: (id) => {
        session.door = id;
        // Off-site, so the app router can't handle it. This runs after the door
        // animation, too late for a new tab to get past popup blockers.
        if (id === "github") window.location.assign(DOOR_ROUTES.github);
        else router.push(DOOR_ROUTES[id]);
      },
    });
    gameRef.current = game;
    game.start();

    const buttonFor = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return null;
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      // Enter and Space belong to whichever control has keyboard focus.
      const focused = document.activeElement?.closest("button, a");
      if ((key === "Enter" || key === " ") && focused) return null;
      return KEY_BINDINGS[key] ?? null;
    };
    const onKeyDown = (event: KeyboardEvent) => {
      const button = buttonFor(event);
      if (!button) return;
      event.preventDefault();
      if (!event.repeat) press(button);
    };
    const onKeyUp = (event: KeyboardEvent) => {
      const button = buttonFor(event);
      if (button) release(button);
    };
    const onBlur = () => {
      game.releaseAll();
      setPressed({});
    };

    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) game.returnToTown();
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("blur", onBlur);
    window.addEventListener("pageshow", onPageShow);
    return () => {
      game.destroy();
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("pageshow", onPageShow);
    };
  }, [router, press, release]);

  // Pointer input for A, B, Select and Skip. A keyboard "click" on a focused
  // button has detail 0, and is turned into a quick press and release.
  const buttonProps = (button: HandheldButton) => ({
    type: "button" as const,
    onPointerDown: (event: PointerEvent<HTMLButtonElement>) => {
      event.currentTarget.setPointerCapture(event.pointerId);
      press(button);
    },
    onPointerUp: () => release(button),
    onPointerCancel: () => release(button),
    onMouseDown: (event: MouseEvent) => event.preventDefault(),
    onContextMenu: (event: MouseEvent) => event.preventDefault(),
    onClick: (event: MouseEvent) => {
      if (event.detail === 0) {
        press(button);
        release(button);
      }
    },
  });

  // The D-pad reads the pointer's position, so a thumb can roll between
  // directions without lifting.
  const setDpadDirection = (direction: Direction | null) => {
    if (direction === dpadDirection.current) return;
    if (dpadDirection.current) release(dpadDirection.current);
    dpadDirection.current = direction;
    if (direction) press(direction);
  };
  const directionFromPointer = (
    event: PointerEvent<HTMLDivElement>,
  ): Direction | null => {
    const rect = event.currentTarget.getBoundingClientRect();
    const dx = (event.clientX - rect.left) / rect.width - 0.5;
    const dy = (event.clientY - rect.top) / rect.height - 0.5;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < DPAD_DEADZONE) return null;
    if (Math.abs(dx) > Math.abs(dy)) return dx > 0 ? "right" : "left";
    return dy > 0 ? "down" : "up";
  };
  const dpadProps = {
    onPointerDown: (event: PointerEvent<HTMLDivElement>) => {
      event.currentTarget.setPointerCapture(event.pointerId);
      setDpadDirection(directionFromPointer(event));
    },
    onPointerMove: (event: PointerEvent<HTMLDivElement>) => {
      if (event.buttons || event.pointerType === "touch") {
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
          setDpadDirection(directionFromPointer(event));
        }
      }
    },
    onPointerUp: () => setDpadDirection(null),
    onPointerCancel: () => setDpadDirection(null),
    onMouseDown: (event: MouseEvent) => event.preventDefault(),
    onContextMenu: (event: MouseEvent) => event.preventDefault(),
  };
  const arm = (direction: Direction) => (
    <button
      type="button"
      aria-label={`Move ${direction}`}
      className={`gb-dpad-arm gb-dpad-${direction}${pressed[direction] ? " is-pressed" : ""}`}
      onClick={(event) => {
        if (event.detail === 0) {
          press(direction);
          release(direction);
        }
      }}
    />
  );

  return (
    <main className="gb-page">
      <nav className="gb-sr-only" aria-label="Site pages">
        <Link href={DOOR_ROUTES.about}>About</Link>
        <Link href={DOOR_ROUTES.projects}>Projects</Link>
        <Link href={DOOR_ROUTES.resume}>Resume</Link>
        <a href={DOOR_ROUTES.github}>GitHub</a>
        <Link href={SKIP_ROUTE}>Skip the game</Link>
      </nav>

      <div className="gb-device">
        <div className="gb-bezel">
          <div className="gb-led" aria-hidden="true" />
          <canvas
            ref={canvasRef}
            className="gb-screen"
            width={160}
            height={144}
            role="img"
            aria-label="A pixel-art town with doors to the About, Projects, Resume and GitHub pages"
          />
          <div className="gb-logo" aria-hidden="true">
            {LOGO.map(([letter, color], index) => (
              <span key={index} style={{ color }}>
                {letter}
              </span>
            ))}
            <em> COLOR</em>
          </div>
        </div>

        <div className="gb-dpad" {...dpadProps}>
          {arm("up")}
          {arm("left")}
          {arm("right")}
          {arm("down")}
          <div className="gb-dpad-hub" aria-hidden="true" />
        </div>

        <button
          aria-label="B"
          className={`gb-round gb-b${pressed.b ? " is-pressed" : ""}`}
          {...buttonProps("b")}
        >
          B
        </button>
        <button
          aria-label="A"
          className={`gb-round gb-a${pressed.a ? " is-pressed" : ""}`}
          {...buttonProps("a")}
        >
          A
        </button>

        <div className="gb-pills">
          <div className="gb-pill-group">
            <button
              aria-label="Select: show controls"
              className={`gb-pill${pressed.select ? " is-pressed" : ""}`}
              {...buttonProps("select")}
            />
            <span>SELECT</span>
          </div>
          <div className="gb-pill-group">
            <button
              aria-label="Skip to the normal site"
              className={`gb-pill${pressed.skip ? " is-pressed" : ""}`}
              {...buttonProps("skip")}
            />
            <span>SKIP</span>
          </div>
        </div>

        <div className="gb-speaker" aria-hidden="true">
          {[0, 1, 2, 3, 4, 5].map((slot) => (
            <i key={slot} />
          ))}
        </div>
      </div>

      <dl className="gb-keys">
        <dt>Arrows / WASD</dt>
        <dd>Walk</dd>
        <dt>Z / Enter</dt>
        <dd>A</dd>
        <dt>X</dt>
        <dd>B (hold to run)</dd>
        <dt>Shift</dt>
        <dd>Select</dd>
        <dt>Esc</dt>
        <dd>Skip</dd>
      </dl>
    </main>
  );
}
