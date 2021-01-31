import { Component, OnInit } from "@angular/core";
import { SearchPipe } from "../filterPipe";

@Component({
  selector: "app-tablestest",
  templateUrl: "./tablestest.component.html",
  styleUrls: ["./tablestest.component.css"]
})
export class TablestestComponent implements OnInit {
  pageSetup = {
    pageNumber: 1, //curent page. NOT CHANGE
    pageSize: 3, //max items per page
    pageCount: 0, //total pages. calc in setupPageSettings()
    totalItems: 0 //itemsList.length
  };

  itemsList = [
    { id: 1, name: "Dannylo", team: "INTZ" },
    { id: 2, name: "Carlos", team: "Pain" },
    { id: 3, name: "Soares", team: "Loud" },
    { id: 4, name: "Barbosa", team: "TSM" },
    { id: 5, name: "Links", team: "SKT" },
    { id: 6, name: "Style", team: "RED" },
    { id: 7, name: "String", team: "G3X" },
    { id: 8, name: "Kass", team: "FNATIC" },
    { id: 9, name: "R4G", team: "Gen.G" },
    { id: 10, name: "Double", team: "G2" },
    { id: 11, name: "Mike", team: "Cloud 9" },
    { id: 12, name: "Thrunder", team: "Furia" }
  ];

  filterItemsList = [];

  //Start and End Indexes
  startI: number = 0;
  endI: number = 0;

  filterString: string = "";

  //remember to add this pipe in app.module provider too
  constructor(private pipe: SearchPipe) {}

  ngOnInit() {
    this.setupPageSettings(this.itemsList);
    this.calcIndex();
  }

  changePage(pageNumber: number) {
    if (pageNumber > this.pageSetup.pageCount || pageNumber < 1) return;

    this.pageSetup.pageNumber = pageNumber;
    this.calcIndex();
  }

  /**
   * return total buttons
   */
  showPage() {
    let lista = [];
    for (
      var i = this.pageSetup.pageNumber - 2;
      i < this.pageSetup.pageNumber + 2 + 1;
      i++
    ) {
      if (i > 0 && i <= this.pageSetup.pageCount) {
        //  if page number are within page range
        lista.push(i);
      }
    }
    return lista;
  }

  /**
   * Calculate pagination indexes
   */
  calcIndex() {
    this.startI = (this.pageSetup.pageNumber - 1) * this.pageSetup.pageSize;
    this.endI = this.pageSetup.pageNumber * this.pageSetup.pageSize;
  }

  ordersFilter(value) {
    this.filterItemsList = this.pipe.transform(
      this.itemsList,
      "id:name:team",
      value
    );

    this.setupPageSettings(this.filterItemsList); //setup filtered items
    this.calcIndex(); //calculate indexes of filtered items
  }

  /**
   * make pageSetup for pagination
   */
  setupPageSettings(listaItems) {
    this.pageSetup.pageNumber = 1;
    this.pageSetup.totalItems = listaItems.length;
    this.pageSetup.pageCount = Math.ceil(
      this.pageSetup.totalItems / this.pageSetup.pageSize
    );
  }
}
