import type { Meta, StoryObj } from "@storybook/react-vite";

import { ShowcaseItem } from "../ShowcaseItem/ShowcaseItem";

const meta = {
  args: {
    children: (
      <p>
        Fugiat ut cillum in nostrud et ea in eu ipsum sint. Reprehenderit do
        ullamco ad velit consequat Lorem commodo ex. Cillum consectetur ea ad
        pariatur exercitation incididunt aliqua in. Ullamco exercitation anim
        adipisicing aliquip minim amet aliqua eiusmod consequat id sunt est
        aliqua. Ut aliquip veniam adipisicing reprehenderit irure nostrud culpa
        eiusmod incididunt quis adipisicing minim officia. Consequat et ex sit
        proident cupidatat incididunt do veniam dolor officia tempor esse
        exercitation.
      </p>
    ),
    illustration: <img src="https://picsum.photos/id/237/1000/1000" />,
    tagContent: "Laboris commodo",
    title: "Cupidatat nisi ea velit",
  },
  component: ShowcaseItem,
  render: (args) => (
    <div className="max-w-7xl">
      <ShowcaseItem {...args} />
    </div>
  ),
} satisfies Meta<typeof ShowcaseItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LeftIllustrationLayout: Story = {
  args: {
    layout: "illustrationLeft",
  },
};
