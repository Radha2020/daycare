import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpInterceptor, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Options } from 'selenium-webdriver/opera';
import { error } from 'protractor';
import { AppConfig } from './../config';
import { HttpHeaders } from '@angular/common/http';
import { TagContentType } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private Http: HttpClient, private conf: AppConfig) { }

  getContacts(Details) {
    return this.Http.post(this.conf.url + "/daycare/Api/check", Details).pipe(map(res => {
      return res
    }));
  }

  passwordchange(Details) {

    return this.Http.post(this.conf.url + "/daycare/Api/passwordupdate", JSON.stringify(Details)).pipe(map(res => {
      return res
    }));


  }

  statuschange(Details) {

    return this.Http.post(this.conf.url + "/daycare/Api/statusupdate", JSON.stringify(Details)).pipe(map(res => {
      return res
    }));


  }

  registerdetails(Details) {
    alert(JSON.stringify(Details));
    return this.Http.post(this.conf.url + "/daycare/Api/mumnestreg", JSON.stringify(Details)).pipe(map(res => {
      return res
    }));
  }
  studentdetails(formData) {

    return this.Http.post(this.conf.url + "/daycare/Api/studreg", formData).pipe(map(res => {
      return res
    }));
  }
  getActiveStudents() {

    return this.Http.get(this.conf.url + "/daycare/Api/getactivestudreports").pipe(map(res => { return res }));

  }
  getstudents() {
    return this.Http.get(this.conf.url + "/daycare/Api/getstud").pipe(map(res => { return res }));
  }
  getstudentsdtlsperrId(id) {
    return this.Http.post(this.conf.url + "/daycare/Api/getstudperId", JSON.stringify(id)).pipe(map(res => {
      return res
    }));
  }
  studentupdate(formData) {

    return this.Http.post(this.conf.url + "/daycare/Api/updatestudperId", formData).pipe(map(res => {
      return res
    }));

  }
  getstudentsperdoj(datejoin) {

    return this.Http.post(this.conf.url + "/daycare/Api/reportsperDoj", JSON.stringify(datejoin)).pipe(map(res => {
      return res
    }));

  }
}

