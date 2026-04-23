"use client";

import { createContext, useContext, useMemo } from "react";
import { usePathname } from "next/navigation";
import {
  getLpContent,
  getLpContentPaths,
  type LpContentShared,
} from "@/lib/content";

type LpContentContextValue = LpContentShared;

const LpContentContext = createContext<LpContentContextValue | null>(null);

function pathnameToKey(pathname: string): string {
  if (pathname === "/" || pathname === "") return "main";
  const segment = pathname.slice(1).split("/")[0] ?? "";
  return segment || "main";
}

export function LpContentProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const pathKey = useMemo(() => pathnameToKey(pathname ?? "/"), [pathname]);
  const paths = useMemo(() => getLpContentPaths(), []);
  const key = paths.includes(pathKey) ? pathKey : "main";
  const shared = useMemo(() => getLpContent(key).shared, [key]);
  const value = useMemo<LpContentContextValue>(() => shared, [shared]);

  return (
    <LpContentContext.Provider value={value}>
      {children}
    </LpContentContext.Provider>
  );
}

export function useLpShared(): LpContentShared {
  const ctx = useContext(LpContentContext);
  if (!ctx) {
    return getLpContent("main").shared;
  }
  return ctx;
}
