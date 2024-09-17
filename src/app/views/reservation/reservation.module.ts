import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReservationLotComponent} from './lot/reservation-lot.component';
import {MapComponent} from './lot/map/map.component';
import {LotTableComponent} from './lot/lot-table/lot-table.component';
import {ReservationRoutingModule} from './reservation-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {NgbCarousel, NgbNav, NgbNavContent, NgbNavItem, NgbNavLink, NgbNavOutlet, NgbPopover, NgbSlide} from '@ng-bootstrap/ng-bootstrap';
import { ReservationComponent } from './reservation.component';
import { ReservationTableComponent } from './reservation-table/reservation-table.component';
import {SharedPipesModule} from '../../shared/pipes/shared-pipes.module';
import {NgxPaginationModule} from 'ngx-pagination';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {SharedComponentsModule} from '../../shared/components/shared-components.module';

@NgModule({
    imports: [
        CommonModule,
        ReservationRoutingModule,
        FormsModule,
        NgxDatatableModule,
        ReactiveFormsModule,
        NgbCarousel,
        NgbSlide,
        NgbNav,
        NgbNavContent,
        NgbNavItem,
        NgbNavLink,
        NgbNavOutlet,
        SharedPipesModule,
        NgxPaginationModule,
        FontAwesomeModule,
        NgbPopover,
        SharedComponentsModule
    ],
    declarations: [ReservationLotComponent, MapComponent, LotTableComponent, ReservationComponent, ReservationTableComponent]
})
export class ReservationModule {
}
