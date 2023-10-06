import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DragulaModule, DragulaService } from "ng2-dragula";

import { FullPagesRoutingModule } from "./full-pages-routing.module";
import { GalleryPageComponent } from "./gallery/gallery-page/gallery-page.component";
import { CarouselPageComponent } from "./carousel/carousel-page/carousel-page.component";
import { DragDropPageComponent } from "./drag-drop/drag-drop-page/drag-drop-page.component";
import { DatatablePageComponent } from "./datatable/datatable-page/datatable-page.component";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { PipeModule } from "app/shared/pipes/pipe.module";

@NgModule({
  declarations: [
    GalleryPageComponent,
    CarouselPageComponent,
    DragDropPageComponent,
    DatatablePageComponent,
  ],
  imports: [
    CommonModule,
    FullPagesRoutingModule,
    DragulaModule.forRoot(),
    NgbModule,
    NgxDatatableModule,
    PipeModule,
  ],
  providers: [DragulaService],
})
export class FullPagesModule {}
