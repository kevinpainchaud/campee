import { SpeedInsights } from "@vercel/speed-insights/react";
import { ErrorBoundary } from "react-error-boundary";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { createBrowserRouter, Outlet, ScrollRestoration } from "react-router";

import { GlobalDrawers } from "./components/GlobalDrawers/GlobalDrawers";
import { GlobalQueryErrorListener } from "./components/GlobalQueryErrorListener/GlobalQueryErrorListener";
import {
  LEGAL_NOTICES_ROUTE_PATH,
  VOTING_ROOM_ROUTE_PATH,
} from "./constants/routes";
import { FullscreenLayout } from "./layouts/FullscreenLayout/FullscreenLayout";
import { MainLayout } from "./layouts/MainLayout/MainLayout";
import { ErrorPage } from "./pages/ErrorPage/ErrorPage";
import { FrontPage } from "./pages/FrontPage/FrontPage";
import { LegalNoticePage } from "./pages/LegalNoticePage/LegalNoticePage";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import { VotingRoomPage } from "./pages/VotingRoomPage";
import { AppProviders } from "./providers/AppProviders";
import { getTitleTagContent } from "./utils/titleTag";

export const router = createBrowserRouter([
  {
    children: [
      {
        children: [
          {
            element: <FrontPage />,
            index: true,
          },
          {
            element: <LegalNoticePage />,
            path: LEGAL_NOTICES_ROUTE_PATH,
          },
        ],
        element: <MainLayout />,
      },
      {
        children: [
          {
            element: <VotingRoomPage />,
            path: VOTING_ROOM_ROUTE_PATH,
          },
        ],
        element: <FullscreenLayout />,
      },
      {
        element: <NotFoundPage />,
        path: "*",
      },
    ],
    Component: () => {
      const { t } = useTranslation();

      return (
        <AppProviders>
          <Helmet>
            <title>{getTitleTagContent()}</title>
            <meta content={t("common.app_baseline")} name="description" />
          </Helmet>
          <SpeedInsights />
          <ScrollRestoration />
          <ErrorBoundary FallbackComponent={ErrorPage}>
            <GlobalQueryErrorListener />
            <GlobalDrawers />
            <Outlet />
          </ErrorBoundary>
        </AppProviders>
      );
    },
  },
]);
