import { useEffect, useMemo, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { animate, createScope, stagger } from "animejs";
import Button from "../components/Button";
import SectionLabel from "../components/SectionLabel";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const headline = "FPB CALCULATION THROUGH FACTOR TREE PRECISION";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 34,
    filter: "blur(10px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.95,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const fadeLeft = {
  hidden: {
    opacity: 0,
    x: 42,
    filter: "blur(10px)",
  },
  show: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.25,
    },
  },
};

const steps = [
  {
    number: "Step 01",
    title: "Prime Factors",
    text: "Breaks each input number into a list of prime factors.",
  },
  {
    number: "Step 02",
    title: "Factor Map",
    text: "Counts every factor and converts it into exponent form.",
  },
  {
    number: "Step 03",
    title: "FPB Result",
    text: "Selects common factors and multiplies the lowest exponents.",
  },
];

const examples = [
  {
    label: "84",
    value: "2^2 × 3^1 × 7^1",
  },
  {
    label: "60",
    value: "2^2 × 3^1 × 5^1",
  },
];

export default function Landing() {
  const rootRef = useRef(null);
  const animeScope = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const headingChars = useMemo(() => headline.split(""), []);

  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start start", "end start"],
  });

  const heroContentY = useTransform(scrollYProgress, [0, 0.35], [0, -42]);
  const heroContentOpacity = useTransform(
    scrollYProgress,
    [0, 0.28],
    [1, 0.35]
  );

  useEffect(() => {
    if (!rootRef.current) return;

    if (shouldReduceMotion) {
      rootRef.current
        .querySelectorAll(".anime-char, .anime-tick")
        .forEach((element) => {
          element.style.opacity = "1";
          element.style.transform = "none";
        });

      return;
    }

    animeScope.current = createScope({ root: rootRef }).add(() => {
      animate(".anime-char", {
        opacity: [0, 1],
        translateY: [28, 0],
        duration: 900,
        delay: stagger(18, { start: 180 }),
        ease: "out(4)",
      });

      animate(".anime-tick", {
        opacity: [0, 1],
        scaleX: [0, 1],
        duration: 900,
        delay: stagger(90, { start: 900 }),
        ease: "out(4)",
      });
    });

    return () => {
      animeScope.current?.revert();
    };
  }, [shouldReduceMotion]);

  useGSAP(
    () => {
      if (shouldReduceMotion) return;

      gsap.matchMedia().add(
        {
          isMobile: "(max-width: 767px)",
          isTablet: "(min-width: 768px) and (max-width: 1023px)",
          isDesktop: "(min-width: 1024px)",
        },
        (context) => {
          const { isMobile, isTablet } = context.conditions;

          gsap.to(".photo-band", {
            backgroundPosition: isMobile
              ? "center 18%"
              : isTablet
                ? "center 38%"
                : "center 42%",
            ease: "none",
            scrollTrigger: {
              trigger: ".hero-section",
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });

          gsap.from(".gsap-line", {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 1.25,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".core-section",
              start: isMobile ? "top 82%" : "top 72%",
            },
          });

          gsap.from(".gsap-reveal", {
            autoAlpha: 0,
            y: isMobile ? 28 : 44,
            duration: 1.05,
            stagger: isMobile ? 0.08 : 0.14,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".core-section",
              start: isMobile ? "top 82%" : "top 72%",
            },
          });

          gsap.from(".step-card", {
            autoAlpha: 0,
            y: isMobile ? 24 : 36,
            duration: 0.9,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".steps-grid",
              start: isMobile ? "top 86%" : "top 78%",
            },
          });

          gsap.from(".example-reveal", {
            autoAlpha: 0,
            y: isMobile ? 26 : 44,
            duration: 0.95,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".example-section",
              start: isMobile ? "top 84%" : "top 72%",
            },
          });

          gsap.fromTo(
            ".counter-12",
            { textContent: 0 },
            {
              textContent: 12,
              duration: 1.25,
              ease: "power2.out",
              snap: { textContent: 1 },
              scrollTrigger: {
                trigger: ".counter-12",
                start: "top 86%",
              },
            }
          );
        }
      );
    },
    {
      scope: rootRef,
      dependencies: [shouldReduceMotion],
      revertOnUpdate: true,
    }
  );

  return (
    <div ref={rootRef} className="page-shell overflow-hidden">
      <section className="hero-section photo-band mobile-safe-hero relative px-5 pt-16 sm:px-6 md:px-10">
        <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.08),transparent_24%),linear-gradient(180deg,rgba(0,0,0,0.06),rgba(0,0,0,0.9))]" />

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[2] h-px bg-[#262626]" />

        <motion.div
          style={{
            y: heroContentY,
            opacity: heroContentOpacity,
          }}
          className="relative z-10 mx-auto flex min-h-[calc(100svh-64px)] max-w-[1280px] flex-col justify-end pb-12 sm:pb-16 md:pb-20"
        >
          <motion.div
            initial={shouldReduceMotion ? false : "hidden"}
            animate="show"
            variants={fadeUp}
          >
            <SectionLabel>Prime Factorization Interface</SectionLabel>
          </motion.div>

          <h1
            className="hero-title display-xl max-w-5xl text-white"
            aria-label={headline}
          >
            {headingChars.map((char, index) => (
              <span
                key={`${char}-${index}`}
                aria-hidden="true"
                className="anime-char inline-block will-change-transform"
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>

          <div className="mt-5 flex max-w-5xl gap-2 sm:mt-6">
            <span className="anime-tick h-px flex-1 origin-left bg-white/70 opacity-0" />
            <span className="anime-tick h-px w-14 origin-left bg-white/40 opacity-0 sm:w-20" />
            <span className="anime-tick h-px w-6 origin-left bg-white/25 opacity-0 sm:w-8" />
          </div>

          <div className="mt-7 grid max-w-5xl gap-7 sm:mt-8 md:grid-cols-[0.72fr_0.28fr] md:items-start">
            <motion.p
              initial={shouldReduceMotion ? false : "hidden"}
              animate="show"
              variants={fadeUp}
              transition={{ delay: 0.45 }}
              className="body-md max-w-2xl text-[#cccccc]"
            >
              A focused mathematical interface designed to calculate the
              greatest common divisor from two integers using prime
              factorization, factor mapping, and a structured factor tree.
            </motion.p>

            <motion.div
              initial={shouldReduceMotion ? false : "hidden"}
              animate="show"
              variants={fadeLeft}
              className="flex items-start md:justify-end"
            >
              <motion.div
                className="w-full sm:w-auto"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.96 }}
              >
                <Button to="/calculator" className="w-full sm:w-auto">
                  Open Calculator
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="core-section border-t border-[#262626] bg-black px-5 py-20 sm:px-6 sm:py-24 md:px-10 md:py-[110px] lg:py-[120px]">
        <div className="mx-auto max-w-[1280px]">
          <div className="gsap-reveal">
            <SectionLabel>Core System</SectionLabel>
          </div>

          <div className="grid gap-8 md:gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <h2 className="gsap-reveal display-lg max-w-2xl text-white">
              BUILT FROM YOUR ORIGINAL ALGORITHM
            </h2>

            <p className="gsap-reveal body-md max-w-2xl text-[#cccccc]">
              This interface keeps the original prime factorization logic:
              divide the number by incremental factors, store each prime factor,
              map the exponents, then multiply the shared factors with the
              smallest powers.
            </p>
          </div>

          <div className="gsap-line mt-14 h-px w-full bg-[#262626] md:mt-20" />

          <div className="steps-grid grid border-b border-[#262626] sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((step, index) => (
              <motion.article
                key={step.title}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -8,
                        backgroundColor: "#0d0d0d",
                      }
                }
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className={[
                  "step-card border-b border-[#262626] py-8 sm:py-10",
                  index === 0 ? "sm:pr-8 lg:pr-10" : "",
                  index === 1
                    ? "sm:border-l sm:px-8 lg:border-l-0 lg:border-r lg:px-10"
                    : "",
                  index === 2
                    ? "sm:col-span-2 lg:col-span-1 lg:border-b lg:pl-10"
                    : "",
                  index !== steps.length - 1 ? "lg:border-r" : "",
                ].join(" ")}
              >
                <p className="caption text-[#999999]">{step.number}</p>

                <h3 className="title-sm mt-5 text-white">{step.title}</h3>

                <p className="body-sm mt-4 text-[#999999]">{step.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="example-section bg-[#0d0d0d] px-5 py-20 sm:px-6 sm:py-24 md:px-10 md:py-[110px] lg:py-[120px]">
        <div className="mx-auto grid max-w-[1280px] gap-10 md:gap-12 lg:grid-cols-2">
          <div className="example-reveal">
            <SectionLabel>Example</SectionLabel>

            <h2 className="display-lg text-white">84 AND 60</h2>

            <p className="body-md mt-6 max-w-xl text-[#999999]">
              A small preview of the calculation flow before the full calculator
              page takes over the work.
            </p>
          </div>

          <div className="grid gap-6">
            {examples.map((item) => (
              <motion.div
                key={item.label}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        x: 8,
                      }
                }
                className="example-reveal border-b border-[#262626] pb-6"
              >
                <p className="caption text-[#999999]">{item.label}</p>

                <p className="display-md mt-2 break-words text-white">
                  {item.value}
                </p>
              </motion.div>
            ))}

            <div className="example-reveal">
              <p className="caption text-[#999999]">Greatest Common Divisor</p>

              <p className="counter-12 display-xl mt-2 text-white">12</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}