import { Turnstile } from "@marsidev/react-turnstile";
import { useContext } from "react";
import { useField } from "react-final-form";

import { UserPreferencesContext } from "../../context/UserPreferencesContext";

export const CaptchaField = () => {
  const { darkThemeEnabled } = useContext(UserPreferencesContext);

  const { input } = useField("captchaToken");

  return (
    <Turnstile
      onSuccess={input.onChange}
      options={{
        theme: darkThemeEnabled ? "dark" : "light",
      }}
      siteKey={import.meta.env.VITE_TURNSTILE_SITEKEY}
    />
  );
};
