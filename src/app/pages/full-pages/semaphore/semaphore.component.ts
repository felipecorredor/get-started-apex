import { Component, OnInit, ViewEncapsulation, ViewChild } from "@angular/core";

import { Subscription } from "rxjs";
import { DecimalPipe } from "@angular/common";
import {
  ColumnMode,
  DatatableComponent,
  SelectionType,
} from "@swimlane/ngx-datatable";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { SemaphoreApiService } from "./semaphore_api.service";

@Component({
  selector: "app-pets",
  templateUrl: "./semaphore.component.html",
  // styleUrls: ["/src/assets/sass/libs/datatables.scss"],
  providers: [DecimalPipe],
})
export class SemaphoreComponent implements OnInit {
  // public
  public contentHeader: object;

  public DatatableData: any[] = [];

  // row data
  public rows = this.DatatableData;

  // subscriptions
  private subscriptions: Subscription[] = [];

  // column header
  public columns = [
    { name: "SK", prop: "SK" },
    { name: "Connection Id", prop: "connectionId" },
    { name: "RFID", prop: "name" },
    { name: "Date Time", prop: "datetime" },
  ];

  // multi Purpose datatable Row data
  public multiPurposeRows = this.DatatableData;

  public ColumnMode = ColumnMode;

  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild("tableRowDetails") tableRowDetails: any;
  @ViewChild("tableResponsive") tableResponsive: any;

  public expanded: any = {};

  public editing = {};

  public chkBoxSelected = [];
  public SelectionType = SelectionType;

  // server side row data
  public serverSideRowData;

  // private
  private tempData = [];
  private multiPurposeTemp = [];

  /**
   * inlineEditingUpdate
   *
   * @param event
   * @param cell
   * @param rowIndex
   */
  inlineEditingUpdate(event, cell, rowIndex) {
    this.editing[rowIndex + "-" + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
  }

  /**
   * filterUpdate
   *
   * @param code
   */
  filterUpdate(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.tempData.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  /**
   * rowDetailsToggleExpand
   *
   * @param row
   */
  rowDetailsToggleExpand(row) {
    this.tableRowDetails.rowDetail.toggleExpandRow(row);
  }

  /**
   * toggleExpandRowResponsive
   *
   * @param row
   */
  toggleExpandRowResponsive(row) {
    this.tableResponsive.rowDetail.toggleExpandRow(row);
  }

  /**
   * customChkboxOnSelect
   *
   * @param { selected }
   */
  customChkboxOnSelect({ selected }) {
    this.chkBoxSelected.splice(0, this.chkBoxSelected.length);
    this.chkBoxSelected.push(...selected);
  }
  /**
   * serverSideSetPage
   *
   * @param event
   */
  serverSideSetPage(event) {
    this.http
      .get("assets/data/datatable-data.json")
      .pipe(map((data) => data as Array<any>))
      .subscribe((data) => {
        this.serverSideRowData = data;
      });
  }

  /**
   * MultiPurposeFilterUpdate
   *
   * @param event
   */
  MultiPurposeFilterUpdate(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.multiPurposeTemp.filter(function (d) {
      return d.full_name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.multiPurposeRows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  /**
   * Constructor
   *
   * @param {HttpClient} http
   */
  constructor(
    private http: HttpClient,
    private semaphoreApiService: SemaphoreApiService
  ) {
    this.tempData = this.DatatableData;
    this.multiPurposeTemp = this.DatatableData;
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit() {
    // Initially load first page
    this.serverSideSetPage({ offset: 0 });

    const subscription = this.semaphoreApiService.getRFIDList().subscribe({
      next: (response) => {
        console.log("response::", response);
        this.rows = response.data;
      },
      error: (error) => {
        console.error("Error:", error);
      },
    });

    this.subscriptions.push(subscription);

    // content header
    this.contentHeader = {
      headerTitle: "Datatables",
      actionButton: true,
      breadcrumb: {
        type: "",
        links: [
          {
            name: "Home",
            isLink: true,
            link: "#",
          },
          {
            name: "Forms & Tables",
            isLink: true,
            link: "",
          },
          {
            name: "Datatables",
            isLink: false,
          },
        ],
      },
    };
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
