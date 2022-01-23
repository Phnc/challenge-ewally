const request = require("supertest");
const express = require("express");

const app = express();
app.set('port', process.env.PORT || 8080);


describe('routes test', () => {
    test('invalid route returns 404', done => {
        request(app).get('/invalid-route').expect(404);
        done();
    });

    test('valid bank slip returns 200', done => {
        request(app).get(`/boleto/21290001192110001210904475617405975870000002000`).expect(200);
        done();
    });

    test('invalid bank slip returns 400', done => {
        request(app).get(`/boleto/aaaa`).expect(400);

        done();
    });
});
