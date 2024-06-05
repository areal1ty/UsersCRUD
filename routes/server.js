const express = require('express');
const UserController = require('../controller/userController');
const router = express.Router();

router.get('/', this.controller.getAll);
router.get('/:id', this.controller.getById);
router.post('/', this.controller.create);
router.put('/:id', this.controller.update);
router.delete('/:id', this.controller.delete);

module.exports = router;

const InMemoryUserService = require('../service/inMemoryUserService');
const dbUserService = require('../service/dbUserService');

const app = express();
app.use(express.json());

/*
Users can choose which storage implementation to use by setting the USE_POSTGRES environment variable before running the application.
for example,
USE_POSTGRES=true node server.js
-> This command sets the USE_POSTGRES environment variable to true, so PostgresUserService will be used.

Using In-Memory Storage:
node server.js
If USE_POSTGRES is not set, the default InMemoryUserService will be used.
*/
const userService = process.env.USE_POSTGRES ? new dbUserService() : new InMemoryUserService();
const controller = new UserController(userService);

app.post('/', (req, res) => controller.create(req, res));
app.get('/', (req, res) => controller.getAll(req, res));
app.get('/:id', (req, res) => controller.getById(req, res));
app.put('/:id', (req, res) => controller.update(req, res));
app.delete('/:id', (req, res) => controller.delete(req, res));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
