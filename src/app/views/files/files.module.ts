import {NgModule} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FilesComponent} from './files.component';
import {FilesRoutingModule} from './files-routing.module';
import {CurrencyPipe, DatePipe, NgForOf, NgIf, NgStyle} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbNav, NgbNavContent, NgbNavItem, NgbNavLink, NgbPopover} from '@ng-bootstrap/ng-bootstrap';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {NgxPaginationModule} from 'ngx-pagination';
import {SharedPipesModule} from '../../shared/pipes/shared-pipes.module';

@NgModule({
    imports: [
        RouterOutlet,
        FilesRoutingModule,
        CurrencyPipe,
        DatePipe,
        FormsModule,
        NgForOf,
        NgIf,
        NgbNav,
        NgbNavContent,
        NgbNavItem,
        NgbNavLink,
        NgbPopover,
        NgxDatatableModule,
        NgxPaginationModule,
        ReactiveFormsModule,
        SharedPipesModule,
        NgStyle
    ],
    declarations: [
        FilesComponent
  ]
})
export class FilesModule {
}
