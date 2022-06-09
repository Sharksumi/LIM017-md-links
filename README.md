
# MD Links

Este proyecto es una librería que se encuentra en NPM, con la cual se puede leer los enlaces de archivos Markdown. 
La libreria no solo detecta los enlaces, tambien determina estadísticas generales y valida la respuesta  HTTP de los mismos.

## Features

- La aplicación se inicia con el comando **md-links**.
La sintaxis es la siguiente: 

    md-links <path> [options]

Ex:

    md-links carpetaMD --validate

Las opciones disponibles son las siguientes: 

    -- Validate : Valida la respuesta HTTP de los enlaces encontrados en los documentos MD
                 Las respuestas serán las siguientes:
                    • Status: 200 / 404 / 203 / etc 
                    •ok: ok / fail

    --Stats:    Esta opción muestra estadísticas que incluyen lo siguiente:
                • Total : es el total de links en la ruta proporcionada
                • Unicos: son la cantidad de links únicos de la ruta.
    
    -- Validate --Stats : Esta opción muestra las estadísticas más completas:
                • Total
                • Unicos
                • Broken: enlaces que tienen respuesta 404 
## Historias de Usuario
- Historia de usuario 1 
Se creo un diagrama de flujo para representar los procesos necesarios de la aplicación.

-![Diagrama de Flujo](https://github.com/Sharksumi/LIM017-md-links/blob/main/img/MD%20Links%20Fixed%20-Page-1.drawio.png)

- Historia de usuario 2
Se creo la función recursiva, se logró entrar a directorios, identificar que archivos eran MD y cuales no, se extrae el contenido de los archivos. 
Luego de extraer el contenido se detecta si son links o no. 

- Historia de Usuario 3 
Se crearon las opciones para el CLI, 
 |- Validate: Esta opción valida si los enlaces funcionan o no. 
 |- Stats: Esta opción identifica y categoriza la cantidad de enlaces, totales, únicos y rotos. 

 Se implementó el CLI al proyecto. 
 
  
## Usuarios
Los usuarios de esta aplicación son desarrolladores que quieran hacer un conteo fácil  de los links que se encuentran en sus archivos MD. De esta forma se puede mejorar y facilitar la organización, el orden y la actualización de los repositorios, conando con una herramienta que te permite identificar los enlaces rotos. 
## Lecciones aprendidas

En este proyecto se aprendio los conceptos de crear una librería desde cero, configurar nuestro ambiente de trabajo, algunas funcionalidades que se encuentran en el backend.
Se perfeccionó el uso de flujogramas para plantear visualizaciones acertadas para el roadmap del proyecto. 
Se aprendió sobre promesas. 
Además, se aprendió y realizó una linea de comando CLI, aplicable para otros desarrolladores. 

Se adjunta un enlace con los requerimientos y parendizajes del proyecto detallados.

[Documentación y requerimiento del proyecto](https://github.com/Sharksumi/LIM017-md-links/blob/main/documentation.md)


## Autora

- [@Nay Trevejo](https://github.com/Sharksumi)

