import {NgModule} from '@angular/core';
import { AccountComponent } from './account.component';
import {RouterOutlet} from '@angular/router';
import { AccountListComponent } from './account-list/account-list.component';
import { AgentListComponent } from './agent-list/agent-list.component';
import { RolesComponent } from './roles/roles.component';
import {AccountRoutingModule} from './account-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CurrencyPipe, DatePipe, NgForOf, NgIf} from '@angular/common';
import {NgbPopover} from '@ng-bootstrap/ng-bootstrap';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';

@NgModule({
    imports: [
        RouterOutlet,
        AccountRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        CurrencyPipe,
        DatePipe,
        NgForOf,
        NgIf,
        NgbPopover,
        NgxDatatableModule
    ],
    declarations: [
    AccountComponent,
    AccountListComponent,
    AgentListComponent,
    RolesComponent
  ]
})
export class AccountModule {
}
