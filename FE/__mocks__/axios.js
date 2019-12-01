const axios = {
    get: jest.fn(() => Promise.resolve({ data:[{test: 'test'}] })),
    post: jest.fn(() => Promise.resolve({ data:[{test: 'test'}] })),
    delete: jest.fn(() => Promise.resolve({ data:[{test: 'test'}] })),
  };
  
module.exports = axios;