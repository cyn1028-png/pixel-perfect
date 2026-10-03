import { Link } from "react-router";
import { useEffect, useRef, useState } from "react";
import { Plane, BellRing, CalendarX2 } from "lucide-react";
import { usePageMeta } from "@/lib/use-page-meta";
import { Dachshund, LollipopTree, Medallion, Skyline, palettes } from "@/components/decor/Folk";

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      {children}
    </div>
  );
}

const featureTone = [
  { ring: "var(--gold)", fill: "var(--primary)" },
  { ring: "var(--terracotta)", fill: "var(--teal)" },
  { ring: "var(--dusty-blue)", fill: "var(--ink)" },
];

const features = [
  {
    icon: Plane,
    title: "盯緊熱門航線",
    en: "Always-on route watching",
    body: "持續監控台北出發的熱門航線（東京、首爾），自動抓最低票價。",
  },
  {
    icon: BellRing,
    title: "達標自動通知",
    en: "Target-price email alerts",
    body: "低於你設定的目標價，就寄 email 提醒你，附上立即訂購連結。",
  },
  {
    icon: CalendarX2,
    title: "隨時取消",
    en: "Cancel anytime",
    body: "月訂閱制，不想用隨時停，沒有綁約。",
  },
];

export function LandingPage() {
  usePageMeta({
    title: "Flight Price Notifier — 機票降價通知",
    description:
      "設定航線與目標價，機票降價就通知你。Set a route and a target price — we email you when the fare drops.",
    ogDescription: "Set a route and a target price — we email you when the fare drops.",
  });

  return (
    <div className="bg-polka min-h-screen text-foreground">
      <header className="sticky top-0 z-20 border-b-2 border-ink bg-cream/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <span className="flex items-center gap-2 font-display text-base font-bold tracking-tight sm:text-lg">
            <Medallion size={28} palette={palettes.sun} className="folk-spin" />
            Flight Price Notifier
          </span>
          <Link
            to="/sign-in"
            className="rounded-full border-2 border-ink bg-primary px-5 py-2 text-sm font-bold text-primary-foreground shadow-glow transition-all hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--ink)] active:translate-y-0 active:shadow-none"
          >
            Sign in / 登入
          </Link>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-x-0 -top-40 h-[32rem] bg-hero-glow" />
          <Medallion
            size={110}
            palette={palettes.sun}
            spokes={26}
            className="folk-spin pointer-events-none absolute right-[8%] top-10 hidden sm:block"
          />
          <Medallion
            size={48}
            palette={palettes.coral}
            className="pointer-events-none absolute left-[10%] top-16 hidden sm:block"
          />
          <LollipopTree
            height={300}
            palette={palettes.rose}
            className="pointer-events-none absolute bottom-2 left-[-30px] z-10 hidden md:block lg:left-[4%]"
          />
          <LollipopTree
            height={250}
            palette={palettes.coral}
            className="pointer-events-none absolute bottom-2 right-[-20px] z-10 hidden md:block lg:right-[5%]"
          />
          <div className="relative mx-auto max-w-4xl px-6 pb-64 pt-20 text-center sm:pb-80 sm:pt-28">
            <Reveal>
              <span className="inline-flex items-center rounded-full border-2 border-ink bg-cream px-4 py-1 text-xs font-bold tracking-wide">
                台北出發 · 東京 / 首爾
              </span>
              <h1 className="mt-6 bg-text-gradient bg-clip-text font-display text-5xl font-bold italic tracking-tight text-transparent sm:text-7xl">
                Flight Price Notifier
              </h1>
              <div className="dotted-rule mx-auto mt-6 w-40" aria-hidden />
              <p className="mt-6 text-xl font-bold sm:text-2xl">
                設定航線與目標價，機票降價就通知你
              </p>
              <p className="mt-3 text-base text-muted-foreground">
                Set a route and a target price — we email you when the fare drops.
              </p>
              <div className="mt-10 flex justify-center">
                <Link
                  to="/sign-in"
                  className="rounded-full border-2 border-ink bg-primary px-8 py-3 text-base font-bold text-primary-foreground shadow-glow transition-all hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--ink)] active:translate-y-0 active:shadow-none"
                >
                  Sign in / 登入
                </Link>
              </div>
            </Reveal>
          </div>
          <Skyline className="pointer-events-none absolute inset-x-0 bottom-0 h-56 w-full sm:h-64" />
          <div className="absolute inset-x-0 bottom-0 h-2 bg-ink" aria-hidden />
        </section>

        <section className="mx-auto max-w-6xl px-6 py-24">
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((f, i) => (
              <Reveal key={f.en} delay={i * 120}>
                <article className="folk-card h-full rounded-3xl p-7 transition-transform hover:-translate-y-1 hover:rotate-[-0.5deg]">
                  <span
                    className="inline-flex h-14 w-14 items-center justify-center rounded-full border-2 border-dashed"
                    style={{
                      borderColor: featureTone[i]?.ring,
                      backgroundColor: featureTone[i]?.fill,
                    }}
                  >
                    <f.icon className="h-6 w-6 text-cream" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-xl font-bold">{f.title}</h3>
                  <p className="text-sm font-semibold italic text-primary">{f.en}</p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>
      </main>

      <footer className="relative border-t-2 border-ink bg-dress py-8 text-center text-sm font-semibold text-cream">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-4 px-6">
          <span className="rounded-full bg-ink px-3 py-1">© 2026 Flight Price Notifier</span>
          <Dachshund size={70} className="hidden rounded-xl bg-cream p-1 sm:block" />
        </div>
      </footer>
    </div>
  );
}
