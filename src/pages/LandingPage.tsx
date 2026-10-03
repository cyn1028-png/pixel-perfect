import { Link } from "react-router";
import { useEffect, useRef, useState } from "react";
import { Plane, BellRing, CalendarX2 } from "lucide-react";
import { usePageMeta } from "@/lib/use-page-meta";
import { Bird, Ground, Leaf, LeafTree, Reeds } from "@/components/decor/Autumn";

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

const featureTone = ["var(--primary)", "var(--mustard)", "var(--hair)"];

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
    <div className="bg-paper min-h-screen text-foreground">
      <header className="sticky top-0 z-20 bg-paper/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <span className="flex items-center gap-2 font-display text-base tracking-tight sm:text-lg">
            <Leaf size={18} tone="ember" className="rotate-[-20deg]" />
            Flight Price Notifier
          </span>
          <Link to="/sign-in" className="btn-scarf px-5 py-2 text-sm font-bold">
            Sign in / 登入
          </Link>
        </div>
        <div className="bg-scarf h-1.5" aria-hidden />
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-x-0 -top-40 h-[32rem] bg-hero-glow" />
          <Leaf
            size={36}
            tone="mustard"
            className="leaf-drift pointer-events-none absolute left-[14%] top-14 hidden sm:block"
          />
          <Leaf
            size={20}
            tone="ember"
            className="pointer-events-none absolute right-[22%] top-24 hidden rotate-45 sm:block"
          />
          <Leaf
            size={130}
            tone="ochre"
            className="leaf-drift pointer-events-none absolute right-[6%] top-16 hidden md:block"
          />
          <LeafTree
            height={280}
            tone="ember"
            className="pointer-events-none absolute bottom-8 left-[2%] z-10 hidden md:block lg:left-[8%]"
          />
          <Bird
            size={120}
            className="pointer-events-none absolute bottom-8 left-[30%] z-10 md:left-[12%] lg:left-[19%]"
          />
          <Reeds
            height={170}
            className="pointer-events-none absolute bottom-8 right-[4%] z-10 lg:right-[10%]"
          />
          <Reeds
            height={110}
            flip
            className="pointer-events-none absolute bottom-8 left-[1%] z-10 md:hidden"
          />
          <div className="relative mx-auto max-w-3xl px-6 pb-56 pt-20 text-center sm:pb-72 sm:pt-28">
            <Reveal>
              <span className="inline-flex items-center rounded-full bg-mustard/30 px-4 py-1 text-sm font-bold text-hair">
                台北出發 · 東京 / 首爾
              </span>
              <h1 className="mt-6 font-display text-5xl leading-[1.05] tracking-tight text-ink sm:text-7xl">
                Flight Price Notifier
              </h1>
              <div className="stitch-rule mx-auto mt-7 w-[126px]" aria-hidden />
              <p className="mt-7 font-display text-xl sm:text-2xl">
                設定航線與目標價，機票降價就通知你
              </p>
              <p className="mt-3 text-base text-muted-foreground">
                Set a route and a target price — we email you when the fare drops.
              </p>
              <div className="mt-10 flex justify-center">
                <Link to="/sign-in" className="btn-scarf px-8 py-3 text-base font-bold">
                  Sign in / 登入
                </Link>
              </div>
            </Reveal>
          </div>
          <Ground className="pointer-events-none absolute inset-x-0 bottom-6 h-3 w-full" />
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-24 pt-8">
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((f, i) => (
              <Reveal key={f.en} delay={i * 120}>
                <article className="paper-card h-full p-7">
                  <span
                    className="inline-flex h-14 w-14 items-center justify-center rounded-full"
                    style={{ backgroundColor: featureTone[i] }}
                  >
                    <f.icon className="h-6 w-6 text-cream" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-xl">{f.title}</h3>
                  <p className="text-sm font-semibold text-primary">{f.en}</p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>
      </main>

      <footer className="relative">
        <div className="bg-scarf h-2" aria-hidden />
        <div className="bg-mustard py-8 text-center text-sm font-semibold text-ink">
          <div className="mx-auto flex max-w-6xl items-center justify-center gap-4 px-6">
            <Bird size={56} className="hidden sm:block" />
            <span>© 2026 Flight Price Notifier</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
