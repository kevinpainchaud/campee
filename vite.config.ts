import { sentryVitePlugin } from "@sentry/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import checker from "vite-plugin-checker";
import { createHtmlPlugin } from "vite-plugin-html";
import mkcert from "vite-plugin-mkcert";
import svgr from "vite-plugin-svgr";

import { APP_GLOBAL_VARIABLES } from "./src/constants/appGlobalVariables";
import { LOCAL_STORAGE_KEY_PREFIX } from "./src/constants/localStorage";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    build: {
      sourcemap: true,
    },
    optimizeDeps: {
      exclude: ["@storybook/global", "storybook"],
    },
    plugins: [
      mkcert(),
      react(),
      tailwindcss(),
      svgr(),
      checker({
        eslint: {
          dev: {
            overrideConfig: {
              cache: false,
            },
          },
          lintCommand: "eslint .",
          useFlatConfig: true,
        },
        typescript: {
          tsconfigPath: "tsconfig.app.json",
        },
      }),
      createHtmlPlugin({
        inject: {
          data: {
            app_author: APP_GLOBAL_VARIABLES.app_author,
            app_baseline: APP_GLOBAL_VARIABLES.app_baseline,
            app_description: APP_GLOBAL_VARIABLES.app_description,
            app_name: APP_GLOBAL_VARIABLES.app_name,
            app_url: APP_GLOBAL_VARIABLES.app_url,
            local_storage_key_prefix: LOCAL_STORAGE_KEY_PREFIX,
          },
        },
      }),
      sentryVitePlugin({
        authToken: env.SENTRY_AUTH_TOKEN,
        org: env.SENTRY_ORG,
        project: "javascript-react",
        sourcemaps: {
          assets: ["dist/assets/*.js"],
        },
      }),
    ],
    server: {
      open: true,
    },
  };
});
