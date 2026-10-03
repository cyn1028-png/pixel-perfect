/**
 * Purely decorative folk-art illustrations (no app logic).
 * Medallions, lollipop trees, a storybook townhouse skyline and a little dachshund.
 * Everything is aria-hidden.
 */

const C = {
  ink: "var(--ink)",
  cream: "var(--cream)",
  gold: "var(--gold)",
  terra: "var(--terracotta)",
  blue: "var(--dusty-blue)",
  teal: "var(--teal)",
  red: "var(--primary)",
  blush: "var(--blush)",
  bark: "var(--bark)",
  pink: "oklch(0.8 0.09 15)",
  coral: "oklch(0.72 0.13 30)",
};

type Palette = [string, string, string, string];

export const palettes = {
  sun: [C.gold, C.cream, C.terra, C.red],
  rose: [C.pink, C.cream, C.red, C.ink],
  coral: [C.coral, C.gold, C.cream, C.ink],
  sage: [C.teal, C.cream, C.gold, C.terra],
  sky: [C.blue, C.cream, C.terra, C.gold],
  night: [C.ink, C.gold, C.cream, C.red],
} satisfies Record<string, Palette>;

export function Medallion({
  size = 64,
  palette = palettes.sun as Palette,
  spokes = 18,
  className = "",
  style,
}: {
  size?: number;
  palette?: Palette;
  spokes?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [a, b, c, d] = palette;
  const lines = Array.from({ length: spokes }, (_, i) => {
    const t = (i / spokes) * Math.PI * 2;
    return (
      <line
        key={i}
        x1={50 + Math.cos(t) * 15}
        y1={50 + Math.sin(t) * 15}
        x2={50 + Math.cos(t) * 36}
        y2={50 + Math.sin(t) * 36}
        stroke={c}
        strokeWidth={2.2}
        strokeLinecap="round"
      />
    );
  });
  const dots = Array.from({ length: 14 }, (_, i) => {
    const t = (i / 14) * Math.PI * 2;
    return (
      <circle key={i} cx={50 + Math.cos(t) * 44} cy={50 + Math.sin(t) * 44} r={2.6} fill={b} />
    );
  });
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      style={style}
      aria-hidden
      focusable="false"
    >
      <circle cx="50" cy="50" r="49" fill={a} />
      {dots}
      <circle cx="50" cy="50" r="39" fill={b} opacity={0.92} />
      {lines}
      <circle cx="50" cy="50" r="14" fill={d} />
      <circle cx="50" cy="50" r="7" fill={a} />
      <circle cx="50" cy="50" r="2.5" fill={b} />
    </svg>
  );
}

/** Bare brown trunk with branches, crowned by a medallion. */
export function LollipopTree({
  height = 260,
  palette = palettes.rose,
  className = "",
}: {
  height?: number;
  palette?: Palette;
  className?: string;
}) {
  const w = height * 0.55;
  return (
    <div className={className || "relative"} style={{ width: w, height }} aria-hidden>
      <svg
        viewBox="0 0 110 200"
        width={w}
        height={height}
        className="absolute inset-0"
        focusable="false"
      >
        <g stroke={C.bark} strokeLinecap="round" fill="none">
          <path d="M55 200 C 54 150, 57 110, 55 60" strokeWidth={6} />
          <path d="M55 120 C 40 105, 30 95, 22 70" strokeWidth={3} />
          <path d="M55 105 C 70 92, 80 80, 90 58" strokeWidth={3} />
          <path d="M55 80 C 46 60, 42 45, 38 25" strokeWidth={2.2} />
          <path d="M56 75 C 64 58, 70 42, 74 22" strokeWidth={2.2} />
          <path d="M28 82 C 20 78, 14 70, 10 60" strokeWidth={1.6} />
          <path d="M84 70 C 92 66, 98 58, 102 48" strokeWidth={1.6} />
        </g>
      </svg>
      <div className="folk-sway absolute left-1/2 top-0 -translate-x-1/2">
        <Medallion size={w * 0.92} palette={palette} spokes={22} />
      </div>
    </div>
  );
}

type Bldg = {
  x: number;
  w: number;
  h: number;
  fill: string;
  win: string;
  roof?: "dome" | "flat" | "peak" | "clock";
};

const buildings: Bldg[] = [
  { x: 0, w: 120, h: 170, fill: C.blue, win: C.cream, roof: "peak" },
  { x: 110, w: 110, h: 210, fill: C.pink, win: C.ink },
  { x: 215, w: 90, h: 150, fill: C.coral, win: C.cream, roof: "dome" },
  { x: 300, w: 120, h: 230, fill: "oklch(0.86 0.07 70)", win: C.red, roof: "dome" },
  { x: 415, w: 100, h: 180, fill: C.terra, win: C.cream },
  { x: 510, w: 90, h: 250, fill: C.coral, win: C.teal, roof: "clock" },
  { x: 595, w: 130, h: 170, fill: C.pink, win: C.red, roof: "peak" },
  { x: 720, w: 100, h: 215, fill: C.blue, win: C.cream },
  { x: 815, w: 110, h: 160, fill: "oklch(0.86 0.07 70)", win: C.teal, roof: "dome" },
  { x: 920, w: 120, h: 225, fill: C.terra, win: C.cream, roof: "peak" },
  { x: 1035, w: 90, h: 175, fill: C.pink, win: C.ink },
  { x: 1120, w: 120, h: 200, fill: C.blue, win: C.red, roof: "dome" },
];

