import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboadDefaultComponent } from './dashboad-default/dashboad-default.component';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';
import { DashboardV2Component } from './dashboard-v2/dashboard-v2.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardV3Component } from './dashboard-v3/dashboard-v3.component';
import { DashboardV4Component } from './dashboard-v4/dashboard-v4.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedComponentsModule} from '../../shared/components/shared-components.module';

@NgModule({
    imports: [
        CommonModule,
        NgxEchartsModule.forRoot({
            echarts
        }),
        NgxDatatableModule,
        NgbModule,
        DashboardRoutingModule,
        ReactiveFormsModule,
        SharedComponentsModule
    ],
  declarations: [DashboadDefaultComponent, DashboardV2Component, DashboardV3Component, DashboardV4Component]
})
export class DashboardModule { }
