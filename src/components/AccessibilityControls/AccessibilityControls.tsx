import { LanguageSwitcherDropdown } from "../LanguageSwitcherDropdown/LanguageSwitcherDropdown";
import { ThemeSwitcherButton } from "../ThemeSwitcherButton/ThemeSwitcherButton";

export const AccessibilityControls = () => {
  return (
    <nav>
      <ul className="flex items-center">
        <li>
          <ThemeSwitcherButton />
        </li>
        <li>
          <LanguageSwitcherDropdown />
        </li>
      </ul>
    </nav>
  );
};
