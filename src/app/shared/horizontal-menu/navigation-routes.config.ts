import { RouteInfo } from "../vertical-menu/vertical-menu.metadata";

export const HROUTES: RouteInfo[] = [
  {
    path: "/page",
    title: "Page",
    icon: "ft-home",
    class: "dropdown nav-item",
    isExternalLink: false,
    submenu: [
      {
        path: "/pages/gallery",
        title: "Gallery",
        icon: "ft-arrow-right submenu-icon",
        class: "dropdown-item",
        isExternalLink: false,
        submenu: [],
      },
    ],
  },
];
