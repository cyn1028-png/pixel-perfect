import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuthUser } from "@/components/layout/RequireAuth";
import { usePageMeta } from "@/lib/use-page-meta";
import { Bird, Ground, Leaf, LeafTree, Reeds } from "@/components/decor/Autumn";

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
    <div className="bg-paper flex min-h-screen flex-col text-foreground">
      <header className="bg-paper/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
          <span className="flex items-center gap-2 font-display text-base tracking-tight">
            <Leaf size={16} tone="ember" className="rotate-[-20deg]" />
            Flight Price Notifier
          </span>
          <button
            type="button"
            onClick={handleSignOut}
            className="rounded-full border-2 border-hair/30 bg-cream px-4 py-1.5 text-sm font-bold transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
          >
            Sign out / 登出
          </button>
        </div>
        <div className="bg-scarf h-1.5" aria-hidden />
      </header>

      <main className="relative flex-1 overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 -top-40 h-96 bg-hero-glow" />
        <LeafTree
          height={230}
          tone="ember"
          className="pointer-events-none absolute bottom-6 right-[4%] z-10 hidden lg:block"
        />
        <Reeds height={150} className="pointer-events-none absolute bottom-6 left-[3%] z-10" />
        <div className="relative mx-auto max-w-5xl px-6 pb-56 pt-16">
          <h1 className="break-words font-display text-3xl tracking-tight sm:text-4xl">
            Hi {user.email}
          </h1>
          <div className="stitch-rule mt-5 w-[108px]" aria-hidden />
          <div className="paper-card relative mt-10 max-w-3xl p-8">
            <Bird size={80} className="absolute -top-12 right-6" />
            <p className="text-base font-semibold">
              你的航線追蹤儀表板即將上線 — 下一個里程碑會加上訂閱航線的功能。
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Your dashboard is coming soon. Route-subscription will be added in the next milestone.
            </p>
          </div>
        </div>
        <Ground className="pointer-events-none absolute inset-x-0 bottom-4 h-3 w-full" />
      </main>
    </div>
  );
}
