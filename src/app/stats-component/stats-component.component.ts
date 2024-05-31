import { Component } from '@angular/core';
import { Registro_iphone } from '../registro_iphone';



@Component({
  selector: 'app-stats-component',
  templateUrl: './stats-component.component.html',
  styleUrl: './stats-component.component.css'
})
export class StatsComponentComponent {

  prueba1:string=""
  prueba2:string=""

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
    this.analizar()
  }

  analizar(){

    let linea:string="[30/1/22, 15:55:28] Laurii 🥰: Al final hoy hoy de 19-23h que Ana me ha dicho que le cambie el turno"

    let registro:Registro_iphone=new Registro_iphone(linea)

    this.prueba1=registro.getPersona()

    this.prueba2=registro.get_fecha_hora()
    
  }

}

