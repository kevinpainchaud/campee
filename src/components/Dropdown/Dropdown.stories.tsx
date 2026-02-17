import type { Meta, StoryObj } from "@storybook/react-vite";
import { PiCaretDownBold, PiCaretUpBold } from "react-icons/pi";

import { Button } from "../Button/Button";
import { Dropdown } from "../Dropdown/Dropdown";

const meta = {
  args: {
    renderContent: () =>
      "Ea nulla adipisicing nostrud irure exercitation excepteur.",
    renderTrigger: ({ active }) => (
      <Button
        rightIcon={active ? PiCaretUpBold : PiCaretDownBold}
        tagElement="button"
        variant="outline"
      >
        Ex commodo
      </Button>
    ),
  },
  component: Dropdown,
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
