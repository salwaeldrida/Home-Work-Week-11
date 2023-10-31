const Sequelize = require('sequelize');
const db = require('../util/db');

const Todo = db.define('Todo', {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
    },
    isCompleted: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    deletedAt: {
      type: Sequelize.DATE,
    },
  }, {
    hooks: {
      beforeDestroy: (instance, options) => {
        return Todo.update(
          { 
            deletedAt: new Date()
          },
          { 
            where: { id: instance.id },
            individualHooks: true 
          }
        );
      }
    }
  });

module.exports = Todo;
