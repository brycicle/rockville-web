import {Component} from '@angular/core';
import {FormGroup, UntypedFormControl} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import {ReservationService} from '../../../shared/services/reservation.service';
import {auto} from '@popperjs/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Utils} from '../../../shared/utils';

@Component({
    selector: 'app-reservation-table',
    templateUrl: './reservation-table.component.html',
    styleUrls: ['./reservation-table.component.scss']
})
export class ReservationTableComponent {
    viewMode: 'list' | 'grid' = 'grid';
    allSelected: boolean;
    page = 1;
    pageSize = 8;
    searchControl: UntypedFormControl = new UntypedFormControl();
    reservations;
    filteredReservations;
    checklist;
    // Lot Filters
    blockLotFilter = true;
    lotType = false;
    lotSize = false;
    lotPrice = false;
    // House Filters
    house = false;
    housePrice = false;
    // Customer Filters
    clientName = true;
    customerType = false;
    email = false;
    contactNumber = false;
    // Other Filters
    agentName = true;
    createdBy = true;
    totalPrice = true;
    selectedReservation;
    reservationDocuments;
    reservationHistory;
    isMobile = false;
    uploadDocumentForm!: FormGroup;
    file: File;
    filePath = '';
    documentType: string = 'Select Document Type';

    isEditPersonalInfo = false;
    isEditLotInfo = false;

    constructor(
        private modalService: NgbModal, private reservationService: ReservationService
    ) {
    }

    setDocumentType(type: string) {
        this.documentType = type;
    }

    getImage(event: any): void {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = () => {
            this.filePath = reader.result as string; // base64 Image src
            this.file = event.target.files ? event.target.files[0] : null;
            this.uploadDocumentForm.get('file')?.setValue(this.file);
        };
    }

    ngOnInit() {
        if (Utils.isMobile()) {
            this.isMobile = true;
        }
        this.reservationService.getReservations()
            .subscribe((value: any) => {
                this.reservations = [...value.data];
                this.filteredReservations = value.data;
                console.log(this.filteredReservations);
            });
        this.reservationService.getReservationChecklists()
            .subscribe((value: any) => {
                console.log(value.data);
                this.checklist = value.data;
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
            return this.filteredReservations = [...this.reservations];
        }

        const columns = Object.keys(this.reservations[0]);
        if (!columns.length) {
            return;
        }

        const rows = this.reservations.filter(function (d) {
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
        this.filteredReservations = rows;
    }

    openModal(content, reservationId: string) {
        for (let reservation of this.reservations) {
            if (reservation.id === reservationId) {
                this.selectedReservation = reservation;
                break;
            }
        }
        this.reservationService.getReservationDocuments(reservationId)
            .subscribe((value: any) => {
                this.reservationDocuments = value.data;
                console.log(this.reservationDocuments);
            });
        this.reservationService.getReservationHistory(reservationId)
            .subscribe((value: any) => {
                this.reservationHistory = value.data;
            });
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'xl'})
            .result.then((result) => {
        }, (reason) => {

        });

    }

    openAddDocumentModal(content) {
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'xl'})
            .result.then((result) => {
        }, (reason) => {

        });
    }

    documentExists(reservationId: string, requirementCode: string) {
        let found = false;
        this.reservations
            .filter(res => res.id === reservationId)
            .forEach(res => {
                res.documents.forEach(document => {
                        if (document.requirementCode === requirementCode) {
                            found = true;
                        }
                    }
                );
            });
        return found;
    }

    filterDocumentsOfType(type) {
        return this.checklist.filter(req => req.type === type).filter(req => this.documentExists(this.selectedReservation.id, req.requirementCode) === false);
    }

    checkE

    protected readonly auto = auto;
}
