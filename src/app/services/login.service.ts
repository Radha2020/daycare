import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpInterceptor, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map} from 'rxjs/operators';
import { Options } from 'selenium-webdriver/opera';
import { error } from 'protractor';
import {AppConfig} from './../config';
import { HttpHeaders } from '@angular/common/http';
import { TagContentType } from '@angular/compiler';
 
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private Http:HttpClient,private conf:AppConfig) { }

  getContacts(Details)
  { 
      return this.Http.post(this.conf.url+"/hosp/Api/check",Details).pipe(map(res=> 
      {    
      return res}));
      }
    
      passwordchange(Details){

        return this.Http.post(this.conf.url+"/hosp/Api/passwordupdate",JSON.stringify(Details)).pipe(map(res=> 
          {    
          return res}));
         

      }
registerdetails(Details)
{  
  alert(JSON.stringify(Details));
   return this.Http.post(this.conf.url+"/hosp/Api/mumnestreg",JSON.stringify(Details)).pipe(map(res=>
{
  return res}));
}
studentdetails(formData){
 
    return this.Http.post(this.conf.url+"/hosp/Api/studreg",formData).pipe(map(res=>
{
 return res}));
}
getstudents(){
  return this.Http.get(this.conf.url+"/hosp/Api/getstud").pipe(map(res=>
    {return res}));
}
getstudentsdtlsperrId(id){
  return this.Http.post(this.conf.url+"/hosp/Api/getstudperId",JSON.stringify(id)).pipe(map(res=>
{
 return res}));
}
studentupdate(formData){

  return this.Http.post(this.conf.url+"/hosp/Api/updatestudperId",formData).pipe(map(res=>
    {
     return res}));

}
getstudentsperdoj(datejoin){

return this.Http.post(this.conf.url+"/hosp/Api/reportsperDoj",JSON.stringify(datejoin)).pipe(map(res=>
  {
   return res}));

}
}

