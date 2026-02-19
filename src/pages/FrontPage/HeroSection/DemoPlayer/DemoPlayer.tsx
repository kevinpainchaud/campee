import { Demo } from "../../../../components/Demo/Demo";

export const DemoPlayer = () => {
  return (
    <div className="border-pill shadow-pill relative flex flex-col overflow-hidden rounded-3xl transition-discrete">
      <div className="flex h-8 w-full items-center gap-2.5 bg-zinc-950 pl-4 dark:bg-zinc-600">
        {Array.from({ length: 3 }).map((_item, index) => (
          <div className="bg-lemon-50 size-3 rounded-full" key={index}></div>
        ))}
      </div>
      <Demo />
    </div>
  );
};
