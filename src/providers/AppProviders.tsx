import { QueryClientProvider } from "@tanstack/react-query";
import classNames from "classnames";
import { SnackbarProvider } from "notistack";
import { HelmetProvider } from "react-helmet-async";

import { Snackbar } from "../components/Snackbar/Snackbar";
import { useBreakpoint } from "../hooks/useBreakpoint";
import { queryClient } from "../lib/queryClient";
import { AuthProvider } from "./AuthProvider";
import { ConfirmProvider } from "./ConfirmProvider";
import { DrawerProvider } from "./DrawerProvider";
import { SupabaseProvider } from "./SupabaseProvider";
import { UserPreferencesProvider } from "./UserPreferencesProvider";

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  const { breakpointMinXl } = useBreakpoint();

  return (
    <QueryClientProvider client={queryClient}>
      <SupabaseProvider>
        <HelmetProvider>
          <SnackbarProvider
            Components={{
              default: Snackbar,
              error: Snackbar,
              info: Snackbar,
              success: Snackbar,
              warning: Snackbar,
            }}
            anchorOrigin={
              breakpointMinXl
                ? {
                    horizontal: "left",
                    vertical: "bottom",
                  }
                : {
                    horizontal: "center",
                    vertical: "top",
                  }
            }
            classes={{ containerRoot: classNames("z-50!") }}
            domRoot={document.body}
          >
            <AuthProvider>
              <UserPreferencesProvider>
                <ConfirmProvider>
                  <DrawerProvider>{children}</DrawerProvider>
                </ConfirmProvider>
              </UserPreferencesProvider>
            </AuthProvider>
          </SnackbarProvider>
        </HelmetProvider>
      </SupabaseProvider>
    </QueryClientProvider>
  );
};
