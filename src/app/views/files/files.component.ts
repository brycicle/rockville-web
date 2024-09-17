import { Component } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ReservationService} from '../../shared/services/reservation.service';
import {Utils} from '../../shared/utils';
import {debounceTime} from 'rxjs/operators';
import {FileDocumentService} from '../../shared/services/file-document.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent {
  hovered: boolean;

  documents;
  filteredDocuments;
  selectedDocumentPath;
  selectedFileName;

  constructor(
      private modalService: NgbModal, private fileDocumentService: FileDocumentService,private sanitizer: DomSanitizer
  ) {
  }
  ngOnInit() {
    this.fileDocumentService.getDocuments()
        .subscribe((value: any) => {
          console.log(value.data);
          this.documents = [...value.data];
          this.filteredDocuments = value.data;
        });
  }

  setDocumentPath(filePath: string, fileName: string) {
    // https://docs.google.com/gview?url=https://rockville-fs.s3.ap-southeast-2.amazonaws.com/documents/reservation/RP+ADDITIONAL+REQUIREMENTS+For+Overseas+Filipino+Workers+(OFW).docx&embedded=true
    this.selectedDocumentPath = this.sanitizer.bypassSecurityTrustResourceUrl("https://docs.google.com/gview?url=https://rockville-fs.s3.ap-southeast-2.amazonaws.com/documents/reservation/" + filePath + "&embedded=true");
    this.selectedFileName = fileName;
  }

  openFileModal(content, file, fileName) {
    this.setDocumentPath(file, fileName);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'xl'})
        .result.then((result) => {
    }, (reason) => {

    });
  }

  filterData(val) {
    console.log("Filter : " + val);
    if (val) {
      val = val.toLowerCase();
    } else {
      return this.filteredDocuments = [...this.documents];
    }

    const columns = Object.keys(this.documents[0]);
    if (!columns.length) {
      return;
    }

    const rows = this.documents.filter(function(d) {
      for (let i = 0; i <= columns.length; i++) {
        const column = columns[i];
        // console.log(d[column]);
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
    });
    this.filteredDocuments = rows;
  }

  openFolderModal(content, folder) {
    this.filterData(folder);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'xl'})
        .result.then((result) => {
    }, (reason) => {

    });
  }
}
