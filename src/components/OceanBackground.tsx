"use client";

type Particle = {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  tone: "gold" | "pearl";
};

type Star = {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
};

function makeParticles(count: number): Particle[] {
  let seed = 20260817;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed % 1000) / 1000;
  };
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: rnd() * 100,
    top: rnd() * 100,
    size: 2 + rnd() * 4.5,
    duration: 6 + rnd() * 9,
    delay: rnd() * 8,
    opacity: 0.35 + rnd() * 0.55,
    tone: rnd() > 0.45 ? "gold" : "pearl",
  }));
}

function makeStars(count: number): Star[] {
  let seed = 777013;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed % 1000) / 1000;
  };
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: 6 + rnd() * 88,
    top: 6 + rnd() * 84,
    size: 10 + rnd() * 14,
    duration: 4.5 + rnd() * 5,
    delay: rnd() * 6,
  }));
}

const fullParticles = makeParticles(56);
const subtleParticles = makeParticles(24);
const stars = makeStars(6);

export default function OceanBackground({
  intensity = "full",
}: {
  intensity?: "full" | "subtle";
}) {
  const particles = intensity === "full" ? fullParticles : subtleParticles;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#111111_0%,#070707_45%,#000000_100%)]" />

      <div className="absolute -left-40 top-1/4 h-[520px] w-[520px] rounded-full bg-ocean-800/25 blur-[150px]" />
      <div className="absolute -right-32 top-2/3 h-[460px] w-[460px] rounded-full bg-ocean-900/40 blur-[160px]" />
      <div className="absolute bottom-[-160px] left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-gold-300/[0.07] blur-[170px]" />

      <div className="absolute left-1/2 top-[-220px] h-[440px] w-[80vw] max-w-4xl -translate-x-1/2 rounded-full bg-white/[0.05] blur-[150px]" />

      <div className="absolute inset-0 animate-shimmer bg-[linear-gradient(115deg,transparent_26%,rgba(255,255,255,0.05)_40%,rgba(214,179,106,0.07)_50%,rgba(255,255,255,0.05)_60%,transparent_74%)] bg-[length:250%_100%]" />

      <div className="absolute inset-x-0 bottom-0 h-[46%] opacity-60">
        <svg
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="absolute bottom-0 left-0 h-full w-full animate-wave"
        >
          <path
            fill="#0a1119"
            fillOpacity="0.5"
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,208C1248,192,1344,192,1392,192L1440,192L1440,320L0,320Z"
          />
        </svg>
        <svg
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="absolute bottom-0 left-0 h-[85%] w-full animate-wave"
          style={{ animationDelay: "-4s" }}
        >
          <path
            fill="#04070c"
            fillOpacity="0.7"
            d="M0,256L48,240C96,224,192,192,288,197.3C384,203,480,245,576,250.7C672,256,768,224,864,202.7C960,181,1056,171,1152,176C1248,181,1344,203,1392,213.3L1440,224L1440,320L0,320Z"
          />
        </svg>
      </div>

      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute animate-twinkle"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        >
          <span className="absolute left-1/2 top-1/2 h-[2px] w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-transparent via-gold-200 to-transparent" />
          <span className="absolute left-1/2 top-1/2 h-full w-[2px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-b from-transparent via-gold-200 to-transparent" />
        </span>
      ))}

      {particles.map((p) => (
        <span
          key={p.id}
          className={
            p.tone === "gold"
              ? "absolute rounded-full bg-gold-200 animate-twinkle"
              : "absolute rounded-full bg-white animate-twinkle"
          }
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            boxShadow:
              p.tone === "gold"
                ? "0 0 10px rgba(240,217,168,0.85)"
                : "0 0 8px rgba(255,255,255,0.7)",
          }}
        />
      ))}
    </div>
  );
}
