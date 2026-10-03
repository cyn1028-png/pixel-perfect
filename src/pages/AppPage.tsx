import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuthUser } from "@/components/layout/RequireAuth";
import { usePageMeta } from "@/lib/use-page-meta";

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
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/60">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <span className="text-sm font-semibold tracking-tight">Flight Price Notifier</span>
          <button
            type="button"
            onClick={handleSignOut}
            className="rounded-full border border-border px-4 py-1.5 text-sm transition-colors hover:border-primary hover:text-primary"
          >
            Sign out / 登出
          </button>
        </div>
      </header>

      <main className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 -top-40 h-96 bg-hero-glow" />
        <div className="relative mx-auto max-w-5xl px-6 py-20">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Hi {user.email}</h1>
          <div className="mt-8 rounded-2xl border border-border bg-card p-8">
            <p className="text-base">你的航線追蹤儀表板即將上線 — 下一個里程碑會加上訂閱航線的功能。</p>
            <p className="mt-3 text-sm text-muted-foreground">
              Your dashboard is coming soon. Route-subscription will be added in the next milestone.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
