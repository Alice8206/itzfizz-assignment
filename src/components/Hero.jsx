import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Car from "./Car.jsx";

gsap.registerPlugin(ScrollTrigger);

const HEADLINE = "WELCOME ITZ FIZZ";
const STATS = [
  { value: "58%", label: "Increase in pick up point use" },
  { value: "23%", label: "Decrease in customer phone calls" },
  { value: "27%", label: "Increase in pick up point use" },
  { value: "40%", label: "Decrease in customer phone calls" },
];

export default function Hero() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      /* ---------- 1. Intro animation (time based, runs once) ---------- */
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".letter", { yPercent: 100, opacity: 0, duration: 1, stagger: 0.05 })
        .from(".car-wrap", { opacity: 0, y: 40, duration: 1 }, "-=0.6")
        .from(".stat", { y: 40, opacity: 0, duration: 0.8, stagger: 0.25 }, "-=0.4");

      if (reduce) return;

      /* ---------- 2. Scroll-driven animation (scrubbed) ---------- */
      // scrub: 1 => 1s of smoothing (interpolation) between scroll and animation.
      const tl = gsap.timeline({
        defaults: { ease: "none", duration: 1 },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=250%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      tl.fromTo(".car-wrap", { xPercent: -45, scale: 0.85 },
                { xPercent: 45, scale: 1.15, ease: "power1.inOut" }, 0)   // car drives across
        .to(".wheel", { rotation: 1080, transformOrigin: "50% 50%" }, 0)  // wheels spin
        .to(".road-lines", { xPercent: -40 }, 0)                          // road moves opposite
        .to(".headline", { y: -60, opacity: 0.25 }, 0)                    // headline drifts up
        .to(".stats", { y: -30 }, 0)                                      // stats lift gently
        .to(".glow", { xPercent: 60, opacity: 0.9 }, 0);                  // ambient glow follows
    }, root);

    return () => ctx.revert(); // clean up on unmount (StrictMode safe)
  }, []);

  return (
    <section ref={root} className="relative h-screen w-full overflow-hidden bg-neutral-950">
      {/* ambient glow */}
      <div className="glow will-move pointer-events-none absolute -left-1/4 top-1/3 h-[60vh] w-[60vh] rounded-full bg-orange-500/30 opacity-60 blur-[120px]" />

      {/* Headline */}
      <h1 className="headline will-move absolute inset-x-0 top-[14vh] flex justify-center gap-[0.35em] text-center text-3xl font-light sm:text-5xl md:text-6xl">
        {HEADLINE.split("").map((ch, i) => (
          <span key={i} className="inline-block overflow-hidden">
            <span className="letter will-move inline-block">{ch === " " ? "\u00A0" : ch}</span>
          </span>
        ))}
      </h1>

      {/* Car + road */}
      <div className="absolute inset-x-0 top-[34vh] flex justify-center">
        <div className="car-wrap will-move w-[80vw] max-w-3xl">
          <Car />
        </div>
      </div>
      <div className="absolute inset-x-0 top-[34vh] mt-[min(22vw,13rem)] h-px bg-neutral-700">
        <div className="road-lines will-move absolute -inset-x-1/2 top-2 h-1 w-[200%]"
             style={{ backgroundImage: "repeating-linear-gradient(90deg,#525252 0 40px,transparent 40px 90px)" }} />
      </div>

      {/* Stats */}
      <div className="stats will-move absolute inset-x-0 bottom-[6vh] mx-auto grid w-full max-w-5xl grid-cols-2 gap-6 px-6 md:grid-cols-4">
        {STATS.map((s, i) => (
          <div key={i} className="stat will-move text-center md:text-left">
            <div className="text-4xl font-semibold text-orange-400 md:text-5xl">{s.value}</div>
            <p className="mt-1 text-xs text-neutral-400 md:text-sm">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
