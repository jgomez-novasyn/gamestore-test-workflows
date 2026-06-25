describe('HelloWorld Controller', () => {
  it('GET /hello-world returns Hello World message', async () => {
    const response = await request(app).get('/api/hello-world');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ success: true, data: 'Hello World!' });
  });
});