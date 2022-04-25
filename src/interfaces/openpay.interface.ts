export type openpaytransaction ={
        "id": string,
        "authorization": string,
        "operation_type": string,
        "transaction_type": string,
        "status": string,
        "conciliated": boolean,
        "creation_date": string,
        "operation_date": string,
        "description": string,
        "error_message"?: string,
        "order_id"?: string,
        "card": {
            "type": string,
            "brand": string,
            "address": null,
            "card_number": string,
            "holder_name": string,
            "expiration_year": string,
            "expiration_month": string,
            "allows_charges": boolean,
            "allows_payouts": boolean,
            "bank_name": string,
            "points_type": string,
            "points_card": boolean,
            "bank_code": string
        },
        "customer_id": string,
        "amount": number,
        "fee": {
            "amount": number,
            "tax": number,
            "currency": string
        },
        "currency": string,
        "method": string,
        "success": boolean
    }