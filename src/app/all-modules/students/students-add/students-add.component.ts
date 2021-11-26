import { Component, OnInit,ViewChild,ElementRef   } from "@angular/core";
import { FormGroup, FormBuilder, Validators,AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { AllModulesService } from "../../all-modules.service";
import { Router } from "@angular/router";
import { DatePipe } from "@angular/common";
import { ToastrService } from "ngx-toastr";
import { LoginService } from "src/app/services/login.service";
import { event } from "jquery";
import * as moment from 'moment';
import { HttpClient, HttpInterceptor, HttpParams } from '@angular/common/http';
import { fileSizeValidator } from '../fileSizeValidator';

@Component({
  selector: "app-students-add",
  templateUrl: "./students-add.component.html",
  styleUrls: ["./students-add.component.css"],
})
export class StudentsAddComponent implements OnInit {
  @ViewChild('fileinput') fileinput:ElementRef;
  @ViewChild('fileinput1') fileinput1:ElementRef;
  @ViewChild('fileinput2') fileinput2:ElementRef;
 // @ViewChild('fileinput3') fileinput3:ElementRef;


   addStudentsForm: FormGroup;
 // public url = "studentsList";
  obj:any;
  public pipe = new DatePipe("en-US");
  file:File = null;
  public birthdate: string;
  public age:string;
  public currentDate:Date;
  // public url1:any;
 // public url2:any;
 // public url3:any;
  
  constructor(
    private formBuilder: FormBuilder,
    private srvModuleService: AllModulesService,
    private loginService:LoginService,
    private router: Router,
    private toastr: ToastrService,
    private Http:HttpClient,
  ) {}

  ngOnInit() {
    // Add students form validation

   this.currentDate=new Date();
    const namepattern = "^[a-zA-Z ]{2,20}$";
    const filepattern = "[^\\s]+(\\.(jpg|png|gif|bmp))$";
    const filepattern1= "[^\\s ]+(\\.(pdf))$";
    const emailpattern= "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"
    const mobilepattern="^[0-9]{10}$";
     this.addStudentsForm = this.formBuilder.group({
      FirstName: ["", [Validators.required,Validators.pattern(namepattern)]],
      LastName: ["",[Validators.required,Validators.pattern(namepattern)]],
      siblings:[""],
      identification: ["", [Validators.required]],
      gender:["", [Validators.required]],
      dob: ["", [Validators.required]],
      bloodgroup:["", [Validators.required]],
      type:["", [Validators.required]],
      terms: [false, Validators.requiredTrue],
      medprblm:[""],


        doj:["", [Validators.required]],
      //  class: ["", [Validators.required]],
      file : ["",[Validators.required,Validators.pattern(filepattern)]],
      fileSource: [""],
      file1: ["",[Validators.required,Validators.pattern(filepattern1)]],
      fileSource1: [""],
      file2: ["",[Validators.required,Validators.pattern(filepattern1)]],
      fileSource2: [""],
     // file3: ["",[Validators.required]],
     // fileSource3: [""],

     // contactNumber: ["", [Validators.required]],
      
      fathersName: ["", [Validators.required,Validators.pattern(namepattern)]],
   //   fathersOccupation: ["", [Validators.required]],
      fathersMobile: ["", [Validators.required,Validators.pattern(mobilepattern)]],
      fathersEmail: ["", [Validators.required,Validators.pattern(emailpattern)]],
       
     // mothersName: ["", [Validators.required]],
     // mothersOccupation: [""],
      mothersMobile: ["", [Validators.required,Validators.pattern(mobilepattern)]],
     // mothersEmail: [""],
      
      //  mobileNumber: ["", [Validators.required]],

     address: ["", [Validators.required]],
   
    });
  }

  // Add students submit call
  addStudents() {
    let DateOfBirth = this.pipe.transform(
      this.addStudentsForm.value.dob,
      "d MMM y"
    );

    var todaysDate=moment(new Date());
    var dob=moment(new Date(this.addStudentsForm.value.dob));
    var duration=moment.duration(todaysDate.diff(dob));
     let age= duration.years().toString();
    console.log(duration.years());
    console.log(duration.months());
    console.log(duration.days());
    
    
    
    const formData = new FormData();
    formData.append('FirstName', this.addStudentsForm.get('FirstName').value);
    formData.append('LastName', this.addStudentsForm.get('LastName').value);
    formData.append('siblings', this.addStudentsForm.get('siblings').value);
 
  formData.append('identification', this.addStudentsForm.get('identification').value);
  formData.append('gender',this.addStudentsForm.get('gender').value);
  formData.append('doj', this.addStudentsForm.get('dob').value);
  formData.append('dob', this.addStudentsForm.get('dob').value);
  formData.append('age',age);
  formData.append('bloodgroup',this.addStudentsForm.get('bloodgroup').value);
  formData.append('type',this.addStudentsForm.get('type').value);
    
    //  formData.append('doj', DateOfJoin);
   
    formData.append('medprblm', this.addStudentsForm.get('medprblm').value);
   // formData.append('contactNumber',this.addStudentsForm.get('contactNumber').value);
    

    formData.append('file', this.addStudentsForm.get('fileSource').value);
    formData.append('file1', this.addStudentsForm.get('fileSource1').value);
    formData.append('file2', this.addStudentsForm.get('fileSource2').value);
    //formData.append('file3', this.addStudentsForm.get('fileSource3').value);   

    formData.append('fathersName', this.addStudentsForm.get('fathersName').value);
    //formData.append('fathersOccupation', this.addStudentsForm.get('fathersOccupation').value);
    formData.append('fathersMobile', this.addStudentsForm.get('fathersMobile').value);
    formData.append('fathersEmail', this.addStudentsForm.get('fathersEmail').value);
    

   // formData.append('mothersName', this.addStudentsForm.get('mothersName').value);
   // formData.append('mothersOccupation', this.addStudentsForm.get('mothersOccupation').value);
    formData.append('mothersMobile', this.addStudentsForm.get('mothersMobile').value);
   // formData.append('mothersEmail', this.addStudentsForm.get('mothersEmail').value);
    

  //  formData.append('mobileNumber', this.addStudentsForm.get('mobileNumber').value);
    formData.append('address', this.addStudentsForm.get('address').value);
  alert(formData);  
  if(this.addStudentsForm.valid){
    this.loginService.studentdetails(formData).subscribe(res => {
      if(res)
  {
    this.toastr.success("Student Added Successfully",'Success')  
    this.router.navigate(['./students/students-list']);
        
  }
  else{
  
    this.toastr.error("something went wrong",'Error')  
  
  
  
  }
  
  
  
       }); 
     }
      else{


        this.toastr.warning("Mandatory fields are required...!", "Warning");
      }





     }
    
     onstudentsImageChange(event) {
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        const fileSize = file.size;
       // console.log(fileSizeInKB.toString);
         var mimeType = file.type;
        if (mimeType.match(/image\/*/) == null) {
           event.target.value=null;
      }
        else
        if (fileSize >= 30000) {
          event.target.value=null;
          this.toastr.error("File size is long",'Error')  
        }
        else{
         this.addStudentsForm.patchValue({
            fileSource: file
          });

        }

       /* if(file.type == "image/jpeg") {
          console.log("correct");
         this.addStudentsForm.patchValue({
          fileSource: file
        });
        }
        else {
          this.addStudentsForm.controls["file"].setValidators([Validators.required]);
          this.addStudentsForm.get('file').updateValueAndValidity();


        }*/
          //call validation
                //Show image preview
  //  var reader = new FileReader();
  //  reader.readAsDataURL(event.target.files[0]);
  //  reader.onload = (event) => { // called once readAsDataURL is completed
     // this.url = event.target.result;
    }
    

  }
 /* deleteImage(url){
    this.url = "";
    this.fileinput.nativeElement.value=null;
  }
  deleteImage1(url1){
    this.url1 = "";
    this.fileinput1.nativeElement.value=null;
  }deleteImage2(url2){
    this.url2 = "";
    this.fileinput2.nativeElement.value=null;
  }deleteImage3(url3){
    this.url3 = "";
    this.fileinput3.nativeElement.value=null;
  }

  onfathersImageChange(event) {
    if (event.target.files.length > 0) {
      const file1 = event.target.files[0];
      this.addStudentsForm.patchValue({
        fileSource1: file1
      });
    //Show image preview
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event) => { // called once readAsDataURL is completed
      this.url1 = event.target.result;
    }


    }
}
onmothersImageChange(event) {
  if (event.target.files.length > 0) {
    const file2 = event.target.files[0];
    this.addStudentsForm.patchValue({
      fileSource2: file2
    });
    //Show image preview
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event) => { // called once readAsDataURL is completed
      this.url2 = event.target.result;
    }

  }
}*/
onBirthChange(event){
  console.log(event);
  if (event.target.files.length > 0) {
    const file1 = event.target.files[0];
    if(file1.type=='application/pdf'){
      this.addStudentsForm.patchValue({
        fileSource1: file1
      });
   
    }else{
      event.target.value=null;
   
    }
   


}}

onparentDocChange(event){
  console.log(event);
  if (event.target.files.length > 0) {
    const file2 = event.target.files[0];
    if(file2.type=='application/pdf'){
      this.addStudentsForm.patchValue({
        fileSource2: file2
      });
   
    }else{
      event.target.value=null;
   
    }
   
        //Show image preview
      //  var reader = new FileReader();
      //  reader.readAsDataURL(event.target.files[0]);
      //  reader.onload = (event) => { // called once readAsDataURL is completed
       //  this.url3 = file3;
       
        // }
  }



}

changeGender(event){
  console.log(event.target.value);
  this.addStudentsForm.patchValue({
      gender:event.target.value

  });


}
changeBlood(event){
  console.log(event.target.value);
  this.addStudentsForm.patchValue({
      bloodgroup:event.target.value

  });


}

    // convenience getter for easy access to form fields
    get f() { return this.addStudentsForm.controls; }

changeType(event){
  console.log(event.target.value);
  this.addStudentsForm.patchValue({
      type:event.target.value

  });


}

}