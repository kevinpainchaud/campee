import { SupabaseContext } from "../context/SupabaseContext";
import { supabase } from "../lib/supabaseClient";

export const SupabaseProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <SupabaseContext.Provider value={supabase}>
      {children}
    </SupabaseContext.Provider>
  );
};
