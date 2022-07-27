import { Card } from '@material-ui/core';
import { CustomButton } from 'components/ui-components';
import React from 'react';
import { useHistory } from 'react-router-dom';

import orderImage from '../../static/order.png';
import { confirmationStyles } from './confirmation-order.css';

export default function ConfirmationOrder() {
    const styles = confirmationStyles();
    const history = useHistory();

    const handleReturnToShop = () => {
        history.push('/tienda')
    }
    return (
        <div className={styles.confirmationContainer}>
            <Card className={styles.cardConfirmation}>
                <img
                    src={orderImage}
                    alt=""
                    className={styles.imageConfirmation}
                ></img>
                <div className={styles.message}>
                    <h1>¡Gracias por tu compra!</h1>
                    <h2>
                        Una vez que nuestro equipo revise y confirme tu pedido, 
                        te enviaremos un correo con los detalles de tu pedido.
                    </h2>
                    <CustomButton
                            title="Regresar a la tienda"
                            onClick={handleReturnToShop}
                            color="deepGreen"
                        ></CustomButton>
                </div>
            </Card>
        </div>
    );
}
