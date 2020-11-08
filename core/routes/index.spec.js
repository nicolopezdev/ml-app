const app = require('../index');
const supertest = require('supertest');
const request = supertest(app);

describe('API routes', function() {
    it('should return a list of items matching search query string', async (done) => {
        const response = await request.get('/api/items?q=iphone');
        expect(response.status).toBe(200);
        done();
    });

    it('should fail if no query string is sent', async (done) => {
        const response = await request.get('/api/items?q=');
        expect(response.status).toBe(400);
        expect(response.body.message).toEqual('You have not specified any product to search');
        done();
    });

    it('should support paging', async(done) => {
        const response = await request.get('/api/items?q=iphone&limit=1');
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
        done()
    })
});
