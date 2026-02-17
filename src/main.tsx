import "./index.css";
import "./dayjs";
import "./i18n";

import * as Sentry from "@sentry/react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
});

createRoot(document.getElementById("root")!).render(<App />);
