import { Component, OnInit,ViewChild,ElementRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { AllModulesService } from "../../all-modules.service";
import { ToastrService } from "ngx-toastr";
import * as moment from 'moment';
import { LoginService } from "src/app/services/login.service";
import { Alert } from "selenium-webdriver";
@Component({
  selector: "app-students-edit",
  templateUrl: "./students-edit.component.html",
  styleUrls: ["./students-edit.component.css"],
})
export class StudentsEditComponent implements OnInit {
  @ViewChild('fileinput') fileinput:ElementRef;
  @ViewChild('fileinput1') fileinput1:ElementRef;
  @ViewChild('fileinput2') fileinput2:ElementRef;
  @ViewChild('fileinput3') fileinput3:ElementRef;
  public editId;
  id:any={};
  public editStudentsForm: FormGroup;
  public pipe = new DatePipe("en-US");
 // public url = "studentsList";
  lstStudents:any;
  public obj;
  public setDate;
  sourceImage: string;
  sourceImage1: string;
  sourceImage2: string;
  sourceImage3: string;
  
  public url:any;
  public url1:any;
  public url2:any;
  public url3:any;
 // formData = new FormData();
  preview:boolean = true;
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private srvModuleService: AllModulesService,
    private loginService:LoginService,
    private router: Router,
    private toastr: ToastrService,
    public datepipe: DatePipe,
    ) {}

  ngOnInit() {
   
    //getting edit id of selected student list
    this.editId = parseInt(this.route.snapshot.queryParams["id"]);
    this.loadStudents();
  
    //editstudents form validation
    this.editStudentsForm = this.formBuilder.group({
      FirstName: ["", [Validators.required]],
      LastName: [""],
      dob: [""],
      gender: ["", [Validators.required]],
      identification:[""],
      bloodgroup:[""],
      type:[""],
      medprblm:[""],
      
      file : [""],
      fileSource: [""],
      file1: [""],
      fileSource1: [""],
      file2: [""],
      fileSource2: [""],
      file3: [""],
      fileSource3: [""],

      fathersName: ["", [Validators.required]],
      fathersMobile: ["", [Validators.required]],
      fathersEmail: ["", [Validators.required]],
      mothersMobile: ["", [Validators.required]],
      address: ["", [Validators.required]],
    });
    setTimeout(() => {
      //<<<---using ()=> syntax
    //  this.edit();
    }, 1000);
  }

  // Get Students List  Api Call
  loadStudents() {    this.id={
      "id":this.editId
    };

   this.loginService.getstudentsdtlsperrId(this.id).subscribe((data) => {
   this.lstStudents = data;
   this.sourceImage=this.lstStudents[0]['studentphotoUrl'];
   this.sourceImage1=this.lstStudents[0]['bcUrl'];
   this.sourceImage2=this.lstStudents[0]['docUrl'];

 
   //alert(JSON.stringify(this.sourceImage3));
   

  // alert(JSON.stringify(this.lstStudents[0]['dob']));
   
      this.editStudentsForm.patchValue(
{
       FirstName:this.lstStudents[0]['FirstName'],
       LastName:this.lstStudents[0]['LastName'],
       gender:this.lstStudents[0]['gender'],
       dob:this.lstStudents[0]['dob'],
       identification:this.lstStudents[0]['identification'],
       bloodgroup:this.lstStudents[0]['bloodgroup'],
       type:this.lstStudents[0]['type'],
       medprblm:this.lstStudents[0]['medprblm'],
       
     
       fathersName:this.lstStudents[0]['fathersName'],
       fathersOccupation:this.lstStudents[0]['fathersOccupation'],
       fathersMobile:this.lstStudents[0]['fathersMobile'],
       fathersEmail:this.lstStudents[0]['fathersEmail'],
       
       mothersName:this.lstStudents[0]['mothersName'],
       mothersOccupation:this.lstStudents[0]['mothersOccupation'],
       mothersMobile:this.lstStudents[0]['mothersMobile'],
       mothersEmail:this.lstStudents[0]['mothersEmail'],
       address:this.lstStudents[0]['address'],

       file:this.lstStudents[0]['studentphotoUrl']

});
       // this.dtTrigger.next();
     });
  }

  // Edit students Submit call
  editStudents() {
    
   /*   if(this.editStudentsForm.get('fileSource').value=="")
     {
        alert("empty");
  
  
        this.editStudentsForm.patchValue({
          fileSource: ""
         });
         this.formData.append('file', this.editStudentsForm.get('fileSource').value);
        }
else{
  this.formData.append('file', this.editStudentsForm.get('fileSource').value);
  }    
 */  
    const formData = new FormData(); 
    var todaysDate=moment(new Date());
    var dob=moment(new Date(this.editStudentsForm.value.dob));
    var duration=moment.duration(todaysDate.diff(dob));
     let age= duration.years().toString();

    let DateJoin = this.pipe.transform(
      this.editStudentsForm.value.dob,
      "d MMM y"
    );
      id: this.editId,
      
      formData.append('id', this.editId);
      
      formData.append('FirstName', this.editStudentsForm.get('FirstName').value);
      formData.append('LastName', this.editStudentsForm.get('LastName').value);
      formData.append('identification', this.editStudentsForm.get('identification').value);
      formData.append('gender',this.editStudentsForm.get('gender').value);
      formData.append('dob', this.editStudentsForm.get('dob').value);
      formData.append('age',age);
      formData.append('bloodgroup',this.editStudentsForm.get('bloodgroup').value);
      formData.append('type',this.editStudentsForm.get('type').value);
      formData.append('medprblm', this.editStudentsForm.get('medprblm').value);
      if(this.editStudentsForm.get('fileSource').value=="")
      {
       //  alert("photo-empty");
     
         this.editStudentsForm.patchValue({
           fileSource: ""
          });
          formData.append('file', this.editStudentsForm.get('fileSource').value);
             }
             
             if(this.editStudentsForm.get('fileSource1').value=="")
             {
               alert("bc-empty");
            
                this.editStudentsForm.patchValue({
                  fileSource1: ""
                 });
                 formData.append('file1', this.editStudentsForm.get('fileSource1').value);
                    }
                    if(this.editStudentsForm.get('fileSource2').value=="")
      {
        // alert("aadhar-empty");
     
         this.editStudentsForm.patchValue({
           fileSource2: ""
          });
          formData.append('file2', this.editStudentsForm.get('fileSource2').value);
             }

  //    formData.append('file1', this.editStudentsForm.get('fileSource1').value);
  //   formData.append('file2', this.editStudentsForm.get('fileSource2').value);
   
      formData.append('fathersName', this.editStudentsForm.get('fathersName').value);
      formData.append('fathersMobile', this.editStudentsForm.get('fathersMobile').value);
      formData.append('fathersEmail', this.editStudentsForm.get('fathersEmail').value);
     formData.append('mothersMobile', this.editStudentsForm.get('mothersMobile').value);
     formData.append('address', this.editStudentsForm.get('address').value);
      alert(formData);
   
      if(this.editStudentsForm.valid){
        this.loginService.studentupdate(formData).subscribe(res => {
          if(res)
      {
        this.toastr.success("Student Updated Successfully",'Success')  
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
    
    
    
    










  
  /*alert(JSON.stringify(this.obj));  
    if (this.editStudentsForm.valid) {
      this.loginService.studentupdate(this.obj).subscribe((data) => {
        this.router.navigate(["/students/students-list"]);
        this.toastr.success("Students edited sucessfully...!", "Success");
      });
    } else {
      this.toastr.warning("Mandatory fields are required...!", "Warning");
    }*/
  }

  // set values to students form
  /*edit() {
    if (isNaN(this.editId)) {
      const index = this.lstStudents.findIndex((item) => {
        return item.id === 1;
      });
      let toSetValues = this.lstStudents[index];
      this.editStudentsForm.patchValue({
        studentId: toSetValues.idNo,
        FirstName: toSetValues.name,
        class: toSetValues.class,
        dob: toSetValues.dob,
        mobileNumber: toSetValues.mobileNumber,
        address: toSetValues.address,
        fathersName: toSetValues.parentName,
      });
      this.setDate = toSetValues.dob;
    } else {
      const index = this.lstStudents.findIndex((item) => {
        return item.id === this.editId;
      });
      let toSetValues = this.lstStudents[index];
      this.editStudentsForm.patchValue({
        studentId: toSetValues.idNo,
        FirstName: toSetValues.name,
        class: toSetValues.class,
        dob: toSetValues.dob,
        mobileNumber: toSetValues.mobileNumber,
        address: toSetValues.address,
        fathersName: toSetValues.parentName,
      });
      this.setDate = toSetValues.dob;
    }
  }
*/

  onstudentsImageChange(event) {
    alert("file");
     if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file.type);
      this.editStudentsForm.patchValue({
         fileSource: file
         
      });
      this.preview=false;
     // alert(this.preview);
     // this.lstStudents[0]['studentimageUrl']="";
       //Show image preview
  var reader = new FileReader();
  reader.readAsDataURL(event.target.files[0]);
  reader.onload = (event) => { // called once readAsDataURL is completed
    this.url = event.target.result;
  }
    }

}
onBirthChange(event){
  console.log(event);
  if (event.target.files.length > 0) {
    const file1 = event.target.files[0];
    
    console.log(file1.type);
    if(file1.type=='application/pdf'){
      this.editStudentsForm.patchValue({
        fileSource1: file1
      });
     // this.editStudentsForm.get('file1').updateValueAndValidity();


      
    }else{
      event.target.value=null;
   
    }
   


}}
onparentDocChange(event){
if (event.target.files.length > 0) {
  const file2 = event.target.files[0];
  this.editStudentsForm.patchValue({
    fileSource2: file2
  });
  this.preview=false;
     // alert(this.preview);
     // this.lstStudents[0]['studentimageUrl']="";
       //Show image preview
  var reader = new FileReader();
  reader.readAsDataURL(event.target.files[0]);
  reader.onload = (event) => { // called once readAsDataURL is completed
    this.url2 = event.target.result;
  }
}



}
deleteImage(url){
  this.url = "";
  this.fileinput.nativeElement.value=null;
}
deleteImage1(url1){
  this.url1 = "";
  this.fileinput1.nativeElement.value=null;
}deleteImage2(url2){
  this.url2 = "";
  this.fileinput2.nativeElement.value=null;
}
}
