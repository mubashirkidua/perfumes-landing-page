import { mkdir } from "node:fs/promises";
import sharp from "sharp";

const OUT = "public/images";
await mkdir(OUT, { recursive: true });

const NAVY = "#061A2D";
const MIDNIGHT = "#020B16";
const GOLD = "#D6B36A";
const GOLD_L = "#F0D9A8";
const GOLD_D = "#A8844A";
const PEARL = "#F7F8FA";

function wrap(defs, body, { w, h, extra = "" } = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${defs}${body}${extra}</svg>`;
}

function bubbles(cx, yTop, yBot, seed = 7, maxR = 14) {
  let out = "";
  let s = seed;
  const rnd = (n) => {
    s = (s * 16807) % 2147483647;
    return (s % n) / 1;
  };
  for (let i = 0; i < 40; i++) {
    const r = 2 + rnd(maxR);
    const x = cx - 130 + rnd(260);
    const y = yTop + rnd(yBot - yTop);
    const o = 0.04 + rnd(0.2);
    out += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="none" stroke="#A9CFE8" stroke-opacity="${o.toFixed(2)}" stroke-width="1.5"/>`;
    out += `<circle cx="${(x - r * 0.3).toFixed(1)}" cy="${(y - r * 0.3).toFixed(1)}" r="${(r * 0.18).toFixed(1)}" fill="#E9F6FF" fill-opacity="${(o * 1.4).toFixed(2)}"/>`;
  }
  return out;
}

const GLASS_STROKE = "#BFE0F5";

