from datetime import *

class registro:

    def __init__(self,registro):
        self.linea = registro

    def getMensaje(self):
        a=self.linea.split(":")
        return a[2]
    

    def getFechaHora(self):
        array=self.linea.split(",")
        #Obtenemos la fecha en formato dd/mm/aa
        fecha=array[0].split("/")
        
        #Obtenemos la hora en formato hh:mm x.m
        hora= self.linea.split(" ")
        
        #Booleano que devuelve si en el string hora pone p.m
        pm=hora[1].find("p") !=-1
        
        #Se asigna la hora a la variable b
        b=int(hora[1].split(":")[0])
        
        #Si la hora es pm se suma 12 a la hora para tenerla en reloj 24h
        if pm :
            b= b + 12
        
        #Separamos los minutos
        m= int(hora[1].split(":")[1][0:2])
         
        time = timedelta(hours = b, minutes= m)
        
        fechaHora=datetime(int(fecha[2]),int(fecha[1]),int(fecha[0])) + time
        
        return fechaHora
    
    def getPersona(self):
            
        if " " not in self.linea:
            raise Exception()
    
        a=self.linea.split(":")
        persona = a[1].split("-")[1]
        return persona