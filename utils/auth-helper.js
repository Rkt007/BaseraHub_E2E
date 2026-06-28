const { envConfig } = require('../config/env.config');

async function loginAs(loginPage, role) {
  const user = envConfig.users[role];
  if (!user) {
    throw new Error(`Unknown role "${role}". Expected buyer, seller, agent, or admin.`);
  }

  await loginPage.goto();
  await loginPage.login(user.email, user.password);
}

module.exports = { loginAs };
