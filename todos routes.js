const controller = require('../controllers/todoController');
const router = require('express').Router();

// CRUD Routes Todos
router.post('/', controller.createTodo);
router.get('/', controller.getTodos);
router.get('/:todoId', controller.getTodo);
router.get('/delete/all', controller.getDelete);
router.delete('/:todoId', controller.softDelete);

module.exports = router;