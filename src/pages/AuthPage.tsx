import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { usePageMeta } from "@/lib/use-page-meta";
import { Bird, Leaf, LeafScatter } from "@/components/decor/Autumn";

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
    <div className="bg-paper relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-12 text-foreground">
      <div className="pointer-events-none absolute inset-x-0 -top-40 h-[32rem] bg-hero-glow" />
      <LeafScatter />
      <div className="paper-card relative w-full max-w-sm p-8">
        <Leaf size={56} tone="ochre" className="leaf-drift absolute -right-5 -top-10" />
        <Bird size={84} className="absolute -bottom-4 -left-6" />
        <Link to="/" className="text-xs font-semibold text-muted-foreground hover:text-primary">
          ← Flight Price Notifier
        </Link>
        <h1 className="mt-4 font-display text-3xl tracking-tight">
          {mode === "signin" ? "登入 Sign in" : "註冊 Sign up"}
        </h1>

        <div className="stitch-rule mt-4 w-[90px]" aria-hidden />

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="text-sm font-bold text-foreground">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-2xl border-2 border-hair/25 bg-paper/60 px-3 py-2 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/25"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-bold text-foreground">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-2xl border-2 border-hair/25 bg-paper/60 px-3 py-2 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/25"
            />
          </div>

          {error && (
            <p className="rounded-2xl border-2 border-destructive/40 bg-destructive/10 px-3 py-2 text-sm font-semibold text-destructive">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-scarf w-full px-4 py-2.5 text-sm font-bold disabled:opacity-60"
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
          className="mt-5 w-full pl-10 text-center text-sm font-semibold text-muted-foreground underline decoration-mustard decoration-2 underline-offset-4 hover:text-primary"
        >
          {mode === "signin" ? "還沒有帳號？註冊 Sign up" : "已有帳號？登入 Sign in"}
        </button>
      </div>
    </div>
  );
}
