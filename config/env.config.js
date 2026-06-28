require('dotenv').config();

const envConfig = {
  baseURL: process.env.BASE_URL || 'https://dev.baserahub.com/',
  users: {
    buyer: {
      email: process.env.BUYER_EMAIL || 'rahul.rkt007@gmail.com',
      password: process.env.BUYER_PASSWORD || 'ChangeMe123!'
    },
    seller: {
      email: process.env.SELLER_EMAIL || 'rahul.rkt007@gmail.com',
      password: process.env.SELLER_PASSWORD || 'ChangeMe123!'
    },
    agent: {
      email: process.env.AGENT_EMAIL || 'rahul.rkt007@gmail.com',
      password: process.env.AGENT_PASSWORD || 'ChangeMe123!'
    },
    admin: {
      email: process.env.ADMIN_EMAIL || 'rahul.rkt007@gmail.com',
      password: process.env.ADMIN_PASSWORD || 'ChangeMe123!'
    }
  }
};

module.exports = { envConfig };
