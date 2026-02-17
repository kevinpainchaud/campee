import { Outlet } from "react-router";

export const FullscreenLayout = () => {
  return (
    <div className="h-dvh">
      <Outlet />
    </div>
  );
};
