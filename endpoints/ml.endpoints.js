const request = require('axios');
const logger = require('../common/logger');
const { returnCommonResponse } = require('../common/common');
const { formatResponse, formatProduct } = require('../helpers/helpers');
const URL = process.env.ML_BASE_API_URL;

const fetchItems = async(query) => {
    logger.info(`Fetching products that match: ${query}`);
    const items_query_url = URL + '/sites/MLA/search';
    let items;
    
    try {
        items = await request.get(items_query_url, {
            params: {
                q: query
            }
        });
        return formatResponse(items.data.results);
    } catch (e) {
        const errorMessage = `Error getting products ${e}`;
        logger.error(errorMessage);
        return returnCommonResponse(res, errorMessage, 500);
    }
};


const fetchItemById = async (id) => {
    logger.info(`Fetching item with id: ${id}`);
    const single_item_url = URL + `/items/${id}`;
    let item;
    
    try {
        item = await request.get(single_item_url);
        return formatProduct(item.data);
    } catch (e) {
        const errorMessage = `Error getting data for product by ID ${e}`;
        logger.error(errorMessage);
        return returnCommonResponse(res, errorMessage, 500);
    }
};

const fetchItemDescriptionById = async (id) => {
    logger.info(`Fetching description for item with id: ${id}`);
    const single_item_url = URL + `/items/${id}/description`;
    let item_description;
    
    try {
        item_description = await request.get(single_item_url);
        return item_description.data.plain_text;
    } catch(e) {
        const errorMessage = `Error getting description for product ${e}`;
        logger.error(errorMessage);
        return returnCommonResponse(res, errorMessage, 500);
    }
}

module.exports = {
    fetchItems,
    fetchItemById,
    fetchItemDescriptionById
}