function shapeMarkup(shape, { liquidTop, labelText, labelSub }) {
  if (shape === "round") {
    return `
      <rect x="340" y="298" width="120" height="42" rx="6" fill="url(#glassGrad)"/>
      <rect x="340" y="298" width="120" height="42" rx="6" fill="#ffffff" opacity="0.06"/>
      <circle cx="400" cy="540" r="112" fill="url(#glassGrad)"/>
      <circle cx="400" cy="540" r="112" fill="url(#glassEdge)" opacity="0.6"/>
      <circle cx="400" cy="540" r="112" fill="none" stroke="${GLASS_STROKE}" stroke-opacity="0.22" stroke-width="1.5"/>
      <path d="M 352 452 L 352 628" stroke="url(#facetLeft)" stroke-width="4" opacity="0.5"/>
      <path d="M 400 428 L 400 652" stroke="url(#facetRight)" stroke-width="3" opacity="0.45"/>
      <path d="M 320 470 L 320 610" stroke="url(#facetLeft)" stroke-width="2.5" opacity="0.35"/>
      <path d="M 480 470 L 480 610" stroke="url(#facetRight)" stroke-width="2.5" opacity="0.3"/>
      <clipPath id="bodyClip"><circle cx="400" cy="540" r="108"/></clipPath>
      <g clip-path="url(#bodyClip)">
        <rect x="288" y="${liquidTop}" width="224" height="700" fill="url(#liquidGrad)"/>
        <path d="M 292 ${liquidTop} Q 360 ${liquidTop - 24} 400 ${liquidTop} T 508 ${liquidTop} L 508 ${liquidTop + 40} L 292 ${liquidTop + 40} Z" fill="#ffffff" opacity="0.16"/>
        ${bubbles(400, liquidTop + 40, 648, 11, 11)}
        <circle cx="360" cy="480" r="60" fill="#ffffff" opacity="0.05"/>
      </g>
      <circle cx="400" cy="540" r="112" fill="none" stroke="#ffffff" stroke-opacity="0.1" stroke-width="1"/>
      <g>
        <rect x="352" y="500" width="96" height="80" rx="6" fill="${MIDNIGHT}" opacity="0.5"/>
        <rect x="352" y="500" width="96" height="80" rx="6" fill="none" stroke="url(#labelGold)" stroke-opacity="0.85" stroke-width="2"/>
        <rect x="356" y="504" width="88" height="72" rx="4" fill="none" stroke="url(#labelGold)" stroke-opacity="0.35" stroke-width="1"/>
        <text x="400" y="530" text-anchor="middle" font-family="Georgia, serif" font-size="11" fill="${GOLD}" letter-spacing="2">${labelText}</text>
        <line x1="368" y1="538" x2="432" y2="538" stroke="${GOLD}" stroke-opacity="0.5"/>
        <text x="400" y="558" text-anchor="middle" font-family="sans-serif" font-size="9" fill="${PEARL}" opacity="0.8" letter-spacing="2">${labelSub}</text>
      </g>`;
  }

  if (shape === "oval") {
    const bodyPath =
      "M 400 298 C 486 298 512 420 512 560 C 512 706 466 766 400 766 C 334 766 288 706 288 560 C 288 420 314 298 400 298 Z";
    const clipPath =
      "M 400 306 C 478 306 504 424 504 560 C 504 700 460 758 400 758 C 340 758 296 700 296 560 C 296 424 322 306 400 306 Z";
    return `
      <path d="${bodyPath}" fill="url(#glassGrad)"/>
      <path d="${bodyPath}" fill="url(#glassEdge)" opacity="0.6"/>
      <path d="${bodyPath}" fill="none" stroke="${GLASS_STROKE}" stroke-opacity="0.22" stroke-width="1.5"/>
      <path d="M 314 350 L 314 706" stroke="url(#facetLeft)" stroke-width="4" opacity="0.55"/>
      <path d="M 400 298 L 400 766" stroke="url(#facetRight)" stroke-width="3" opacity="0.45"/>
      <path d="M 486 356 L 486 700" stroke="url(#facetLeft)" stroke-width="2.5" opacity="0.35"/>
      <clipPath id="bodyClip"><path d="${clipPath}"/></clipPath>
      <g clip-path="url(#bodyClip)">
        <rect x="288" y="${liquidTop}" width="224" height="700" fill="url(#liquidGrad)"/>
        <path d="M 296 ${liquidTop} Q 360 ${liquidTop - 26} 400 ${liquidTop} T 504 ${liquidTop} L 504 ${liquidTop + 44} L 296 ${liquidTop + 44} Z" fill="#ffffff" opacity="0.16"/>
        ${bubbles(400, liquidTop + 44, 744, 17, 12)}
        <circle cx="360" cy="440" r="70" fill="#ffffff" opacity="0.05"/>
      </g>
      <path d="${bodyPath}" fill="none" stroke="#ffffff" stroke-opacity="0.1" stroke-width="1"/>
      <g>
        <rect x="352" y="448" width="96" height="120" rx="6" fill="${MIDNIGHT}" opacity="0.5"/>
        <rect x="352" y="448" width="96" height="120" rx="6" fill="none" stroke="url(#labelGold)" stroke-opacity="0.85" stroke-width="2"/>
        <rect x="356" y="452" width="88" height="112" rx="4" fill="none" stroke="url(#labelGold)" stroke-opacity="0.35" stroke-width="1"/>
        <text x="400" y="492" text-anchor="middle" font-family="Georgia, serif" font-size="12" fill="${GOLD}" letter-spacing="2">${labelText}</text>
        <line x1="368" y1="502" x2="432" y2="502" stroke="${GOLD}" stroke-opacity="0.55"/>
        <text x="400" y="526" text-anchor="middle" font-family="sans-serif" font-size="9" fill="${PEARL}" opacity="0.8" letter-spacing="2">${labelSub}</text>
      </g>`;
  }

  return `
    <rect x="268" y="298" width="148" height="468" rx="16" fill="url(#glassGrad)"/>
    <rect x="268" y="298" width="148" height="468" rx="16" fill="url(#glassEdge)" opacity="0.6"/>
    <rect x="268" y="298" width="148" height="468" rx="16" fill="none" stroke="${GLASS_STROKE}" stroke-opacity="0.22" stroke-width="1.5"/>
    <path d="M 284 298 L 284 766" stroke="url(#facetLeft)" stroke-width="4" opacity="0.6"/>
    <path d="M 400 298 L 400 766" stroke="url(#facetRight)" stroke-width="3" opacity="0.5"/>
    <clipPath id="bodyClip">
      <rect x="276" y="300" width="132" height="462" rx="12"/>
    </clipPath>
    <g clip-path="url(#bodyClip)">
      <rect x="276" y="${liquidTop}" width="132" height="700" fill="url(#liquidGrad)"/>
      <path d="M 276 ${liquidTop} Q 316 ${liquidTop - 26} 356 ${liquidTop} T 408 ${liquidTop} L 408 ${liquidTop + 40} L 276 ${liquidTop + 40} Z" fill="#ffffff" opacity="0.16"/>
      ${bubbles(342, liquidTop + 40, 760, 11, 12)}
      <circle cx="330" cy="420" r="70" fill="#ffffff" opacity="0.05"/>
    </g>
    <rect x="268" y="298" width="148" height="468" rx="16" fill="none" stroke="#ffffff" stroke-opacity="0.1" stroke-width="1"/>
    <g>
      <rect x="330" y="360" width="96" height="120" rx="4" fill="${MIDNIGHT}" opacity="0.5"/>
      <rect x="330" y="360" width="96" height="120" rx="4" fill="none" stroke="url(#labelGold)" stroke-opacity="0.85" stroke-width="2"/>
      <rect x="334" y="364" width="88" height="112" rx="2.5" fill="none" stroke="url(#labelGold)" stroke-opacity="0.35" stroke-width="1"/>
      <text x="378" y="404" text-anchor="middle" font-family="Georgia, serif" font-size="13" fill="${GOLD}" letter-spacing="3">THE OCEAN</text>
      <line x1="344" y1="414" x2="412" y2="414" stroke="${GOLD}" stroke-opacity="0.6"/>
      <text x="378" y="438" text-anchor="middle" font-family="Georgia, serif" font-size="11" fill="${GOLD}" letter-spacing="2">${labelText}</text>
      <text x="378" y="462" text-anchor="middle" font-family="sans-serif" font-size="9" fill="${PEARL}" opacity="0.8" letter-spacing="2">${labelSub}</text>
    </g>`;
}

