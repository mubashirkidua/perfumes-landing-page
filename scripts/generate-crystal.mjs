import { mkdir } from "node:fs/promises";
import sharp from "sharp";

const OUT = "public/images";
await mkdir(OUT, { recursive: true });

const GOLD = "#D6B36A";
const GOLD_L = "#F0D9A8";
const GOLD_D = "#A8844A";

function crystalBottle({ liquid, liquidLight, glow, name, seed }) {
  let s = seed;
  const rnd = (n) => {
    s = (s * 16807) % 2147483647;
    return (s % n) / 1;
  };

  let sparkles = "";
  for (let i = 0; i < 22; i++) {
    const x = 160 + rnd(280);
    const y = 70 + rnd(560);
    const r = 2 + rnd(5);
    const o = 0.25 + rnd(0.55);
    sparkles += `<path d="M ${x} ${y - r * 3} L ${x + r * 0.9} ${y - r * 0.9} L ${x + r * 3} ${y} L ${x + r * 0.9} ${y + r * 0.9} L ${x} ${y + r * 3} L ${x - r * 0.9} ${y + r * 0.9} L ${x - r * 3} ${y} L ${x - r * 0.9} ${y - r * 0.9} Z" fill="#ffffff" opacity="${o.toFixed(2)}"/>`;
  }

  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="600" height="760" viewBox="0 0 600 760">
    <defs>
      <radialGradient id="glow" cx="0.5" cy="0.42" r="0.62">
        <stop offset="0" stop-color="${glow}" stop-opacity="0.4"/>
        <stop offset="0.55" stop-color="${glow}" stop-opacity="0.12"/>
        <stop offset="1" stop-color="${glow}" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="glassBody" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#ffffff" stop-opacity="0.16"/>
        <stop offset="0.12" stop-color="${liquid}" stop-opacity="0.32"/>
        <stop offset="0.32" stop-color="#ffffff" stop-opacity="0.1"/>
        <stop offset="0.55" stop-color="${liquid}" stop-opacity="0.26"/>
        <stop offset="0.82" stop-color="${liquid}" stop-opacity="0.42"/>
        <stop offset="1" stop-color="#000000" stop-opacity="0.38"/>
      </linearGradient>
      <linearGradient id="glassFacet" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#ffffff" stop-opacity="0.42"/>
        <stop offset="0.5" stop-color="#ffffff" stop-opacity="0.02"/>
        <stop offset="1" stop-color="#000000" stop-opacity="0.28"/>
      </linearGradient>
      <linearGradient id="edgeHi" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#ffffff" stop-opacity="0.85"/>
        <stop offset="0.09" stop-color="#ffffff" stop-opacity="0.28"/>
        <stop offset="0.16" stop-color="#ffffff" stop-opacity="0.02"/>
        <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="liquidGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${liquidLight}" stop-opacity="0.95"/>
        <stop offset="0.4" stop-color="${liquid}" stop-opacity="0.9"/>
        <stop offset="1" stop-color="${liquid}" stop-opacity="0.72"/>
      </linearGradient>
      <linearGradient id="capGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${GOLD_L}"/>
        <stop offset="0.35" stop-color="${GOLD}"/>
        <stop offset="0.75" stop-color="${GOLD_D}"/>
        <stop offset="1" stop-color="#6b4f24"/>
      </linearGradient>
      <linearGradient id="stopperGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#ffffff" stop-opacity="0.9"/>
        <stop offset="0.4" stop-color="#cfe0f0" stop-opacity="0.55"/>
        <stop offset="1" stop-color="#8fb0d0" stop-opacity="0.6"/>
      </linearGradient>
      <linearGradient id="labelGold" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${GOLD_L}"/>
        <stop offset="0.5" stop-color="${GOLD}"/>
        <stop offset="1" stop-color="${GOLD_D}"/>
      </linearGradient>
      <filter id="soft" x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur stdDeviation="18"/>
      </filter>
    </defs>

    <circle cx="300" cy="380" r="300" fill="url(#glow)"/>
    ${sparkles}

    <g>
      <ellipse cx="300" cy="722" rx="130" ry="22" fill="#020b16" opacity="0.55"/>
      <ellipse cx="300" cy="716" rx="102" ry="14" fill="${liquid}" opacity="0.3"/>
      <g style="filter:url(#soft)">
        <ellipse cx="300" cy="420" rx="120" ry="210" fill="${glow}" opacity="0.3"/>
      </g>

      <path d="M 284 108 L 316 108 L 328 142 L 300 170 L 272 142 Z" fill="url(#stopperGrad)"/>
      <path d="M 284 108 L 316 108 L 322 124 L 278 124 Z" fill="#ffffff" opacity="0.5"/>
      <path d="M 300 108 L 300 170" stroke="#ffffff" stroke-opacity="0.4" stroke-width="1.5"/>
      <path d="M 272 142 L 328 142 L 318 148 L 282 148 Z" fill="${GOLD_D}" opacity="0.7"/>

      <rect x="270" y="150" width="60" height="42" rx="8" fill="url(#capGrad)"/>
      <rect x="272" y="158" width="56" height="4" rx="2" fill="${GOLD_L}" opacity="0.8"/>
      <g fill="${GOLD_D}" opacity="0.85">
        <rect x="270" y="170" width="60" height="4" rx="2"/>
        <rect x="270" y="180" width="60" height="4" rx="2"/>
      </g>
      <rect x="270" y="184" width="60" height="8" rx="4" fill="${GOLD_D}" opacity="0.6"/>

      <rect x="286" y="192" width="28" height="62" fill="#0a2030" opacity="0.85"/>
      <rect x="286" y="192" width="28" height="62" fill="url(#edgeHi)" opacity="0.35"/>

      <path d="M 240 254 Q 240 246 262 244 L 338 244 Q 360 246 360 254 L 360 668 Q 360 690 300 690 Q 240 690 240 668 Z" fill="url(#glassBody)"/>
      <path d="M 240 254 Q 240 246 262 244 L 338 244 Q 360 246 360 254 L 360 668 Q 360 690 300 690 Q 240 690 240 668 Z" fill="none" stroke="#ffffff" stroke-opacity="0.35" stroke-width="2"/>
      <path d="M 240 254 Q 240 246 262 244 L 338 244 Q 360 246 360 254 L 360 668 Q 360 690 300 690 Q 240 690 240 668 Z" fill="url(#edgeHi)"/>
      <path d="M 266 248 L 266 684" stroke="url(#glassFacet)" stroke-width="5" opacity="0.6"/>
      <path d="M 300 246 L 300 688" stroke="url(#glassFacet)" stroke-width="5" opacity="0.55"/>
      <path d="M 334 248 L 334 684" stroke="url(#glassFacet)" stroke-width="5" opacity="0.5"/>
      <path d="M 288 246 L 288 688" stroke="#ffffff" stroke-opacity="0.08" stroke-width="2"/>
      <path d="M 312 246 L 312 688" stroke="#ffffff" stroke-opacity="0.08" stroke-width="2"/>

      <clipPath id="bodyClip">
        <path d="M 244 258 Q 244 250 264 248 L 336 248 Q 356 250 356 258 L 356 664 Q 356 684 300 684 Q 244 684 244 664 Z"/>
      </clipPath>
      <g clip-path="url(#bodyClip)">
        <rect x="244" y="360" width="112" height="400" fill="url(#liquidGrad)"/>
        <path d="M 244 360 Q 272 336 300 360 T 356 360 L 356 396 L 244 396 Z" fill="#ffffff" opacity="0.22"/>
        <path d="M 244 360 Q 272 352 300 360 T 356 360 L 356 366 L 244 366 Z" fill="${liquidLight}" opacity="0.6"/>
        <path d="M 258 380 Q 268 372 278 380 T 298 380" stroke="#ffffff" stroke-opacity="0.25" stroke-width="1.5" fill="none"/>
        <path d="M 288 440 Q 300 430 312 440 T 336 440" stroke="#ffffff" stroke-opacity="0.18" stroke-width="1.5" fill="none"/>
        <path d="M 268 520 Q 280 512 292 520 T 316 520" stroke="#ffffff" stroke-opacity="0.14" stroke-width="1.5" fill="none"/>
        <path d="M 300 420 L 300 650" stroke="#ffffff" stroke-opacity="0.07" stroke-width="26"/>
        <path d="M 300 300 L 300 660" stroke="#ffffff" stroke-opacity="0.05" stroke-width="14"/>
      </g>

      <g>
        <rect x="268" y="470" width="64" height="92" rx="5" fill="#020b16" opacity="0.5"/>
        <rect x="268" y="470" width="64" height="92" rx="5" fill="none" stroke="url(#labelGold)" stroke-opacity="0.9" stroke-width="1.6"/>
        <rect x="271" y="473" width="58" height="86" rx="3" fill="none" stroke="url(#labelGold)" stroke-opacity="0.35" stroke-width="0.9"/>
        <text x="300" y="500" text-anchor="middle" font-family="Georgia, serif" font-size="12" fill="${GOLD}" letter-spacing="2.5">OCEAN</text>
        <line x1="276" y1="508" x2="324" y2="508" stroke="${GOLD}" stroke-opacity="0.6"/>
        <text x="300" y="530" text-anchor="middle" font-family="Georgia, serif" font-size="10" fill="${GOLD}" letter-spacing="1.5">${name}</text>
        <text x="300" y="548" text-anchor="middle" font-family="sans-serif" font-size="8" fill="#f7f8fa" opacity="0.75" letter-spacing="2">CRYSTAL ÉDITION</text>
      </g>

      <path d="M 258 262 L 320 262" stroke="#ffffff" stroke-opacity="0.6" stroke-width="8" stroke-linecap="round" transform="rotate(14 258 262)"/>
    </g>
  </svg>`;

  return svg;
}

const bottles = [
  { key: "ruby", liquid: "#b9362f", light: "#e0564c", glow: "#ff5a52", name: "RUBY", seed: 11 },
  { key: "emerald", liquid: "#0f7a5a", light: "#2bb587", glow: "#35d69b", name: "EMERALD", seed: 23 },
  { key: "amethyst", liquid: "#6b3fa0", light: "#9b6fd6", glow: "#b18cf0", name: "AMETHYST", seed: 37 },
  { key: "obsidian", liquid: "#10131e", light: "#3a4258", glow: "#7c8aad", name: "OBSIDIAN", seed: 41 },
  { key: "sapphire", liquid: "#1d4fae", light: "#3f7fe0", glow: "#6aa4f5", name: "SAPPHIRE", seed: 53 },
  { key: "golden", liquid: "#b88a2e", light: "#e6bc56", glow: "#ffd977", name: "GOLDEN", seed: 67 },
  { key: "rose", liquid: "#c25070", light: "#e88ba6", glow: "#ff9cbc", name: "ROSE", seed: 71 },
  { key: "teal", liquid: "#0e8f8f", light: "#2cc9c9", glow: "#4fe0d8", name: "TEAL", seed: 83 },
  { key: "citrine", liquid: "#cc8a24", light: "#f0b950", glow: "#ffc566", name: "CITRINE", seed: 97 },
  { key: "crystal", liquid: "#9fb4ca", light: "#d9e6f4", glow: "#eaf3ff", name: "CRYSTAL", seed: 101 },
  { key: "ocean-blue", liquid: "#1e7fb8", light: "#3f9fe0", glow: "#4fa6e0", name: "BLUE", seed: 113 },
  { key: "ocean-noir", liquid: "#0a1a2e", light: "#27405f", glow: "#4a5f8a", name: "NOIR", seed: 127 },
  { key: "ocean-gold", liquid: "#b0793a", light: "#e6bd6f", glow: "#d6b36a", name: "GOLD", seed: 131 },
];

for (const b of bottles) {
  const svg = crystalBottle(b);
  const out = `${OUT}/crystal-${b.key}.png`;
  await sharp(Buffer.from(svg)).resize(520).png({ compressionLevel: 9 }).toFile(out);
  console.log("generated", out);
}
console.log("done", bottles.length, "crystal bottles");
