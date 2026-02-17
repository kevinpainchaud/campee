export type DropdownProps = {
  renderContent: (props: { close: () => void }) => React.ReactNode;
  renderTrigger: (props: { active: boolean }) => React.ReactNode;
};
