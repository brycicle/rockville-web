import {Component} from '@angular/core';
import {UntypedFormControl} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AccountService} from '../../../shared/services/account.service';
import {debounceTime} from 'rxjs/operators';

@Component({
    selector: 'app-agent-list',
    templateUrl: './agent-list.component.html',
    styleUrls: ['./agent-list.component.scss']
})
export class AgentListComponent {
    page = 1;
    pageSize = 3;
    searchControl: UntypedFormControl = new UntypedFormControl();
    accounts;
    filteredAccounts;

    constructor(
        private modalService: NgbModal, private accountService: AccountService
    ) {
    }

    ngOnInit() {
        this.accountService.getSalesAgents()
            .subscribe((value: any) => {
                this.accounts = [...value.data];
                this.filteredAccounts = value.data;
            });

        this.searchControl.valueChanges
            .pipe(debounceTime(500))
            .subscribe(value => {
                this.filerData(value);
            });
    }

    filerData(val) {
        if (val) {
            val = val.toLowerCase();
        } else {
            return this.filteredAccounts = [...this.accounts];
        }

        const columns = Object.keys(this.accounts[0]);
        if (!columns.length) {
            return;
        }

        const rows = this.accounts.filter(function (d) {
            for (let i = 0; i <= columns.length; i++) {
                const column = columns[i];
                let hasInnerMatch = false;
                if (d[column] instanceof Object) {
                    let reservation = [];
                    reservation.push(d[column]);
                    const innerColumns = Object.keys(d[column]);
                    if (!innerColumns.length) {
                        return;
                    }
                    const innerRows = reservation.filter(function (t) {
                        for (let c = 0; c <= innerColumns.length; c++) {
                            const innerColumn = innerColumns[c];
                            if (t[innerColumn] && t[innerColumn].toString().toLowerCase().indexOf(val) > -1) {
                                hasInnerMatch = true;
                                return true;
                            }
                        }
                    });
                }
                if (hasInnerMatch) {
                    return true;
                }
                if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
                    return true;
                }
            }
        });
        this.filteredAccounts = rows;
    }



}