/** Storybook townhouse row with arched windows and a clock tower. */
export function Skyline({ className = "" }: { className?: string }) {
  const H = 300;
  return (
    <svg
      viewBox={`0 0 1240 ${H}`}
      preserveAspectRatio="xMidYMax slice"
      className={className}
      aria-hidden
      focusable="false"
    >
      {buildings.map((b, i) => {
        const top = H - b.h;
        const cols = Math.max(2, Math.floor((b.w - 20) / 28));
        const rows = Math.max(2, Math.floor((b.h - 50) / 46));
        const gap = (b.w - cols * 14) / (cols + 1);
        const wins = [];
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const wx = b.x + gap + c * (14 + gap);
            const wy = top + 22 + r * 46;
            wins.push(
              <path
                key={`${r}-${c}`}
                d={`M${wx} ${wy + 26} V${wy + 7} a7 7 0 0 1 14 0 V${wy + 26} Z`}
                fill={b.win}
                stroke={C.cream}
                strokeWidth={1.5}
              />,
            );
          }
        }
        return (
          <g key={i}>
            {b.roof === "dome" && (
              <path
                d={`M${b.x + b.w * 0.2} ${top} a${b.w * 0.3} ${b.w * 0.3} 0 0 1 ${b.w * 0.6} 0 Z`}
                fill={C.teal}
              />
            )}
            {b.roof === "peak" && (
              <path
                d={`M${b.x} ${top} L${b.x + b.w / 2} ${top - 34} L${b.x + b.w} ${top} Z`}
                fill={C.red}
              />
            )}
            {b.roof === "clock" && (
              <g>
                <rect x={b.x + 6} y={top - 14} width={b.w - 12} height={14} fill={C.ink} />
                <circle
                  cx={b.x + b.w / 2}
                  cy={top + 34}
                  r={20}
                  fill={C.cream}
                  stroke={C.gold}
                  strokeWidth={3}
                />
                <path
                  d={`M${b.x + b.w / 2} ${top + 34} V${top + 21} M${b.x + b.w / 2} ${top + 34} H${b.x + b.w / 2 + 9}`}
                  stroke={C.ink}
                  strokeWidth={2}
                  strokeLinecap="round"
                />
              </g>
            )}
            <rect x={b.x} y={top} width={b.w} height={b.h} fill={b.fill} />
            {b.roof === "clock" ? wins.slice(cols * 2) : wins}
          </g>
        );
      })}
    </svg>
  );
}

/** A little spotted dachshund on a stroll. */
export function Dachshund({ size = 110, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 160 90"
      width={size}
      height={(size * 90) / 160}
      className={className}
      aria-hidden
      focusable="false"
    >
      <path
        d="M22 40 C 8 30, 6 18, 14 10"
        stroke={C.ink}
        strokeWidth={4}
        fill="none"
        strokeLinecap="round"
      />
      <rect x="18" y="36" width="96" height="30" rx="15" fill={C.ink} />
      {[30, 46, 62, 78, 94, 38, 54, 70, 86].map((x, i) => (
        <circle key={i} cx={x} cy={i < 5 ? 45 : 57} r={2.6} fill={C.gold} />
      ))}
      <rect x="26" y="60" width="7" height="24" rx="3" fill={C.ink} />
      <rect x="40" y="60" width="7" height="24" rx="3" fill={C.ink} />
      <rect x="92" y="60" width="7" height="24" rx="3" fill={C.ink} />
      <rect x="104" y="60" width="7" height="24" rx="3" fill={C.ink} />
      <rect x="104" y="30" width="12" height="10" fill={C.red} />
      <ellipse cx="124" cy="28" rx="20" ry="16" fill={C.ink} />
      <path d="M136 30 L156 38 L150 44 L134 40 Z" fill={C.ink} />
      <circle cx="156" cy="39" r="3" fill={C.ink} />
      <ellipse cx="116" cy="36" rx="7" ry="14" fill={C.bark} />
      <circle cx="130" cy="24" r="2.4" fill={C.cream} />
    </svg>
  );
}

/** A loose scatter of medallions for page backgrounds. */
export function MedallionScatter({ className = "" }: { className?: string }) {
  const items: { top: string; left: string; size: number; p: Palette; o?: number }[] = [
    { top: "6%", left: "4%", size: 54, p: palettes.coral },
    { top: "14%", left: "88%", size: 70, p: palettes.sun },
    { top: "70%", left: "6%", size: 44, p: palettes.sky, o: 0.8 },
    { top: "82%", left: "84%", size: 60, p: palettes.rose },
    { top: "44%", left: "93%", size: 34, p: palettes.sage, o: 0.85 },
    { top: "38%", left: "1%", size: 30, p: palettes.night, o: 0.8 },
  ];
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      {items.map((m, i) => (
        <Medallion
          key={i}
          size={m.size}
          palette={m.p}
          className="absolute"
          style={{ top: m.top, left: m.left, opacity: m.o ?? 1 }}
        />
      ))}
    </div>
  );
}
