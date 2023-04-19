const request = require('supertest');
const testApp = require('../src/app.ts');

describe('GET /', () => {
    it('should return a 200 response', async () => {
        const response = await request(testApp).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toEqual('Hello World!')
    });
});

describe('POST /getSignedUrl', () => {    
    it('should return a 200 response', async () => {
        const response = await request(testApp).post('/getSignedUrl').send({s3Reference: 'test', fileType: 'image/jpeg'});
        expect(typeof response.body.url).toBe('string');
    });
});
