import type { Meta, StoryObj } from "@storybook/react-vite";
import { Form } from "react-final-form";
import { action } from "storybook/actions";

import { SelectField } from "../SelectField/SelectField";

const meta = {
  args: {
    label: "Qui elit duis",
    name: "foo",
    options: [
      {
        label: "Laboris aliquip",
        value: "laboris-aliquip",
      },
      {
        label: "Mollit eu ullamco",
        value: "mollit-eu-ullamco",
      },
      {
        label: "Aute laboris",
        value: "aute-laboris",
      },
    ],
  },
  component: SelectField,
  render: (args) => (
    <Form
      initialValues={{ foo: "Id ullamco aliquip" }}
      onSubmit={(values) => action("onSubmit")(values)}
      render={({ handleSubmit }) => (
        <form className="max-w-96" onSubmit={handleSubmit}>
          <SelectField {...args} />
          <button className="hidden" type="submit"></button>
        </form>
      )}
    />
  ),
} satisfies Meta<typeof SelectField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const HelperText: Story = {
  args: {
    helperText: "Fugiat cillum aute consequat aliquip",
  },
};
