import "../src/index.css";
import "../src/dayjs";
import "../src/i18n";

import { withThemeByClassName } from "@storybook/addon-themes";
import type { Preview } from "@storybook/react-vite";
import { Suspense, useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import { MemoryRouter } from "react-router";

import i18n from "../src/i18n";
import { AppProviders } from "../src/providers/AppProviders";

const preview: Preview = {
  decorators: [
    withThemeByClassName({
      defaultTheme: window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light",
      themes: {
        dark: "dark",
        light: "",
      },
    }),
    (Story, context) => {
      const { locale } = context.globals;

      useEffect(() => {
        i18n.changeLanguage(locale);
      }, [locale]);

      return (
        <Suspense fallback={<div>Loading translations...</div>}>
          <I18nextProvider i18n={i18n}>
            <Story />
          </I18nextProvider>
        </Suspense>
      );
    },
    (Story) => (
      <AppProviders>
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </AppProviders>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export const globalTypes = {
  locale: {
    description: "Internationalization locale",
    name: "Locale",
    toolbar: {
      icon: "globe",
      items: [
        { title: "English", value: "en" },
        { title: "French", value: "fr" },
        { title: "Spanish", value: "es" },
      ],
    },
  },
};

export default preview;