function makeBottle({ w, h, shape, liquidTop, liquid, liquidLow, glowColor, labelText, labelSub, bgDefs, bgBody, particles }) {
  const defs = `
    <defs>
      ${bgDefs}
      <linearGradient id="glassGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#06111f" stop-opacity="0.85"/>
        <stop offset="0.22" stop-color="#0e2740" stop-opacity="0.65"/>
        <stop offset="0.5" stop-color="#12324f" stop-opacity="0.55"/>
        <stop offset="0.82" stop-color="#0b2439" stop-opacity="0.7"/>
        <stop offset="1" stop-color="#06111f" stop-opacity="0.9"/>
      </linearGradient>
      <linearGradient id="glassEdge" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#ffffff" stop-opacity="0.22"/>
        <stop offset="0.06" stop-color="#ffffff" stop-opacity="0.5"/>
        <stop offset="0.18" stop-color="#ffffff" stop-opacity="0.05"/>
        <stop offset="1" stop-color="#000000" stop-opacity="0.35"/>
      </linearGradient>
      <linearGradient id="facetLeft" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#ffffff" stop-opacity="0.35"/>
        <stop offset="1" stop-color="#ffffff" stop-opacity="0.02"/>
      </linearGradient>
      <linearGradient id="facetRight" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#ffffff" stop-opacity="0.03"/>
        <stop offset="1" stop-color="#000000" stop-opacity="0.3"/>
      </linearGradient>
      <linearGradient id="neckGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#0c2740"/>
        <stop offset="1" stop-color="#1b4a6f"/>
      </linearGradient>
      <linearGradient id="liquidGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${liquidLow}" stop-opacity="0.96"/>
        <stop offset="0.55" stop-color="${liquid}" stop-opacity="0.92"/>
        <stop offset="1" stop-color="${liquid}" stop-opacity="0.6"/>
      </linearGradient>
      <linearGradient id="cap" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${GOLD_L}"/>
        <stop offset="0.35" stop-color="${GOLD}"/>
        <stop offset="0.75" stop-color="${GOLD_D}"/>
        <stop offset="1" stop-color="#7c5f2e"/>
      </linearGradient>
      <linearGradient id="cap2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${GOLD_L}"/>
        <stop offset="0.5" stop-color="${GOLD_D}"/>
        <stop offset="1" stop-color="#6b4f24"/>
      </linearGradient>
      <linearGradient id="labelGold" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${GOLD_L}"/>
        <stop offset="0.5" stop-color="${GOLD}"/>
        <stop offset="1" stop-color="${GOLD_D}"/>
      </linearGradient>
      <filter id="softGlow" x="-80%" y="-80%" width="260%" height="260%">
        <feGaussianBlur stdDeviation="26"/>
      </filter>
      <filter id="bottleShadow" x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur stdDeviation="14"/>
      </filter>
      <radialGradient id="backGlow" cx="0.5" cy="0.3" r="0.9">
        <stop offset="0" stop-color="${glowColor}" stop-opacity="0.5"/>
        <stop offset="0.5" stop-color="${glowColor}" stop-opacity="0.16"/>
        <stop offset="1" stop-color="${glowColor}" stop-opacity="0"/>
      </radialGradient>
    </defs>`;

  const body = `
    <rect width="${w}" height="${h}" fill="url(#bgMain)"/>
    <circle cx="${w / 2}" cy="${h * 0.3}" r="${w * 0.42}" fill="url(#backGlow)"/>
    ${bgBody}
    ${particles}
    <g>
      <ellipse cx="400" cy="792" rx="170" ry="30" fill="${MIDNIGHT}" opacity="0.65"/>
      <ellipse cx="400" cy="788" rx="140" ry="20" fill="${NAVY}" opacity="0.85"/>
      <g style="filter:url(#softGlow)">
        <ellipse cx="400" cy="430" rx="140" ry="230" fill="${glowColor}" opacity="0.14"/>
      </g>
      <rect x="300" y="150" width="200" height="120" rx="10" fill="${GOLD}" opacity="0"/>
      <g>
        <rect x="286" y="196" width="120" height="36" rx="7" fill="url(#cap)"/>
        <rect x="288" y="206" width="116" height="4" rx="2" fill="${GOLD_L}" opacity="0.7"/>
        <g fill="${GOLD_D}" opacity="0.8">
          <rect x="286" y="216" width="120" height="4" rx="2"/>
          <rect x="286" y="224" width="120" height="4" rx="2"/>
        </g>
        <rect x="298" y="232" width="96" height="34" rx="7" fill="url(#cap2)"/>
        <rect x="298" y="234" width="96" height="4" rx="2" fill="${GOLD_L}" opacity="0.5"/>
        <rect x="322" y="264" width="40" height="34" fill="url(#neckGrad)"/>
        <rect x="322" y="264" width="40" height="34" fill="#ffffff" opacity="0.06"/>
        ${shapeMarkup(shape, { liquidTop, labelText, labelSub })}
        <path d="M 320 300 L 380 300" stroke="#ffffff" stroke-opacity="0.5" stroke-width="10" stroke-linecap="round" transform="rotate(18 320 300)"/>
      </g>
    </g>`;

  return wrap(defs, body, { w, h });
}

