class UserController {

    constructor(userService) {
        this.userService = userService;
    }

    async getAll(req, res) {
        const users = await this.userService.getAll();
        res.json(users);
    }

    async getById(req, res) {
        const user = await this.userService.getById(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).send('User not found. Please try again!')
        }
    }

    async create(req, res) {
        const newUser = await this.userService.create(req.body);
        res.status(201).json(newUser);
    }

    async update(req, res) {
        const updatedUser = await this.userService.update(req.params.id, req.body);
        if (updatedUser) {
            res.json(updatedUser)
        } else {
            res.status(404).send('User not found. Please try again')
        }
    }

    async delete(req, res) {
        const isSucceed = this.userService.delete(req.params.id);
        if (isSucceed) {
            res.status(204).send();
        } else {
            res.status(404).send('User not found. Please try again');
        }
    }
}

module.exports = UserController;