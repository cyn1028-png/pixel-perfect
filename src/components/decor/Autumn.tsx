/**
 * Purely decorative autumn storybook illustrations (no app logic).
 * Veined leaves, a round little black bird, reeds and red sprigs on a ground line.
 * Everything is aria-hidden.
 */

const C = {
  ink: "var(--ink)",
  paper: "var(--paper)",
  mustard: "var(--mustard)",
  rust: "var(--primary)",
  ember: "var(--ember)",
  ochre: "var(--ochre)",
  cheek: "var(--cheek)",
  hair: "var(--hair)",
  twig: "var(--twig)",
};

export const leafTones = {
  ember: { fill: C.ember, vein: C.ink },
  ochre: { fill: C.ochre, vein: C.hair },
  mustard: { fill: C.mustard, vein: C.ink },
  rust: { fill: C.rust, vein: C.ink },
  hair: { fill: C.hair, vein: C.paper },
} as const;

export type LeafTone = keyof typeof leafTones;

/** A single gouache leaf with a midrib, side veins and a stem. */
export function Leaf({
  size = 80,
  tone = "ember",
  shape = "long",
  className = "",
  style,
}: {
  size?: number;
  tone?: LeafTone;
  shape?: "long" | "round";
  className?: string;
  style?: React.CSSProperties;
}) {
  const { fill, vein } = leafTones[tone];
  const body =
    shape === "long"
      ? "M50 6 C 70 22, 80 48, 74 74 C 70 92, 60 104, 50 112 C 40 104, 30 92, 26 74 C 20 48, 30 22, 50 6 Z"
      : "M50 10 C 80 20, 94 48, 86 78 C 80 98, 62 108, 50 112 C 38 108, 20 98, 14 78 C 6 48, 20 20, 50 10 Z";
  const veins = [24, 38, 52, 66, 80, 94].map((y, i) => {
    const reach = shape === "long" ? 18 - Math.abs(i - 2.5) * 2 : 28 - Math.abs(i - 2.5) * 3;
    return (
      <g key={y}>
        <path d={`M50 ${y + 8} Q ${50 - reach * 0.6} ${y + 2}, ${50 - reach} ${y - 6}`} />
        <path d={`M50 ${y + 8} Q ${50 + reach * 0.6} ${y + 2}, ${50 + reach} ${y - 6}`} />
      </g>
    );
  });
  return (
    <svg
      viewBox="0 0 100 140"
      width={size}
      height={(size * 140) / 100}
      className={className}
      style={style}
      aria-hidden
      focusable="false"
    >
      <path d={body} fill={fill} />
      <g stroke={vein} strokeWidth={1.6} strokeLinecap="round" fill="none" opacity={0.85}>
        <path d="M50 14 C 49 50, 51 90, 50 138" strokeWidth={2.2} />
        {veins}
      </g>
    </svg>
  );
}

/** A big round leaf on its stalk, planted on the ground like a little tree. */
export function LeafTree({
  height = 260,
  tone = "ember",
  className = "",
}: {
  height?: number;
  tone?: LeafTone;
  className?: string;
}) {
  const w = (height * 100) / 140;
  return (
    <div className={className || "relative"} style={{ width: w, height }} aria-hidden>
      <div className="leaf-sway absolute inset-0">
        <Leaf size={w} tone={tone} shape="round" />
      </div>
    </div>
  );
}

/** Round black songbird with a white face, rosy cheek and scratchy feathers. */
export function Bird({ size = 110, className = "" }: { size?: number; className?: string }) {
  const marks = [
    [60, 52],
    [72, 58],
    [84, 50],
    [66, 70],
    [80, 72],
    [94, 64],
    [54, 64],
    [90, 80],
  ];
  return (
    <svg
      viewBox="0 0 160 110"
      width={size}
      height={(size * 110) / 160}
      className={className}
      aria-hidden
      focusable="false"
    >
      <path d="M40 64 L4 78 L10 86 L44 76 Z" fill={C.ink} />
      <ellipse cx="78" cy="62" rx="44" ry="32" fill={C.ink} />
      <ellipse cx="110" cy="40" rx="26" ry="22" fill={C.ink} />
      <ellipse cx="114" cy="40" rx="17" ry="11" fill={C.paper} />
      <circle cx="119" cy="39" r="3.2" fill={C.ink} />
      <circle cx="108" cy="44" r="3.4" fill={C.cheek} />
      <path d="M134 35 L152 40 L134 45 Z" fill={C.ink} />
      <g stroke={C.mustard} strokeWidth={1.4} strokeLinecap="round" opacity={0.9}>
        {marks.map(([x, y], i) => (
          <path key={i} d={`M${x} ${y} l5 -3`} />
        ))}
      </g>
      <g stroke={C.ink} strokeWidth={2.4} strokeLinecap="round">
        <path d="M74 92 V106 M70 106 H80" />
        <path d="M90 92 V106 M86 106 H96" />
      </g>
    </svg>
  );
}

