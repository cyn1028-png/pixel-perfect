import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuthUser } from "@/components/layout/RequireAuth";
import { usePageMeta } from "@/lib/use-page-meta";
import { Dachshund, LollipopTree, Medallion, Skyline, palettes } from "@/components/decor/Folk";

export function AppPage() {
  const user = useAuthUser();
  usePageMeta({
    title: "Dashboard — Flight Price Notifier",
    description: "你的航線追蹤儀表板 — Flight Price Notifier.",
    ogDescription: "Your flight price tracking dashboard.",
  });
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate("/sign-in", { replace: true });
  }

  return (
    <div className="bg-polka flex min-h-screen flex-col text-foreground">
      <header className="border-b-2 border-ink bg-cream/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
          <span className="flex items-center gap-2 font-display text-base font-bold tracking-tight">
            <Medallion size={26} palette={palettes.sun} className="folk-spin" />
            Flight Price Notifier
          </span>
          <button
            type="button"
            onClick={handleSignOut}
            className="rounded-full border-2 border-ink bg-cream px-4 py-1.5 text-sm font-bold transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Sign out / 登出
          </button>
        </div>
      </header>

      <main className="relative flex-1 overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 -top-40 h-96 bg-hero-glow" />
        <LollipopTree
          height={240}
          palette={palettes.coral}
          className="pointer-events-none absolute bottom-2 right-[3%] z-10 hidden lg:block"
        />
        <div className="relative mx-auto max-w-5xl px-6 pb-60 pt-16">
          <h1 className="break-words font-display text-3xl font-bold italic tracking-tight sm:text-4xl">
            Hi {user.email}
          </h1>
          <div className="dotted-rule mt-4 w-32" aria-hidden />
          <div className="folk-card relative mt-8 max-w-3xl rounded-3xl p-8">
            <Dachshund size={80} className="absolute -top-10 right-6" />
            <p className="text-base font-semibold">
              你的航線追蹤儀表板即將上線 — 下一個里程碑會加上訂閱航線的功能。
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Your dashboard is coming soon. Route-subscription will be added in the next milestone.
            </p>
          </div>
        </div>
        <Skyline className="pointer-events-none absolute inset-x-0 bottom-0 h-48 w-full" />
        <div className="absolute inset-x-0 bottom-0 h-2 bg-ink" aria-hidden />
      </main>
    </div>
  );
}
