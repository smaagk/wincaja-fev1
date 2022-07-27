export type Cliente = {
    "Clave": number,
    "Nombre": string,
    "Apellido1": string,
    "Apellido2": string,
    "RFC": string,
    "Telefono": string,
    "Email": string,
    "NoPrecio": number,
    "OpenpayClientId": string,
    "WinCliente": string,
    "idUsuario": string
}

export type Direccion = {
    "Alias": string,
    "claveCliente": number,
    "Calle": string,
    "NumeroExterior": string,
    "numeroInterior": string,
    "Colonia": string,
    "Ciudad": string,
    "Estado": string,
    "Pais": string,
    "CodigoPostal": string,
    "Referencias": string
}
