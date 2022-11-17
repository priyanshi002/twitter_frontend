import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, observable, Subject } from "rxjs";


const headers = new HttpHeaders().set('content-type', 'application/json');

@Injectable({ providedIn: 'root' })

export class HomeService {
    constructor( private http: HttpClient){
        headers.append('Accept', 'application/json');
    }

    populteGridData(obj) {
        return this.http.post(`${environment.apiUrl}/TwitterNLP/analyse`, obj);
    }
}

