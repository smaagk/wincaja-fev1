export const creditCardConstants = {
    INCOMPLETEDATA:
        'Es necesario completar todos los datos de la tarjeta de credito',
    METODOPAGONOELECCIONADO: 'Por favor selecciona un método de pago',
    NOADDRESS: 'Por favor selecciona una dirección para entregar el pedido',
    NOALMACEN: 'Por favor selecciona un almacen',
};

export const { REACT_APP_API_URL, REACT_APP_API2_URL } = process.env;

export const ROLES = {
    CLIENT: 'cliente'
}

export const PAYMENT_OPTIONS = {
    PAGO_EN_LINEA: {
        DESCRIPCION: 'Pago en Linea',
        TYPE: 'LINEA'
    },
    PREORDEN: {
        DESCRIPCION: 'Preorden',
        TYPE: 'Preorden'
    }
}
