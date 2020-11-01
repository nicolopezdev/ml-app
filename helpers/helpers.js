const NAME = process.env.SIGNATURE_NAME;
const LASTNAME = process.env.SIGNATURE_LASTNAME;

const formatResponse = (payload) => {
    return payload.map(item => {
        return {
            "author": {
                "name": NAME,
                "lastname": LASTNAME
            },
            "item": {
                "id": item.id,
                "title": item.title,
                "price": {
                    "currency": item.currency_id,
                    "amount": Math.floor(item.price),
                    "decimals": Math.trunc(item.price)
                },
                "picture": item.thumbnail,
                "condition": item.condition,
                "free_shipping": item.shipping.free_shipping,
                "sold_quantity": item.sold_quantity
            }
        }
    });
}

const formatProduct = (product) => {
    return {
        "author": {
            "name": NAME,
            "lastname": LASTNAME
        },
        "item": {
            "id": product.id,
            "title": product.title,
            "price": {
                "currency": product.currency_id,
                "amount": Math.floor(product.price),
                "decimals": Math.trunc(product.price)
            },
            "picture": product.thumbnail,
            "condition": product.condition,
            "free_shipping": product.shipping.free_shipping,
            "sold_quantity": product.sold_quantity
        }
    }
}

module.exports = {
    formatResponse,
    formatProduct
}