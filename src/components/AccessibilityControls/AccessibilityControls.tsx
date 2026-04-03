import { LanguageSwitcherDropdown } from "../LanguageSwitcherDropdown/LanguageSwitcherDropdown";
import { ThemeSwitcherButton } from "../ThemeSwitcherButton/ThemeSwitcherButton";

export const AccessibilityControls = () => {
  return (
    <nav>
      <ul className="flex items-center">
        <li>
          <ThemeSwitcherButton
            tooltipOptions={{ gap: 0, placement: "top-start" }}
          />
        </li>
        <li>
          <LanguageSwitcherDropdown />
        </li>
      </ul>
    </nav>
  );
};
