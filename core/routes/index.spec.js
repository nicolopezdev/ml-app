const app = require('../index');
const supertest = require('supertest')

describe('API routes', function() {
    let request = null
    let server = null
    
    before(async function(done){
        server = app.listen(done)
        request = supertest.agent(server)
    })
    
    after(async function(done){
        server.close(done)
    })
    
    it('returns hello world', async (done) => {
        const response = await request.get('/api/items?q=iphone');
        expect(response.status).toBe(200);
    });
});