// ---------------------------------------------------------------- products

const bgDefsBase = `
  <linearGradient id="bgMain" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="${NAVY}"/>
    <stop offset="0.55" stop-color="${MIDNIGHT}"/>
    <stop offset="1" stop-color="${MIDNIGHT}"/>
  </linearGradient>
  <linearGradient id="wave0" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="#1E5B85"/>
    <stop offset="1" stop-color="#0B3D5C"/>
  </linearGradient>
  <linearGradient id="wave1" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="#2E6D99"/>
    <stop offset="1" stop-color="#0E4A6E"/>
  </linearGradient>
  <linearGradient id="wave2" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="#1B527C"/>
    <stop offset="1" stop-color="#07283F"/>
  </linearGradient>
  <linearGradient id="wave3" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="#123F60"/>
    <stop offset="1" stop-color="#05192B"/>
  </linearGradient>
`;

const waveBody = `
  <path d="M0 250 Q 200 180 400 250 T 800 250 L 800 1000 L 0 1000 Z" fill="url(#wave0)" opacity="0.14"/>
  <path d="M0 300 Q 200 240 400 300 T 800 300 L 800 1000 L 0 1000 Z" fill="url(#wave1)" opacity="0.12"/>
  <path d="M0 360 Q 200 300 400 360 T 800 360 L 800 1000 L 0 1000 Z" fill="url(#wave2)" opacity="0.1"/>
  <path d="M0 430 Q 200 370 400 430 T 800 430 L 800 1000 L 0 1000 Z" fill="url(#wave3)" opacity="0.08"/>
`;

