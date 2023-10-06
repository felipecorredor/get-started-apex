import { RouteInfo } from "./vertical-menu.metadata";

//Sidebar menu Routes and data
export const ROUTES: RouteInfo[] = [
  {
    path: "/page",
    title: "Page",
    icon: "ft-home",
    class: "has-sub",
    badge: "",
    badgeClass: "",
    isExternalLink: false,
    submenu: [
      {
        path: "/pages/gallery",
        title: "Gallery",
        icon: "ft-arrow-right submenu-icon",
        class: "",
        badge: "",
        badgeClass: "",
        isExternalLink: false,
        submenu: [],
      },
      {
        path: "/pages/carousel",
        title: "Carrousel",
        icon: "ft-arrow-right submenu-icon",
        class: "",
        badge: "",
        badgeClass: "",
        isExternalLink: false,
        submenu: [],
      },
      {
        path: "/pages/datatable",
        title: "Datatable",
        icon: "ft-arrow-right submenu-icon",
        class: "",
        badge: "",
        badgeClass: "",
        isExternalLink: false,
        submenu: [],
      },
      {
        path: "/pages/dragndrop",
        title: "Drag and Drop",
        icon: "ft-arrow-right submenu-icon",
        class: "",
        badge: "",
        badgeClass: "",
        isExternalLink: false,
        submenu: [],
      },
    ],
  },
];
