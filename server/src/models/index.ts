import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';
import { UserFactory } from './user.js';
import { TicketFactory } from './ticket.js';

const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL, {
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          require: true, // Forces SSL connection
          rejectUnauthorized: false, // Allows self-signed certificates (Render default setup)
        },
      },
      logging: console.log, // Enable logging for debugging
    })
  : new Sequelize(process.env.DB_NAME || '', process.env.DB_USER || '', process.env.DB_PASSWORD, {
      host: 'localhost',
      dialect: 'postgres',
      dialectOptions: {
        decimalNumbers: true,
        ssl: {
          require: true, // Forces SSL connection
          rejectUnauthorized: false, // Allows self-signed certificates (Render default setup)
        },
      },
      logging: console.log, // Enable logging for debugging
    });

const User = UserFactory(sequelize);
const Ticket = TicketFactory(sequelize);

User.hasMany(Ticket, { foreignKey: 'assignedUserId' });
Ticket.belongsTo(User, { foreignKey: 'assignedUserId', as: 'assignedUser' });

export { sequelize, User, Ticket };