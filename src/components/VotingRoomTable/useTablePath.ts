import { useCallback, useEffect, useRef, useState } from "react";

export const useTablePath = () => {
  const tableRef = useRef<HTMLDivElement>(null);

  const [tablePath, setTablePath] = useState<string>();

  const handleTablePathUpdate = useCallback(() => {
    if (!tableRef.current) {
      return;
    }

    const width = tableRef.current.offsetWidth;
    const height = tableRef.current.offsetHeight;
    const startX = 0;
    const startY = height;
    const endX = width;
    const endY = height;
    const cp1X = width * 0.25;
    const cp1Y = 0;
    const cp2X = width * 0.75;
    const cp2Y = 0;

    setTablePath(
      `M${startX},${startY} C${cp1X},${cp1Y} ${cp2X},${cp2Y} ${endX},${endY}`,
    );
  }, []);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(handleTablePathUpdate);

    if (tableRef.current) {
      resizeObserver.observe(tableRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [handleTablePathUpdate]);

  return {
    tablePath,
    tableRef,
  };
};
