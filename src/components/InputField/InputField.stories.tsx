import type { Meta, StoryObj } from "@storybook/react-vite";
import { Form } from "react-final-form";
import { action } from "storybook/actions";

import { InputField } from "../InputField/InputField";

const meta = {
  args: {
    label: "Est enim minim",
    name: "foo",
  },
  component: InputField,
  render: (args) => (
    <Form
      initialValues={{ foo: "Id ullamco aliquip" }}
      onSubmit={(values) => action("onSubmit")(values)}
      render={({ handleSubmit }) => (
        <form className="max-w-96" onSubmit={handleSubmit}>
          <InputField {...args} />
          <button className="hidden" type="submit"></button>
        </form>
      )}
    />
  ),
} satisfies Meta<typeof InputField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const HelperText: Story = {
  args: {
    helperText: "Ex veniam pariatur id officia",
  },
};
