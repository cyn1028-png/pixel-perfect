import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { usePageMeta } from "@/lib/use-page-meta";

export function AuthPage({ mode }: { mode: "signin" | "signup" }) {
  const navigate = useNavigate();
  usePageMeta({
    title:
      mode === "signin" ? "Sign in — Flight Price Notifier" : "Sign up — Flight Price Notifier",
    description: "登入或註冊 Flight Price Notifier，開始追蹤機票價格。",
    ogDescription: "Sign in to track flight prices from Taipei.",
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate("/app", { replace: true });
    });
  }, [navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const fn =
      mode === "signin"
        ? supabase.auth.signInWithPassword({ email, password })
        : supabase.auth.signUp({
            email,
            password,
            options: { emailRedirectTo: window.location.origin },
          });
    const { data, error } = await fn;
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    if (data.session) navigate("/app", { replace: true });
    else setError("請收信完成驗證後再登入。Check your email to confirm your account.");
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 text-foreground">
      <div className="pointer-events-none absolute inset-x-0 -top-40 h-[32rem] bg-hero-glow" />
      <div className="relative w-full max-w-sm rounded-2xl border border-border bg-card p-8">
        <Link to="/" className="text-xs text-muted-foreground hover:text-foreground">
          ← Flight Price Notifier
        </Link>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight">
          {mode === "signin" ? "登入 Sign in" : "註冊 Sign up"}
        </h1>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="text-sm text-muted-foreground">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm text-muted-foreground">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-glow transition-colors hover:bg-primary/90 disabled:opacity-60"
          >
            {loading ? "..." : mode === "signin" ? "Sign in / 登入" : "Sign up / 註冊"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => {
            navigate(mode === "signin" ? "/sign-up" : "/sign-in");
            setError(null);
          }}
          className="mt-5 w-full text-center text-sm text-muted-foreground hover:text-foreground"
        >
          {mode === "signin" ? "還沒有帳號？註冊 Sign up" : "已有帳號？登入 Sign in"}
        </button>
      </div>
    </div>
  );
}
