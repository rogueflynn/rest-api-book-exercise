const request = require('supertest');
const app = require('../app');

describe('/books API', () => {
    it('should return empty array', (done) => {
        request(app)
            .get('/books')
            .set('Accept', 'application/json')
            .expect(200, [], done)
    });
    it('should save "Fight Club" ', (done) => {
        request(app)
            .post('/books')
            .set('Accept', 'application/json')
            .send(
                {
                    "name": "Fight Club",
                    "authors": [ "Chuck Palaniuk" ],
                    "status": "READ"
                }
            )
            .expect(201, {
                message: 'Saved Book'
            },
            done)
    });
    it('should save "How I Became Stupid" ', (done) => {
        request(app)
            .post('/books')
            .set('Accept', 'application/json')
            .send(
                {
                    "name": "How I Became Stupid",
                    "authors": [ "Martin Page" ],
                    "status": "NOT_READ"
                }
            )
            .expect(201, {
                message: 'Saved Book'
            },
            done)
    });
    it('should save "A Clockwork Orange"', (done) => {
        request(app)
            .post('/books')
            .set('Accept', 'application/json')
            .send(
                {
                    "name": "A Clockwork Orange",
                    "authors": [ "Anthony Burgess" ],
                    "status": "READING"
                }
            )
            .expect(201, {
                message: 'Saved Book'
            },
            done)
    });
    it('should not save book if it has already been added', (done) => {
        request(app)
            .post('/books')
            .set('Accept', 'application/json')
            .send(
                {
                    "name": "A Clockwork Orange",
                    "authors": [ "Anthony Burgess" ],
                    "status": "READING"
                }
            )
            .expect(200, {
                message: 'Book has already been added'
            },
            done)
    });
    it('should return all books', (done) => {
        request(app)
            .get('/books')
            .set('Accept', 'application/json')
            .expect(200, 
                [
                {
                    "name": "Fight Club",
                    "authors": [
                    "Chuck Palaniuk"
                    ],
                    "status": "READ",
                    "id": 1
                },
                {
                    "name": "How I Became Stupid",
                    "authors": [
                    "Martin Page"
                    ],
                    "status": "NOT_READ",
                    "id": 2
                },
                {
                    "name": "A Clockwork Orange",
                    "authors": [
                    "Anthony Burgess"
                    ],
                    "status": "READING",
                    "id": 3
                }
                ]
            ,
            done)
    });
    it('should return book by id', (done) => {
        request(app)
            .get('/books/3')
            .set('Accept', 'application/json')
            .expect(200, 
                {
                    "name": "A Clockwork Orange",
                    "authors": [
                    "Anthony Burgess"
                    ],
                    "status": "READING",
                    "id": 3
                },
            done)
    });
    it('should update book id 1', (done) => {
        request(app)
            .put('/books/1')
            .set('Accept', 'application/json')
            .send(
                {
                    "name": "Fight Club",
                    "authors": [ "Chuck Palaniuk" ],
                    "status": "NOT_READ"
                }
            )
            .expect(200, {
                message: 'Updated book'
            },
            done)
    });
    it('should delete book with id 1', (done) => {
        request(app)
            .delete('/books/1')
            .set('Accept', 'application/json')
            .expect(200, { message: "completed" },
            done)
    });
    it('should delete book with id 2', (done) => {
        request(app)
            .delete('/books/2')
            .set('Accept', 'application/json')
            .expect(200, { message: "completed" },
            done)
    });
    it('should delete book with id 3', (done) => {
        request(app)
            .delete('/books/3')
            .set('Accept', 'application/json')
            .expect(200, { message: "completed" },
            done)
    });
});