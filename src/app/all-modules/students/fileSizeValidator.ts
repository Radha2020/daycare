import { AbstractControl, FormControl } from "@angular/forms";
export function fileSizeValidator(file) {

  return function(control: FormControl) {
    
    
    // return (control: AbstractControl): { [key: string]: any } | null => {
    //const file = control.value;
  //  const file = 
    console.log(file.type);
    console.log(file.size);
    alert(file);
    if (file) {
      //var path = file.replace(/^.*[\\\/]/, "");
      const fileSize = file.item(0).size;
      const fileSizeInKB = Math.round(fileSize / 1024);
      if (fileSizeInKB >= 19) {
        return {
          fileInvalid: true
        };
      } else {
        return null;
      }
    }
    return null;
  };
}