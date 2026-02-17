import { useContext } from "react";

import { DrawerContext } from "../context/DrawerContext";

export const useDrawer = () => useContext(DrawerContext);