const productBlue = makeBottle({
  w: 800, h: 1000,
  shape: "oval",
  liquidTop: 400, liquid: "#1E7FB8", liquidLow: "#2FA6E0",
  glowColor: "#2E9BD6",
  labelText: "OCEAN BLUE", labelSub: "Eau de Parfum",
  bgDefs: bgDefsBase, bgBody: waveBody,
  particles: bubbles(400, 60, 200, 3, 8) + bubbles(660, 500, 950, 19, 12),
});

const productNoir = makeBottle({
  w: 800, h: 1000,
  shape: "round",
  liquidTop: 410, liquid: "#0A1A2E", liquidLow: "#1E3A5F",
  glowColor: "#4A5F8A",
  labelText: "OCEAN NOIR", labelSub: "Eau de Parfum",
  bgDefs: bgDefsBase, bgBody: waveBody,
  particles: bubbles(400, 60, 200, 5, 7) + bubbles(660, 500, 950, 23, 11),
});

const productGold = makeBottle({
  w: 800, h: 1000,
  shape: "rect",
  liquidTop: 390, liquid: "#B0793A", liquidLow: "#E3B96B",
  glowColor: "#D6B36A",
  labelText: "OCEAN GOLD", labelSub: "Eau de Parfum",
  bgDefs: bgDefsBase, bgBody: waveBody,
  particles: bubbles(400, 60, 200, 9, 8) + bubbles(660, 500, 950, 13, 12),
});

// ---------------------------------------------------------------- hero bottle

const heroDefs = `
  <defs>
    ${bgDefsBase}
    <linearGradient id="glassGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#06111f" stop-opacity="0.85"/>
      <stop offset="0.22" stop-color="#0e2740" stop-opacity="0.6"/>
      <stop offset="0.5" stop-color="#12324f" stop-opacity="0.5"/>
      <stop offset="0.82" stop-color="#0b2439" stop-opacity="0.7"/>
      <stop offset="1" stop-color="#06111f" stop-opacity="0.9"/>
    </linearGradient>
    <linearGradient id="glassEdge" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.24"/>
      <stop offset="0.06" stop-color="#ffffff" stop-opacity="0.55"/>
      <stop offset="0.18" stop-color="#ffffff" stop-opacity="0.04"/>
      <stop offset="1" stop-color="#000000" stop-opacity="0.38"/>
    </linearGradient>
    <linearGradient id="facetLeft" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.4"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0.02"/>
    </linearGradient>
    <linearGradient id="facetRight" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.02"/>
      <stop offset="1" stop-color="#000000" stop-opacity="0.3"/>
    </linearGradient>
    <linearGradient id="neckGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#0c2740"/>
      <stop offset="1" stop-color="#1b4a6f"/>
    </linearGradient>
    <linearGradient id="liquidGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#2FA6E0" stop-opacity="0.96"/>
      <stop offset="0.55" stop-color="#1E7FB8" stop-opacity="0.92"/>
      <stop offset="1" stop-color="#155A86" stop-opacity="0.7"/>
    </linearGradient>
    <linearGradient id="cap" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${GOLD_L}"/>
      <stop offset="0.35" stop-color="${GOLD}"/>
      <stop offset="0.75" stop-color="${GOLD_D}"/>
      <stop offset="1" stop-color="#7c5f2e"/>
    </linearGradient>
    <linearGradient id="cap2" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${GOLD_L}"/>
      <stop offset="0.5" stop-color="${GOLD_D}"/>
      <stop offset="1" stop-color="#6b4f24"/>
    </linearGradient>
    <linearGradient id="labelGold" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${GOLD_L}"/>
      <stop offset="0.5" stop-color="${GOLD}"/>
      <stop offset="1" stop-color="${GOLD_D}"/>
    </linearGradient>
    <radialGradient id="backGlow" cx="0.5" cy="0.32" r="0.9">
      <stop offset="0" stop-color="#1E7FB8" stop-opacity="0.55"/>
      <stop offset="0.5" stop-color="#155A86" stop-opacity="0.2"/>
      <stop offset="1" stop-color="#020B16" stop-opacity="0"/>
    </radialGradient>
    <filter id="softGlow" x="-80%" y="-80%" width="260%" height="260%">
      <feGaussianBlur stdDeviation="30"/>
    </filter>
  </defs>`;

