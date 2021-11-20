import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl,Validators,FormGroupDirective} from '@angular/forms';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router} from '@angular/router';

import { LoginService } from '../services/login.service';

import {ToastrService} from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  LoginDetails : any = {
    email : '',
    password:''
  };
  constructor(private router: Router,private loginService:LoginService,private toastr:ToastrService) { }

  ngOnInit() {
  }
  login() {
    //alert("login");
    // alert(JSON.stringify(this.LoginDetails));

     this.loginService.getContacts(this.LoginDetails).subscribe(res => {
     // alert(JSON.stringify(res));
      if(res['status']==true)
{
  this.toastr.success("Login Successfully",'Success')  
  this.router.navigate(['/dashboard']);
// this.router.navigateByUrl('/dashboard/dashboard-main')
      
}
else{

  this.toastr.error("Invalid mail &pwd",'Error')  



}
})
}


}
