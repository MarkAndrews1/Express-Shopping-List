const express = require('express');
const supertest = require('supertest');
const Item = require('../itemClass');
const router = require('../routes/items')

const app = express();
app.use(express.json());
app.use('/', router);

describe('Item API endpoints', () => {
  test('GET /items - should return all items', async () => {

    Item.listAll = jest.fn(() => [{ name: 'Item 1', price: 10 }, { name: 'Item 2', price: 20 }]);

    const response = await supertest(app).get('/');

    expect(response.statusCode).toBe(200);
    expect(response.body.items).toHaveLength(2);
  });

  test('POST /items - should create a new item', async () => {
    const newItem = { name: 'New Item', price: 30 };

    const response = await supertest(app)
      .post('/')
      .send(newItem);

    expect(response.statusCode).toBe(200);
  });

  test('GET /items/:name - should return a specific item', async () => {

    Item.findItem = jest.fn(name => ({ name, price: 50 }));

    const response = await supertest(app).get('/New%20Item');

    expect(response.statusCode).toBe(200);
    expect(response.body.item).toEqual({ name: 'New Item', price: 50 });
  });

  test('PATCH /items/:name - should update an existing item', async () => {

    Item.updateItem = jest.fn(name => ({ name, price: 100 }));

    const response = await supertest(app).patch('/New%20Item');

    expect(response.statusCode).toBe(200);
    expect(response.body.item).toEqual({ name: 'New Item', price: 100 });
  });

  test('DELETE /items/:name - should delete an existing item', async () => {

    Item.delete = jest.fn();

    const response = await supertest(app).delete('/New%20Item');

    expect(response.statusCode).toBe(200);
    expect(response.body.msg).toBe('Item deleted');
  });
});
