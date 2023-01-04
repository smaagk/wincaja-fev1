import { REACT_APP_API2_URL } from 'constants/app.constants';
import useAPI from 'custom-hooks/useAPI';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import '../../../tailwind.css';

function StripeCheckoutButton() {
    const [checkoutData, setCheckoutData] = useState<any>(null);
    const { responseData, error, isLoading } = useAPI(
        `${REACT_APP_API2_URL}/create-checkout-payment`,
        'POST',
        checkoutData
    );
    const cart = useSelector((state: RootState) => state.cart);
    const address = useSelector((state: RootState) => state.address);
    const user = useSelector((state: RootState) => state.auth.user.clientesLinea.Nombre);

    /* handle api response */
    useEffect(() => {
        console.log(responseData);
        if (responseData && responseData.url && isLoading === false) {
            window.location.href = responseData.url;
        }
    }, [responseData]);


    const handleCheckout = () => {
        /* from all array of addresses get the one with the same id as the selected one */
        const selectedAddress = address.addresses.find(
            (addressVal: { alias: string; addressKey: string; }) => addressVal.alias === address.addressKey
        );

        const data = {
            cart,
            address : {
                recipientName: user,
                line1: JSON.stringify(selectedAddress),
            }
        };

        setCheckoutData(data);
    };

    return (
        <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleCheckout}
        >
            Revisar Orden y Pagar
        </button>
    );
}

export default StripeCheckoutButton;
