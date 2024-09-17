import {Component, EventEmitter, HostListener, Output, ViewChild} from '@angular/core';
import {UntypedFormControl} from '@angular/forms';
import {ProductService} from '../../../../shared/services/product.service';
import {debounceTime} from 'rxjs/operators';
import {Lot} from '../../../../shared/models/lot';
import {LotService} from '../../../../shared/services/lot.service';
@Component({
  selector: 'app-lot-table',
  templateUrl: './lot-table.component.html',
  styleUrls: ['./lot-table.component.scss']
})
export class LotTableComponent {
  searchControl: UntypedFormControl = new UntypedFormControl();
  products;
  filteredProducts;
  @Output() lotClickEvent = new EventEmitter<string>();
  @ViewChild('reservationTable') table: any;
  width:any;


  constructor(
      private lotService: LotService
  ) {

    this.getScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.width = window.innerWidth;
    console.log(this.width);
  }

  ngOnInit() {
    this.lotService.getLotsByStatus('Available')
        .pipe()
        .subscribe((value:any) => {
          console.log("By Status");
          this.products = [...value.data];
          console.log(this.products);
          this.filteredProducts = value.data;
        });

    this.searchControl.valueChanges
        .pipe(debounceTime(200))
        .subscribe(value => {
          this.filerData(value);
        });
  }
  filerData(val) {
    if (val) {
      val = val.toLowerCase();
    } else {
      return this.filteredProducts = [...this.products];
    }

    const columns = Object.keys(this.products[0]);
    if (!columns.length) {
      return;
    }

    const rows = this.products.filter(function(d) {
      for (let i = 0; i <= columns.length; i++) {
        const column = columns[i];
        // console.log(d[column]);
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
    });
    this.filteredProducts = rows;
  }

  public showLot(lotId: string) {
    this.lotClickEvent.emit(lotId);
  }

}
