import { AfterViewChecked, Component, OnInit } from "@angular/core";
import { NgbCarouselConfig } from "@ng-bootstrap/ng-bootstrap";
import { HighlightService } from "app/shared/services/highlight.service";

@Component({
  selector: "app-carousel-page",
  templateUrl: "./carousel-page.component.html",
  styleUrls: ["./carousel-page.component.scss"],
  providers: [NgbCarouselConfig],
})
export class CarouselPageComponent implements AfterViewChecked {
  highlighted: boolean = false;

  constructor(
    config: NgbCarouselConfig,
    private highlightService: HighlightService
  ) {
    // customize default values of carousels used by this component tree
    config.interval = 10000;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;
  }

  ngAfterViewChecked() {
    this.highlightService.highlightAll();
  }
}