const heroBody = `
  <rect width="1200" height="1200" fill="url(#bgMain)"/>
  <circle cx="600" cy="380" r="520" fill="url(#backGlow)"/>
  <g opacity="0.9">
    <path d="M0 300 Q 300 210 600 300 T 1200 300 L 1200 1200 L 0 1200 Z" fill="url(#wave0)" opacity="0.12"/>
    <path d="M0 380 Q 300 300 600 380 T 1200 380 L 1200 1200 L 0 1200 Z" fill="url(#wave1)" opacity="0.1"/>
    <path d="M0 470 Q 300 390 600 470 T 1200 470 L 1200 1200 L 0 1200 Z" fill="url(#wave2)" opacity="0.09"/>
    <path d="M0 570 Q 300 490 600 570 T 1200 570 L 1200 1200 L 0 1200 Z" fill="url(#wave3)" opacity="0.08"/>
  </g>
  ${bubbles(600, 80, 380, 7, 16)}
  <g>
    <ellipse cx="600" cy="1020" rx="260" ry="44" fill="#000000" opacity="0.55"/>
    <ellipse cx="600" cy="1012" rx="220" ry="30" fill="${NAVY}" opacity="0.85"/>
    <g style="filter:url(#softGlow)">
      <ellipse cx="600" cy="540" rx="210" ry="320" fill="#1E7FB8" opacity="0.16"/>
    </g>
    <rect x="426" y="252" width="176" height="52" rx="9" fill="url(#cap)"/>
    <rect x="430" y="266" width="168" height="6" rx="3" fill="${GOLD_L}" opacity="0.75"/>
    <g fill="${GOLD_D}" opacity="0.85">
      <rect x="426" y="282" width="176" height="6" rx="3"/>
      <rect x="426" y="292" width="176" height="6" rx="3"/>
    </g>
    <rect x="448" y="304" width="132" height="48" rx="9" fill="url(#cap2)"/>
    <rect x="452" y="308" width="124" height="6" rx="3" fill="${GOLD_L}" opacity="0.5"/>
    <rect x="484" y="350" width="60" height="52" fill="url(#neckGrad)"/>
    <rect x="484" y="350" width="60" height="52" fill="#ffffff" opacity="0.06"/>
    <rect x="402" y="402" width="224" height="620" rx="36" fill="url(#glassGrad)"/>
    <rect x="402" y="402" width="224" height="620" rx="36" fill="url(#glassEdge)" opacity="0.6"/>
    <rect x="402" y="402" width="224" height="620" rx="36" fill="none" stroke="${GLASS_STROKE}" stroke-opacity="0.24" stroke-width="2"/>
    <path d="M 428 402 L 428 1022" stroke="url(#facetLeft)" stroke-width="6" opacity="0.6"/>
    <path d="M 600 402 L 600 1022" stroke="url(#facetRight)" stroke-width="4" opacity="0.5"/>
    <clipPath id="heroClip">
      <rect x="412" y="404" width="204" height="614" rx="30"/>
    </clipPath>
    <g clip-path="url(#heroClip)">
      <rect x="412" y="540" width="204" height="900" fill="url(#liquidGrad)"/>
      <path d="M 412 540 Q 472 508 532 540 T 616 540 L 616 596 L 412 596 Z" fill="#ffffff" opacity="0.18"/>
      ${bubbles(514, 580, 980, 17, 18)}
      <circle cx="480" cy="560" r="110" fill="#ffffff" opacity="0.05"/>
    </g>
    <rect x="402" y="402" width="224" height="620" rx="36" fill="none" stroke="#ffffff" stroke-opacity="0.1" stroke-width="1.5"/>
    <g>
      <rect x="494" y="520" width="132" height="164" rx="6" fill="${MIDNIGHT}" opacity="0.5"/>
      <rect x="494" y="520" width="132" height="164" rx="6" fill="none" stroke="url(#labelGold)" stroke-opacity="0.9" stroke-width="2.5"/>
      <rect x="500" y="526" width="120" height="152" rx="4" fill="none" stroke="url(#labelGold)" stroke-opacity="0.35" stroke-width="1.2"/>
      <text x="560" y="584" text-anchor="middle" font-family="Georgia, serif" font-size="19" fill="${GOLD}" letter-spacing="4">THE OCEAN</text>
      <line x1="516" y1="600" x2="604" y2="600" stroke="${GOLD}" stroke-opacity="0.6"/>
      <text x="560" y="638" text-anchor="middle" font-family="Georgia, serif" font-size="15" fill="${GOLD}" letter-spacing="3">PERFUMES</text>
      <text x="560" y="664" text-anchor="middle" font-family="sans-serif" font-size="12" fill="${PEARL}" opacity="0.85" letter-spacing="3">EAU DE PARFUM</text>
    </g>
    <path d="M 470 420 L 560 420" stroke="#ffffff" stroke-opacity="0.55" stroke-width="14" stroke-linecap="round" transform="rotate(16 470 420)"/>
  </g>
  ${bubbles(620, 420, 1000, 29, 20)}
`;

