import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GalleryPageComponent } from "./gallery/gallery-page/gallery-page.component";
import { CarouselPageComponent } from "./carousel/carousel-page/carousel-page.component";
import { DragDropPageComponent } from "./drag-drop/drag-drop-page/drag-drop-page.component";
import { DatatablePageComponent } from "./datatable/datatable-page/datatable-page.component";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "gallery",
        component: GalleryPageComponent,
        data: {
          title: "Gallery Page",
        },
      },
      {
        path: "carousel",
        component: CarouselPageComponent,
        data: {
          title: "Carousel Page",
        },
      },
      {
        path: "dragndrop",
        component: DragDropPageComponent,
        data: {
          title: "Drag and Drop",
        },
      },
      {
        path: "datatable",
        component: DatatablePageComponent,
        data: {
          title: "Datatable",
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FullPagesRoutingModule {}
