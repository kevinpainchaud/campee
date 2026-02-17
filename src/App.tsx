import { SpeedInsights } from "@vercel/speed-insights/react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { RouterProvider } from "react-router";

import { AppProviders } from "./providers/AppProviders";
import { router } from "./router";
import { getTitleTagContent } from "./utils/titleTag";

function App() {
  const { t } = useTranslation();

  return (
    <AppProviders>
      <Helmet>
        <title>{getTitleTagContent()}</title>
        <meta content={t("common.app_baseline")} name="description" />
      </Helmet>
      <SpeedInsights />
      <RouterProvider router={router} />
    </AppProviders>
  );
}

export default App;
