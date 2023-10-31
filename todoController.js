const Sequelize = require('sequelize');
const Todo = require('../models/todo');

// CRUD Controllers

//get all Todos
exports.getTodos = (req, res, next) => {
    Todo.findAll({
      where: { 
        deletedAt: null 
      },
      attributes: ['id','title']
    })
        .then(todos => {
            res.status(200).json({ todos: todos });
        })
        .catch(err => console.log(err));
}
const { Op } = Sequelize;
exports.getDelete = (req, res, next) => {
    Todo.findAll({
      where: {
        deletedAt: { 
          [Op.not]: null
        }
      }
    })
      .then(todo => {
        res.status(200).json({ todo: todo });
      })
      .catch(err => console.log(err));
}

//get Todo by id
exports.getTodo = (req, res, next) => {
    const todoId = req.params.todoId;
    Todo.findByPk(todoId)
        .then(todo => {
            if (!todo) {
                return res.status(404).json({ message: 'Todo not found!' });
            }
            res.status(200).json({ todo: todo });
        })
        .catch(err => console.log(err));
}

//create Todo
exports.createTodo = (req, res, next) => {
    const title = req.body.title;
    const description = req.body.description;
    Todo.create({
      title: title,
      description: description
    })
      .then(result => {
        console.log('Created Todo');
        res.status(201).json({
          message: 'Todo created successfully!',
          todo: result
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

exports.softDelete = (req, res) => {
  const todoId = req.params.todoId;
  Todo.findByPk(todoId)
    .then(todo => {
      if (!todo) {
        return res.status(404).json({ message: 'Todo not found!' });
      }
      todo.deletedAt = new Date();
      return todo.save(); // Simpan perubahan
    })
    .then(result => {
      res.status(200).json({ message: 'Todo deleted (soft delete)!' });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'An error occurred' });
    });
}