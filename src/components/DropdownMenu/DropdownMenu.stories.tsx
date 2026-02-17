import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  PiAcornBold,
  PiCampfireBold,
  PiCheckCircleBold,
  PiEraserBold,
} from "react-icons/pi";

import { DropdownMenu } from "../DropdownMenu/DropdownMenu";

const meta = {
  args: {
    dropdownMenuItems: [
      {
        icon: PiAcornBold,
        label: "Magna ea esse",
        tagElement: "button",
      },
      { label: "Dolore quis", tagElement: "button" },
      {
        icon: PiCampfireBold,
        label: "Exercitation",
        tagElement: "anchor",
        to: "#",
      },
      {
        danger: true,
        icon: PiEraserBold,
        label: "Nisi commodo",
        tagElement: "button",
      },
      {
        icon: PiCheckCircleBold,
        label: "Occaecat",
        success: true,
        tagElement: "button",
      },
    ],
  },
  component: DropdownMenu,
  render: (args) => (
    <div className="max-w-96">
      <DropdownMenu {...args} />
    </div>
  ),
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
