export const creditCardConstants = {
    INCOMPLETEDATA:
        'Es necesario completar todos los datos de la tarjeta de credito',
    METODOPAGONOELECCIONADO: 'Por favor selecciona un método de pago',
    NOADDRESS: 'Por favor selecciona una dirección para entregar el pedido',
    NOALMACEN: 'Por favor selecciona un almacen',
};

export const { VITE_API_URL, VITE_API2_URL } = import.meta.env;

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
