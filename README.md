# Proyecto Web: Whatsapp-Analyzer

Este proyecto tiene como objetivo analizar y visualizar datos de conversaciones de WhatsApp. Utilizando diversas herramientas, este proyecto permite extraer información de los historiales de chat, generando gráficos que faciliten la comprensión de los patrones de comunicación.
  
## Informacion 🚀

- Actualmente no esta implementado para dispositivos android
- En android solo funcionara con los ultimos 100.000 mensajes que son los que exporta por defecto Whatsapp

Para mas informacion sobre como exportar una conversacion visitar la documentacion oficial de [WhatsApp](https://faq.whatsapp.com/1180414079177245/?cms_platform=android&helpref=platform_switcher&locale=ca_ES).

## Comenzando 🚀

Para poder ejecutar el proyecto en tu maquina local se debera clonar el repositorio.

```bash

git clone https://github.com/DavidBuenacasa/Whatsapp-Analyzer.git

```

```docker

npm run preview

```

## Despliegue 📦

Para desplegar la aplicacion en un contenedor docker, se debera crear la imagen mediante el siguiente comando.  

```docker

docker build -t whatsapp-analyzer-image .

```

Ejecutamos la imagen.

```docker

docker run -d -p 8459:3000 --name whatsapp-analyzer --restart always whatsapp-analyzer-image

```


## Autores ✒️

 

*  **David Buenacasa** 

 

## Licencia 📄

Este proyecto está bajo la Licencia ([GNU GPLv3](https://choosealicense.com/licenses/gpl-3.0/)) - mira el archivo [LICENSE](LICENSE.md) para detalles
 