/** Ochre reeds and a red sprig — ground cover for the edges of a scene. */
export function Reeds({
  height = 150,
  flip = false,
  className = "",
}: {
  height?: number;
  flip?: boolean;
  className?: string;
}) {
  const stems = [
    { x: 30, top: 30, lean: -10 },
    { x: 44, top: 8, lean: -2 },
    { x: 58, top: 22, lean: 8 },
    { x: 72, top: 44, lean: 14 },
  ];
  return (
    <svg
      viewBox="0 0 110 150"
      width={(height * 110) / 150}
      height={height}
      className={className}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      aria-hidden
      focusable="false"
    >
      <g stroke={C.twig} strokeWidth={1.6} fill="none" strokeLinecap="round">
        {stems.map((s, i) => (
          <path
            key={i}
            d={`M${s.x} 150 C ${s.x} 110, ${s.x + s.lean} 70, ${s.x + s.lean} ${s.top}`}
          />
        ))}
      </g>
      {stems.map((s, i) =>
        [0, 18, 36].map((dy, j) => (
          <ellipse
            key={`${i}-${j}`}
            cx={s.x + s.lean + (j % 2 ? 5 : -5)}
            cy={s.top + 8 + dy}
            rx={3.4}
            ry={7}
            transform={`rotate(${j % 2 ? 28 : -28} ${s.x + s.lean} ${s.top + 8 + dy})`}
            fill={j === 0 ? C.mustard : C.ochre}
          />
        )),
      )}
      <g stroke={C.ember} strokeWidth={1.8} strokeLinecap="round" fill="none">
        <path d="M94 150 C 94 120, 96 100, 98 70" />
        {[80, 92, 104, 116, 128].map((y, i) => (
          <path key={y} d={`M${96 + (i % 2)} ${y} l${i % 2 ? 7 : -7} -9`} />
        ))}
      </g>
    </svg>
  );
}

/** A thin, slightly wobbly ground line, like a pencil stroke across the page. */
export function Ground({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 12"
      preserveAspectRatio="none"
      className={className}
      aria-hidden
      focusable="false"
    >
      <path
        d="M0 6 C 150 4, 300 8, 450 6 S 750 3, 900 7 S 1100 5, 1200 6"
        stroke={C.ochre}
        strokeWidth={3}
        fill="none"
        strokeLinecap="round"
        opacity={0.75}
      />
    </svg>
  );
}

/** Small leaves drifting across a scene. */
export function LeafScatter({ className = "" }: { className?: string }) {
  const items: { top: string; left: string; size: number; tone: LeafTone; r: number }[] = [
    { top: "12%", left: "8%", size: 22, tone: "mustard", r: -40 },
    { top: "22%", left: "84%", size: 18, tone: "ember", r: 30 },
    { top: "58%", left: "4%", size: 16, tone: "rust", r: 70 },
    { top: "70%", left: "90%", size: 20, tone: "ochre", r: -20 },
    { top: "40%", left: "94%", size: 14, tone: "hair", r: 50 },
    { top: "86%", left: "14%", size: 14, tone: "ember", r: -60 },
  ];
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      {items.map((m, i) => (
        <Leaf
          key={i}
          size={m.size}
          tone={m.tone}
          className="absolute"
          style={{ top: m.top, left: m.left, transform: `rotate(${m.r}deg)` }}
        />
      ))}
    </div>
  );
}
