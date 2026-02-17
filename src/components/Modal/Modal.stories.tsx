import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { Button } from "../Button/Button";
import { Modal } from "../Modal/Modal";

const meta = {
  args: {
    children: (
      <p>
        Ut cupidatat quis sunt nostrud. Culpa amet incididunt do nisi sint ipsum
        incididunt cupidatat aliquip est est culpa consectetur amet. Proident
        laboris laboris elit sunt cillum minim minim et officia commodo laborum
        id sunt in.
      </p>
    ),
    open: false,
    setOpen: () => {},
    title: "Dolor officia sint amet sunt",
  },
  component: Modal,
  decorators: [
    (Story, options) => {
      const [open, setOpen] = useState(false);

      return (
        <div className="flex flex-col gap-4">
          <div>
            <Button onClick={() => setOpen(true)} tagElement="button">
              Open modal
            </Button>
          </div>
          <Story args={{ ...options.args, open, setOpen }} />
        </div>
      );
    },
  ],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Footer: Story = {
  args: {
    footer: <p>Ullamco excepteur reprehenderit aliqua reprehenderit Lorem.</p>,
  },
};