const heroBottle = wrap(heroDefs, heroBody, { w: 1200, h: 1200 });

// ---------------------------------------------------------------- CEO portrait

const ceoDefs = `
  <defs>
    <linearGradient id="ceoBg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#0A2A44"/>
      <stop offset="0.5" stop-color="${NAVY}"/>
      <stop offset="1" stop-color="${MIDNIGHT}"/>
    </linearGradient>
    <radialGradient id="ceoGlow" cx="0.5" cy="0.3" r="0.9">
      <stop offset="0" stop-color="${GOLD}" stop-opacity="0.4"/>
      <stop offset="0.45" stop-color="${GOLD}" stop-opacity="0.1"/>
      <stop offset="1" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="suitGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#0E2840"/>
      <stop offset="1" stop-color="#05141F"/>
    </linearGradient>
    <linearGradient id="shirtGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#FFFFFF"/>
      <stop offset="1" stop-color="#CBD6E2"/>
    </linearGradient>
    <linearGradient id="skinGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#0A2030"/>
      <stop offset="1" stop-color="#030B13"/>
    </linearGradient>
    <linearGradient id="rim" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${GOLD_L}"/>
      <stop offset="0.5" stop-color="${GOLD}"/>
      <stop offset="1" stop-color="${GOLD_D}"/>
    </linearGradient>
    <filter id="glowBig" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="34"/>
    </filter>
    <filter id="glowSmall" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="8"/>
    </filter>
    <linearGradient id="wave0" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#1E5B85"/>
      <stop offset="1" stop-color="#0B3D5C"/>
    </linearGradient>
    <linearGradient id="wave1" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#2E6D99"/>
      <stop offset="1" stop-color="#0E4A6E"/>
    </linearGradient>
  </defs>`;

