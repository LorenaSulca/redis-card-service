redis-card-service

Como levantar el proyecto

- npm install (para instalar las dependencias)

- npm run dev (para iniciar en modo desarrollo)

- npm run build (para general build)

- npm run start (para ejecutar build)

- npm run test (para pasar los test unitarios)

Endpoints:

- POST /tokens

  Header: Authorization: PK_TOKEN

  Body:{
  "email": string,
  "card_number": number,
  "cvv": number,
  "expiration_year": string,
  "expiration_month": string
  }

  Uso:

  Se verifican los valores dados según las especificaciones definidas, en caso cumplirlas, guardara la información del body y del PK_Token en redis por un minuto, devolviendo un token jwt con validez de un minuto en caso todo el proceso sea correcto, este token sirve para obtener la información guarda en el endpoint GET /tokens mientras no expire

  Respuestas:

  - status(200){token: string}

    Causa: Los datos de tarjeta se guardaron satisfactoriamente

  - status (401){
    errors: 'Debes incluir un token PK (Authorization) en la cabecera de la petición',
    }

    Causa: No se encuentra  un PK token

  - status (401){
    errors: 'La validacion de datos fallo',
    }

    Causa: Los datos en el body no son validos

  - status (400){
    error: "No se pudo guardar la data"
    }

    Causa: Hubo un problema con el guardado en redis

- GET /Tokens

  Header: Authorization: PK_TOKEN

  Params:{
  token: string
  }

  Uso:

  Se verifica la validez del token, y en caso exista un objeto guardado en redis que fuera generado con ese token vigente, devuelve los valores encontrados especificados en los requerimientos

  Respuestas:

  - status (200){
    "card_number": number,
    "expiration_month": string,
    "expiration_year": string
    }

    Causa: Se obtuvo data correctamente

  - status (401){
    errors: 'Debes incluir un token PK (Authorization) en la cabecera de la petición'
    }

    Causa: No se encuentra  un PK token

  - status (401){
    "type": "TokenExpiredError",
    "message": "jwt expired"
    }

    Causa: El token jwt esta vencido

  - status (200){
    error: "No se encontro data o a expirado"
    }

    Causa: El documento en redis expiro o no existe
