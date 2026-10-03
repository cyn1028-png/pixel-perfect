import { useEffect, useState } from "react";
import { Navigate, Outlet, useOutletContext } from "react-router";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

type AuthState = { status: "loading" } | { status: "anon" } | { status: "authed"; user: User };

export type AuthContext = { user: User };

/** Client-side guard for authenticated routes (replaces the old `_authenticated` beforeLoad). */
export function RequireAuth() {
  const [state, setState] = useState<AuthState>({ status: "loading" });

  useEffect(() => {
    let active = true;
    supabase.auth.getUser().then(({ data, error }) => {
      if (!active) return;
      if (error || !data.user) setState({ status: "anon" });
      else setState({ status: "authed", user: data.user });
    });
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT" && active) setState({ status: "anon" });
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  if (state.status === "loading") return null;
  if (state.status === "anon") return <Navigate to="/sign-in" replace />;
  return <Outlet context={{ user: state.user } satisfies AuthContext} />;
}

export function useAuthUser() {
  return useOutletContext<AuthContext>().user;
}