const ceoBody = `
  <rect width="1000" height="1100" fill="url(#ceoBg)"/>
  <circle cx="500" cy="330" r="470" fill="url(#ceoGlow)"/>
  <path d="M0 880 Q 250 800 500 880 T 1000 880 L 1000 1100 L 0 1100 Z" fill="url(#wave0)" opacity="0.14"/>
  <path d="M0 940 Q 250 870 500 940 T 1000 940 L 1000 1100 L 0 1100 Z" fill="url(#wave1)" opacity="0.12"/>
  ${bubbles(500, 40, 240, 5, 10)}
  <g style="filter:url(#glowBig)" opacity="0.8">
    <path d="M 505 168 C 600 168 660 300 660 390 C 660 470 640 520 620 555 C 700 600 760 680 790 780 L 210 780 C 240 680 300 600 380 555 C 360 520 340 470 340 390 C 340 300 410 168 505 168 Z" stroke="url(#rim)" stroke-width="4" fill="none"/>
  </g>
  <g>
    <path d="M 505 168 C 600 168 660 300 660 390 C 660 470 640 520 620 555 C 700 600 760 680 790 780 L 210 780 C 240 680 300 600 380 555 C 360 520 340 470 340 390 C 340 300 410 168 505 168 Z" fill="url(#suitGrad)"/>
    <path d="M 505 168 C 600 168 660 300 660 390 C 660 470 640 520 620 555 C 700 600 760 680 790 780 L 210 780 C 240 680 300 600 380 555 C 360 520 340 470 340 390 C 340 300 410 168 505 168 Z" fill="none" stroke="url(#rim)" stroke-width="3" opacity="0.9"/>
    <path d="M 400 560 C 430 640 460 720 470 780 L 530 780 C 540 720 570 640 600 560 C 560 560 530 570 500 570 C 470 570 440 560 400 560 Z" fill="url(#shirtGrad)"/>
    <path d="M 470 780 L 500 620 L 530 780 L 470 780 Z" fill="none" stroke="${GOLD_D}" stroke-width="2" opacity="0.6"/>
    <path d="M 505 168 C 600 168 660 300 660 390 C 660 470 640 520 620 555 L 505 555 C 500 500 490 420 490 360 C 490 260 500 200 505 168 Z" fill="${NAVY}" opacity="0.5"/>
    <path d="M 505 168 C 600 168 660 300 660 390 C 660 470 640 520 620 555 L 505 555 Z" fill="none" stroke="#8FB6D6" stroke-opacity="0.28" stroke-width="5"/>
    <path d="M 505 168 C 420 168 360 300 360 400 C 360 440 370 480 385 520 L 505 555 C 500 500 490 420 490 360 C 490 260 500 200 505 168 Z" fill="url(#skinGrad)" opacity="0.9"/>
    <g style="filter:url(#glowSmall)">
      <path d="M 380 240 C 430 200 470 190 505 190 C 540 190 580 210 620 260" stroke="${GOLD_L}" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.7"/>
    </g>
  </g>
  <g style="filter:url(#glowSmall)">
    <path d="M 505 168 C 600 168 660 300 660 390 C 660 470 640 520 620 555" stroke="${GOLD_L}" stroke-width="2" fill="none" opacity="0.6"/>
  </g>
  <text x="500" y="870" text-anchor="middle" font-family="Georgia, serif" font-size="30" fill="${GOLD}" letter-spacing="5">MUHAMMAD MUBASHIR ALI</text>
  <text x="500" y="916" text-anchor="middle" font-family="sans-serif" font-size="17" fill="${PEARL}" opacity="0.85" letter-spacing="4">CHIEF EXECUTIVE OFFICER</text>
  <line x1="430" y1="940" x2="570" y2="940" stroke="url(#rim)" stroke-width="2" opacity="0.7"/>
  <text x="500" y="985" text-anchor="middle" font-family="Georgia, serif" font-size="20" fill="${GOLD}" letter-spacing="6" opacity="0.85">THE OCEAN PERFUMES</text>
`;

const ceo = wrap(ceoDefs, ceoBody, { w: 1000, h: 1100 });

async function render(name, svg, { jpeg = false, width } = {}) {
  let img = sharp(Buffer.from(svg));
  const meta = await img.metadata();
  const w = width ?? meta.width;
  img = img.resize(w, Math.round((w * meta.height) / meta.width));
  const out = `${OUT}/${name}`;
  if (jpeg) {
    await img.jpeg({ quality: 92, mozjpeg: true }).toFile(out);
  } else {
    await img.png({ quality: 100, compressionLevel: 9 }).toFile(out);
  }
  console.log("generated", out);
}

await render("product-ocean-blue.jpg", productBlue, { jpeg: true, width: 800 });
await render("product-ocean-noir.jpg", productNoir, { jpeg: true, width: 800 });
await render("product-ocean-gold.jpg", productGold, { jpeg: true, width: 800 });
await render("bottle-hero.png", heroBottle, { width: 900 });
await render("ceo.jpg", ceo, { jpeg: true, width: 800 });
await render("ceo.png", ceo, { width: 800 });

console.log("done");
