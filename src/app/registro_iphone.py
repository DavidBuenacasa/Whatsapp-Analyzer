from datetime import *

class registro_iphone:

    def __init__(self,registro_iphone):
        self.linea = registro_iphone


    def get_persona(self):
        persona=""

        a=self.linea.split(":")
        persona = a[2].split("]")[1]
        persona = persona.lstrip()
        return persona

    def get_mensaje(self):
        a=self.linea.split(":")
        mensaje = a[3].lstrip()

        return mensaje
    
    def get_fecha_hora(self):
            
            b=self.linea.split(" ")
            b=b[1][0:len(b[1])-1]
            b=b.split(":")
            
            time= timedelta(hours = int(b[0]), minutes = int(b[1]))
            
            index_separator = self.linea.find(",")
            
            a = self.linea[1:index_separator]
            a=a.split("/")
            
            fechaHora=datetime(int(a[2]),int(a[1]),int(a[0])) + time
            
            return fechaHora