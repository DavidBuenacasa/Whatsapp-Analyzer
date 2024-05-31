
export class Registro_iphone{


    private linea:string;

    constructor(linea:string) {
        
        this.linea=linea;

    }

    getPersona(): string {
        let persona: string = "";
    
        const a: string[] = this.linea.split(":");
        persona = a[2].split("]")[1];
        persona = persona.trim();
        return persona;
    }

    get_mensaje(): string {
        const a = this.linea.split(":");
        const mensaje = a[3].trim();
        return mensaje;
    }

    get_fecha_hora(): string{
        
        let prueba:string="";

        const b = this.linea.split(" ");
        const timeStr = b[1].slice(0, -1);
        const [hours, minutes] = timeStr.split(":");
        
        const index_separator = this.linea.indexOf(",");
        const dateStr = this.linea.slice(1, index_separator);
        const [day, month, year] = dateStr.split("/");

        let d:number=+month;

        let date: Date = new Date(+year,+month-1,+day);
        
        

        prueba=date.getDate()  + "/" + (date.getMonth()) +"/" + date.getFullYear() + " - " + date.getHours() +":"+date.getMinutes();


        
        return prueba;
    }




}