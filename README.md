redis-card-service

Como levantar el proyecto

-   npm install 

-   npm run dev (para iniciar en modo desarrollo)

-   npm run build (para general build)

-   npm run start (para ejecutar build)

Endpoints:

-   POST /tokens

Header: Authorization: PK_TOKEN

Body:{
    "email": string,
    "card_number": number,
    "cvv": number,
    "expiration_year": string,
    "expiration_month": string
}

Response:status 200{
    token: string
}

Si no se encuntra un PK token: status 401{
    errors: 'Debes incluir un token PK (Authorization) en la cabecera de la petición',
}

Si los datos en el body no son validos:status 401{
    errors: 'La validacion de datos fallo',
}

Si hubo un problema con el guardado:status 400{ 
    error: "No se pudo guardar la data" 
}

-   GET /Tokens

Header: Authorization: PK_TOKEN

Params:{
    token: string
}

Response:status 200{
    "card_number": number,
    "expiration_month": string,
    "expiration_year": string
}

Si no se encuntra un PK token: status 401{
    errors: 'Debes incluir un token PK (Authorization) en la cabecera de la petición',
}

Si el token jwt esta vencido:status 401{
    "type": "TokenExpiredError",
    "message": "jwt expired"
}

Si el documento en redis expiro o no existe: status 200{ 
    error: "No se encontro data o a expirado" 
}



