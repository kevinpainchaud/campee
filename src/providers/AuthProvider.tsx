import type { User } from "@supabase/supabase-js";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { AuthContext } from "../context/AuthContext";
import { useTracking } from "../hooks/useTracking";
import { supabase } from "../lib/supabaseClient";
import type { BackfaceCardStyleKey } from "../types/backfaceCardStyleKey";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslation();
  const { identify, track } = useTracking();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setUser(newSession?.user ?? null);
      },
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser(session.user);
        identify(session.user.id);
      } else {
        setUser(null);
      }
    });

    supabase.auth.getUser().then(({ data: { user }, error }) => {
      if (error || !user) {
        supabase.auth.signOut();
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [identify]);

  const signUp = useCallback(
    async ({
      backfaceCardStyleKey,
      companyName,
      displayName,
      options,
    }: {
      backfaceCardStyleKey: BackfaceCardStyleKey;
      companyName: string | null;
      displayName: string;
      options: { captchaToken: string };
    }) => {
      const {
        data: { user },
        error,
      } = await supabase.auth.signInAnonymously({
        options: {
          captchaToken: options.captchaToken,
          data: {
            backface_card_style_key: backfaceCardStyleKey,
            company_name: companyName,
            display_name: displayName,
          },
        },
      });

      if (error) {
        throw new Error(t("providers.auth.sign_in_error_message"));
      }

      if (!user) {
        throw new Error(t("providers.auth.user_not_found_error_message"));
      }

      track("sign_up");

      return user;
    },
    [t, track],
  );

  return (
    <AuthContext.Provider value={{ signUp, user }}>
      {children}
    </AuthContext.Provider>
  );
};
