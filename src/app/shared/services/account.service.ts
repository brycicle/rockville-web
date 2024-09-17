import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private apiUrl = environment.apiUrl;
  constructor(private router: Router, private http: HttpClient) { }

  public getReservationChecklist(customerType: string) {
    return this.http.get(this.apiUrl + '/v1/reservation/checklist?type=' + customerType);
  }

  public getReservationChecklists() {
    return this.http.get(this.apiUrl + '/v1/reservation/checklist');
  }

  public getReservationDocuments(reservationId: string) {
    return this.http.get(this.apiUrl + '/v1/reservation/documents/' + reservationId);
  }

  public getReservationHistory(reservationId: string) {
    return this.http.get(this.apiUrl + '/v1/reservation/history/' + reservationId);
  }

  public addAccount(reservationData, reservationResFee: File, reservationGovId: File) {

    const formData = new FormData();
    formData.append('reservationResFee', reservationResFee);
    formData.append('reservationGovId', reservationGovId);

    formData.append('lotName', reservationData.value.lotRequest.lotName);
    formData.append('blockName', reservationData.value.lotRequest.blockName);
    formData.append('lotPrice', reservationData.value.lotRequest.lotPrice);

    formData.append('houseName', reservationData.value.houseRequest.houseName);
    formData.append('housePrice', reservationData.value.houseRequest.housePrice);
    formData.append('multiplier', reservationData.value.houseRequest.multiplier);

    formData.append('firstName', reservationData.value.customerRequest.firstName);
    formData.append('middleName', reservationData.value.customerRequest.middleName);
    formData.append('lastName', reservationData.value.customerRequest.lastName);
    formData.append('suffix', reservationData.value.customerRequest.suffix);
    formData.append('gender', reservationData.value.customerRequest.gender);
    formData.append('maritalStatus', reservationData.value.customerRequest.maritalStatus);
    formData.append('type', reservationData.value.customerRequest.type);
    formData.append('emailAddress', reservationData.value.customerRequest.emailAddress);
    formData.append('contactNumber', reservationData.value.customerRequest.contactNumber);
    formData.append('address', reservationData.value.customerRequest.address);

    formData.append('agentName', reservationData.value.agentName);
    return this.http.post(this.apiUrl + '/v1/reservation', formData);
  }

  public getAccounts() {
    return this.http.get(this.apiUrl + '/v1/account');
  }

  public getSalesAgents() {
    return this.http.get(this.apiUrl + '/v1/account/agents');
  }
}
