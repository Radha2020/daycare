import { Component, OnInit,Input } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl,Validators,FormGroupDirective} from '@angular/forms';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router} from '@angular/router';
import { LoginService } from '../services/login.service';

import {ToastrService} from 'ngx-toastr';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  RegisterDetails : any = {
    dcname :'',
    email : '',
    password:'',
    confirmpassword:''
  };


  constructor(private router: Router,private loginService:LoginService,private toastr:ToastrService) { }

  ngOnInit() {
  }
register(){
  alert(JSON.stringify(this.RegisterDetails));
  this.loginService.registerdetails(this.RegisterDetails).subscribe(res => {
     
    if(res['status']==true)
{
  this.toastr.success("Register Successfully",'Success')  
  this.router.navigate(['/dashboard']);
      
}
else{

  this.toastr.error("something went wrong",'Error')  



}



     }); 
    }
 




}
