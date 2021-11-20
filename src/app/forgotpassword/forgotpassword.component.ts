import { Component, OnInit } from '@angular/core';

import { Router} from '@angular/router';

import { LoginService } from '../services/login.service';

import { FormGroup, FormBuilder, Validators,AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import {ToastrService} from 'ngx-toastr';
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  PasswordDetails : any = {
    password:'',
    repassword:''
  };
  

  dataForm: FormGroup;
  constructor(private router: Router,private loginService:LoginService,private toastr:ToastrService, private formBuilder: FormBuilder,) { }

  ngOnInit() {

    this.dataForm = this.formBuilder.group({
      email: [ "", [Validators.required]],
      password: [ "", Validators.required],
      repassword: [ "", [ Validators.required]],
      
    });
  }
  fpassword(){
     if(this.dataForm.value.password==this.dataForm.value.repassword){

      let obj = {
        email: this.dataForm.value.email,
        password: this.dataForm.value.password
        
      };

      this.loginService.passwordchange(obj).subscribe(res => {
        // alert(JSON.stringify(res));
         if(res['status']==true)
   {
     this.toastr.success("Password updated Successfully",'Success')  
     this.router.navigate([""]);
   // this.router.navigateByUrl('/dashboard/dashboard-main')
         
   }})
  }
    else{
      this.toastr.error("Password fileds mismatched",'error')  
    }
    

  
}

}
