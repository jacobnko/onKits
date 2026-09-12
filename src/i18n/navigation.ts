// 로케일을 인지하는 Link, redirect, useRouter, usePathname 래퍼
import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
