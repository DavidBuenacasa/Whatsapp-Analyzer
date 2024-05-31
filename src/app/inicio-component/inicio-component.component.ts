import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { stats_module } from '../stats_module';



@Component({
  selector: 'app-inicio-component',
  templateUrl: './inicio-component.component.html',
  styleUrl: './inicio-component.component.css'
})
export class InicioComponentComponent {

  

  status: "initial" | "uploading" | "success" | "fail" = "initial"; // Variable to store file status
  file: File | null = null; // Variable to store file

  constructor(private router:Router){
    
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  onChange(event: any) {
    const file: File = event.target.files[0];
    
    let extensionFile;

    extensionFile=file.name.split(".").pop()


    if (file && extensionFile == "txt") {
      this.status = "initial";
      this.file = file;

    }else{
      //Error formato
    }
  }

  analizar(){
    this.router.navigate(["/stats"])
    let filemobile:string=this.mobileRadiuButton();

    if(this.file){
      let analyzer:stats_module = new stats_module(this.file,filemobile);
    }

  }

  mobileRadiuButton(){
    let result:string="";
    const radioButtons = document.querySelectorAll('input[name="select"]');

    for (let radioButton of radioButtons) {
      if (radioButton.checked) {
          result = radioButton.value;
          break;
      }
    }

    return result;
  }

  
}
