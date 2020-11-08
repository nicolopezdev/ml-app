const request = require('axios');
const logger = require('../common/logger');
const { formatResponse, formatProduct, formatCategory } = require('../helpers/helpers');
const URL = process.env.ML_BASE_API_URL;

const fetchItems = async(query, limit, offset) => {
    logger.info(`Fetching products that match: ${query} with limit: ${limit ? limit: 'NO LIMIT'}, and offset ${offset ? offset : 'NO OFFSET'}`);
    const items_query_url = URL + '/sites/MLA/search';
    let items;

    
    try {
        items = await request.get(items_query_url, {
            params: {
                q: query,
                limit: limit,
                offset: offset
            }
        });
    } catch (e) {
        const errorMessage = `${e.response.data.message}`;
        logger.error(errorMessage);
        throw Error(errorMessage);
    }

    if (items.data.results.length > 0) {
        const category = await fetchCategoryById(items.data.results[0].category_id);
        return formatResponse(items.data, category);
    }

    return items.data.results;
};


const fetchItemById = async (id) => {
    logger.info(`Fetching item with id: ${id}`);
    const single_item_url = URL + `/items/${id}`;
    
    try {
        const item = await request.get(single_item_url);
        return formatProduct(item.data);
    } catch (e) {
        const errorMessage = `Error getting data for product by ID ${e}`;
        logger.error(errorMessage);
        throw Error(errorMessage);
    }
};

const fetchItemDescriptionById = async (id) => {
    logger.info(`Fetching description for item with id: ${id}`);
    const single_item_url = URL + `/items/${id}/description`;
    
    try {
        const item_description = await request.get(single_item_url);
        return item_description.data.plain_text;
    } catch(e) {
        const errorMessage = `Error getting description for product ${e}`;
        logger.error(errorMessage);
        throw Error(errorMessage);
    }
};

const fetchCategoryById = async (id) => {
    logger.info(`Fetching category data for ID: ${id}`);
    const category_url = URL + `/categories/${id}`;

    try {
        category_data = await request.get(category_url);
        return formatCategory(category_data.data);
    } catch(e) {
        const errorMessage = `Error getting category by ID ${e}`;
        logger.error(errorMessage);
    }
}

module.exports = {
    fetchItems,
    fetchItemById,
    fetchItemDescriptionById,
    fetchCategoryById
}