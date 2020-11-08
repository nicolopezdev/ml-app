const NAME = process.env.SIGNATURE_NAME;
const LASTNAME = process.env.SIGNATURE_LASTNAME;

const formatResponse = (payload, categories) => {
    return payload.map(item => {
        return {
            "author": {
                "name": NAME,
                "lastname": LASTNAME
            },
            "categories": categories,
            "item": {
                "id": item.id,
                "title": item.title,
                "price": {
                    "currency": item.currency_id,
                    "amount": Math.trunc(item.price),
                    "decimals": (item.price - Math.floor(item.price))
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
    const pictures = product.pictures.map(picture => {
        return {
            id: picture.id,
            url: picture.url,
            size: picture.size,
            max_size: picture.max_size
        }
    });

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
                "amount": Math.trunc(product.price),
                "decimals":(product.price - Math.floor(product.price))
            },
            "pictures": pictures,
            "condition": product.condition,
            "free_shipping": product.shipping.free_shipping,
            "sold_quantity": product.sold_quantity
        }
    }
}

const formatCategory = (categories) => {
    return categories.path_from_root.map(category => category.name);
}

module.exports = {
    formatResponse,
    formatProduct,
    formatCategory
}