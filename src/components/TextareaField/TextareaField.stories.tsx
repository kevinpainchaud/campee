import type { Meta, StoryObj } from "@storybook/react-vite";
import { Form } from "react-final-form";
import { action } from "storybook/actions";

import { TextareaField } from "../TextareaField/TextareaField";

const meta = {
  args: {
    label: "Elit exercitation",
    name: "foo",
  },
  component: TextareaField,
  render: (args) => (
    <Form
      initialValues={{
        foo: "Ullamco in commodo id sit aliquip dolore laborum consectetur esse.",
      }}
      onSubmit={(values) => action("onSubmit")(values)}
      render={({ handleSubmit }) => (
        <form className="max-w-96" onSubmit={handleSubmit}>
          <TextareaField {...args} />
          <button className="hidden" type="submit"></button>
        </form>
      )}
    />
  ),
} satisfies Meta<typeof TextareaField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const HelperText: Story = {
  args: {
    helperText: "Magna ullamco Lorem veniam",
  },
};
