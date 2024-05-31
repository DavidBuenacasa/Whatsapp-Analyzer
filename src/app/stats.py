from registro_iphone import registro_iphone
from registro import registro
import datetime

class stats:

    #Dentro de la variable numMensajes se guardara la informacion y el tipo de cada mensaje
    """
    Esta lista recogera cuantos mensajes de cada tipo se han enviado, 
    de esta forma los tipos de mensajes y su indice en la lista son los siguientes

        Mensajes de texto--------------- [0]
        Mensajes de Audio--------------- [1]
        Fotos--------------------------- [2]
        Videos-------------------------- [3]
        Stickers------------------------ [4]
        gifs---------------------------- [5]
        Multimedia omitido-------------- [6]

    Al exportar un chat en dispositivos android no sera posible distinguir entre 
    audios,fotos,videos etc... Todo ira englobado en Multimedia omitido
    """ 
    
    """
    
    Para Gestionar los mensajes por meses se ha creado un segundo diccionario que tendra como claves
    los años en los que ha habido conversacion.

    Enero------------------------------ [0]
    Febrero---------------------------- [1]
    Marzo------------------------------ [2]
    Abril------------------------------ [3]
    Mayo------------------------------- [4]
    Junio------------------------------ [5]
    Julio------------------------------ [6]
    Agosto----------------------------- [7]
    Septiembre------------------------- [8]
    octubre---------------------------- [9]
    Noviembre-------------------------- [10]
    Diciembre-------------------------- [11]

    """



    def __init__(self,archivo,opcion):
       
        #Esta lista recogera todas las personas que participan en la conversacion

        #Nombre de la persona----------- [0]
        #numMensajes[] ----------------- [1]

       self.datos = {}

       if opcion == 1:
        self.recorrer_fichero_android(archivo)
       else:
        self.recorrer_fichero_iphone(archivo)

    def recorrer_fichero_android(self,filename):
        with open(filename, 'r', encoding="utf-8") as f:
            next(f)
            for linea in f:   
               try:
                    r = registro(linea)
                    nombre=r.getPersona()

                    if not (nombre in self.datos):
                        self.añadir_persona(nombre)

                    self.clasificar_mensaje(nombre,r.getMensaje())

                    #self.clasificar_tiempo(nombre,r.getFechaHora)
               except:
                   continue 

            print(self.datos) 

    def recorrer_fichero_iphone(self,filename):
        with open(filename, 'r', encoding="utf-8") as f:
            next(f)
            for linea in f:   
               try:
                    linea = linea.encode("ascii","ignore")
                    linea = linea.decode()
                    linea = linea.strip()
                    
                    r = registro_iphone(linea)
                    nombre=r.get_persona()
                    mensaje = r.get_mensaje()
                    fechaHora = r.get_fecha_hora()

                    if not (nombre in self.datos):
                        self.añadir_persona(nombre)

                    self.clasificar_mensahe_iphone(nombre,mensaje)
                    self.clasificar_tiempo(nombre,fechaHora)
                    #print(self.datos)

               except:
                   continue     
            print(self.datos)      
            

    def clasificar_tiempo(self,nombre,date):

        if not (date.year in self.datos[nombre][1]):
            self.datos[nombre][1][date.year] =[0,0,0,0,0,0,0,0,0,0,0,0]
        

        match date.month:

            case 1:
                self.datos[nombre][1][date.year][0] += 1
            case 2:
                self.datos[nombre][1][date.year][1] += 1
            case 3:
                self.datos[nombre][1][date.year][2] += 1
            case 4:
                self.datos[nombre][1][date.year][3] += 1
            case 5:
                self.datos[nombre][1][date.year][4] += 1
            case 6:
                self.datos[nombre][1][date.year][5] += 1
            case 7:
                self.datos[nombre][1][date.year][6] += 1
            case 8:
                self.datos[nombre][1][date.year][7] += 1
            case 9:
                self.datos[nombre][1][date.year][8] += 1
            case 10:
                self.datos[nombre][1][date.year][9] += 1
            case 11:
                self.datos[nombre][1][date.year][10] += 1
            case 12:
                self.datos[nombre][1][date.year][11] += 1

            
    def clasificar_mensaje(self,nombre,mensaje):

        if mensaje.strip() == "<Multimedia omitido>":
            self.datos[nombre][0][6] += 1
        elif mensaje.strip() == "sticker omitido":
            self.datos[nombre][0][4] += 1
        elif mensaje.strip() == "imagen omitida":
            self.datos[nombre][0][2] += 1
        elif mensaje.strip() == "Video omitido":
            self.datos[nombre][0][3] += 1
        else:
            self.datos[nombre][0][0] += 1

    def clasificar_mensahe_iphone(self,nombre,mensaje):
        
        if mensaje == "sticker omitido":
            self.datos[nombre][0][4] += 1
        elif mensaje == "imagen omitida":
            self.datos[nombre][0][2] += 1
        elif mensaje == "Video omitido":
            self.datos[nombre][0][3] += 1
        elif mensaje == "audio omitido":
            self.datos[nombre][0][1] += 1
        else:
            self.datos[nombre][0][0] += 1

        
    
    def añadir_persona(self,nombre):

        numMensajes = [0,0,0,0,0,0,0]
        meses={}
        
        info=[numMensajes,meses]

        self.datos[nombre] = info

        
            



        









