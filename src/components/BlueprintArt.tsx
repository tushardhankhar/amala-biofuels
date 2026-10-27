type Variant = "reactor" | "storage" | "station" | "facility" | "process";

/**
 * Engineering line drawings used where approved photography does not exist yet.
 * They are deliberately schematic so they cannot be mistaken for real company assets.
 */

const S = { fill: "none", strokeWidth: 1.2, vectorEffect: "non-scaling-stroke" as const };

function Grid({ id }: { id: string }) {
  return (
    <>
      <defs>
        <pattern id={`g-${id}`} width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke="currentColor" strokeOpacity=".07" />
        </pattern>
        <radialGradient id={`v-${id}`} cx="60%" cy="35%" r="80%">
          <stop offset="0" stopColor="#C8A66A" stopOpacity=".22" />
          <stop offset=".55" stopColor="#103B32" stopOpacity=".0" />
        </radialGradient>
      </defs>
      <rect width="800" height="600" fill={`url(#g-${id})`} />
      <rect width="800" height="600" fill={`url(#v-${id})`} />
    </>
  );
}

function Vessel({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  const r = w / 2;
  return (
    <g>
      <path d={`M${x} ${y + r * 0.6} Q${x} ${y} ${x + r} ${y} Q${x + w} ${y} ${x + w} ${y + r * 0.6} V${y + h} H${x} Z`} {...S} />
      {[0.3, 0.55, 0.8].map((t) => (
        <line key={t} x1={x} x2={x + w} y1={y + h * t} y2={y + h * t} {...S} strokeOpacity=".45" />
      ))}
      <line x1={x + r} x2={x + r} y1={y - 26} y2={y} {...S} />
      <rect x={x + r - 9} y={y - 32} width="18" height="6" {...S} />
      <line x1={x + 8} x2={x + 8} y1={y + h} y2={y + h + 28} {...S} />
      <line x1={x + w - 8} x2={x + w - 8} y1={y + h} y2={y + h + 28} {...S} />
    </g>
  );
}

function Reactor() {
  return (
    <g className="text-gold" stroke="currentColor">
      <Vessel x={150} y={170} w={120} h={260} />
      <Vessel x={330} y={130} w={150} h={300} />
      <Vessel x={540} y={200} w={100} h={230} />
      <path d="M210 138 V100 H405 V98 M405 98 V98" {...S} />
      <path d="M270 300 H330 M480 260 H540 M480 360 H520 V470 H700" {...S} />
      <path d="M90 460 H270 M90 480 H740" {...S} strokeOpacity=".5" />
      {[270, 330, 480, 540].map((x) => (
        <circle key={x} cx={x} cy={x < 400 ? 300 : 260} r="5" {...S} />
      ))}
      <circle cx="590" cy="150" r="22" {...S} strokeOpacity=".6" />
      <path d="M590 128 V172 M568 150 H612" {...S} strokeOpacity=".6" />
      <path d="M100 520 H700" {...S} strokeDasharray="4 6" strokeOpacity=".4" />
    </g>
  );
}

function Storage() {
  const tank = (cx: number, w: number, h: number) => (
    <g key={cx}>
      <ellipse cx={cx} cy={430 - h} rx={w / 2} ry={12} {...S} />
      <path d={`M${cx - w / 2} ${430 - h} V430 M${cx + w / 2} ${430 - h} V430`} {...S} />
      <path d={`M${cx - w / 2} 430 Q${cx} 446 ${cx + w / 2} 430`} {...S} />
      {[0.25, 0.5, 0.75].map((t) => (
        <path key={t} d={`M${cx - w / 2} ${430 - h * t} Q${cx} ${442 - h * t} ${cx + w / 2} ${430 - h * t}`} {...S} strokeOpacity=".35" />
      ))}
      <path d={`M${cx + w / 2} 430 L${cx + w / 2 - 30} ${430 - h}`} {...S} strokeOpacity=".5" strokeDasharray="3 5" />
    </g>
  );
  return (
    <g className="text-gold" stroke="currentColor">
      {tank(200, 170, 200)}
      {tank(410, 190, 240)}
      {tank(610, 150, 170)}
      <path d="M60 470 H760 M60 486 H760" {...S} strokeOpacity=".5" />
      <path d="M285 400 H320 M505 410 H535" {...S} />
      <rect x="640" y="500" width="110" height="44" {...S} strokeOpacity=".7" />
      <circle cx="665" cy="552" r="10" {...S} strokeOpacity=".7" />
      <circle cx="725" cy="552" r="10" {...S} strokeOpacity=".7" />
    </g>
  );
}

function Station() {
  return (
    <g className="text-gold" stroke="currentColor">
      <path d="M110 190 H690 L670 225 H130 Z" {...S} />
      <line x1="130" x2="670" y1="212" y2="212" {...S} strokeOpacity=".4" />
      {[230, 400, 570].map((x) => (
        <g key={x}>
          <path d={`M${x - 6} 225 V440 M${x + 6} 225 V440`} {...S} />
          <rect x={x - 32} y="340" width="64" height="100" {...S} />
          <rect x={x - 20} y="356" width="40" height="22" {...S} strokeOpacity=".6" />
          <path d={`M${x + 32} 380 q22 0 22 30 v20`} {...S} strokeOpacity=".7" />
        </g>
      ))}
      <path d="M60 440 H740 M60 456 H740" {...S} strokeOpacity=".5" />
      <path d="M100 520 L260 456 M700 520 L540 456" {...S} strokeOpacity=".35" strokeDasharray="4 6" />
    </g>
  );
}

function Facility() {
  return (
    <g className="text-gold" stroke="currentColor">
      <path d="M80 440 V300 H180 V440 M200 440 V250 H230 V440 M250 440 V160 H280 V440" {...S} />
      <Vessel x={330} y={230} w={90} h={200} />
      <Vessel x={450} y={270} w={70} h={160} />
      <path d="M560 440 V330 H720 V440 M580 330 V300 H700 V330" {...S} />
      <path d="M180 330 H330 M280 210 H560 V300 M420 360 H450" {...S} strokeOpacity=".8" />
      <path d="M40 470 H760" {...S} strokeOpacity=".5" />
      {[120, 160, 230].map((x, i) => (
        <path key={x} d={`M${x} ${300 - i * 30} q-8 -20 6 -36 q12 -14 2 -34`} {...S} strokeOpacity=".3" />
      ))}
    </g>
  );
}

function Process() {
  return (
    <g className="text-gold" stroke="currentColor">
      <path d="M40 420 C 200 420 220 200 400 200 S 600 380 760 300" {...S} />
      <path d="M40 450 C 220 450 240 250 400 250 S 620 420 760 340" {...S} strokeOpacity=".5" />
      {[
        [400, 200],
        [250, 330],
        [560, 310],
      ].map(([x, y]) => (
        <g key={x}>
          <circle cx={x} cy={y} r="16" {...S} />
          <circle cx={x} cy={y} r="34" {...S} strokeOpacity=".3" />
        </g>
      ))}
    </g>
  );
}

const art = { reactor: Reactor, storage: Storage, station: Station, facility: Facility, process: Process };

export function BlueprintArt({ variant, id }: { variant: Variant; id: string }) {
  const Art = art[variant];
  return (
    <svg
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full text-sage"
      aria-hidden="true"
    >
      <Grid id={id} />
      <Art />
    </svg>
  );
}
