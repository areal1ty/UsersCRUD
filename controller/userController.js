class UserController {
    constructor(userService) {
        this.userService = userService;
    }

    async getAll(req, res) {
        try {
            const users = await this.userService.getAll();
            res.json(users);
        } catch (error) {
            res.status(500).send('An error occurred while fetching users.');
        }
    }

    async getById(req, res) {
        try {
            const user = await this.userService.getById(req.params.id);
            if (user) {
                res.json(user);
            } else {
                res.status(404).send('User not found. Please try again!');
            }
        } catch (error) {
            res.status(404).send('An error occurred while fetching the user.');
        }
    }

    async create(req, res) {
        try {
            const newUser = await this.userService.create(req.body);
            res.status(201).json(newUser);
        } catch (error) {
            console.error('error creating user:',error)
            res.status(500).send('An error occurred while creating the user.');
        }
    }

    async update(req, res) {
        try {
            const updatedUser = await this.userService.update(req.params.id, req.body);
            if (updatedUser) {
                res.json(updatedUser);
            } else {
                res.status(404).send('User not found. Please try again.');
            }
        } catch (error) {
            res.status(404).send('An error occurred while updating the user.');
        }
    }

    async delete(req, res) {
        try {
            const isSucceed = await this.userService.delete(req.params.id);
            if (isSucceed) {
                res.status(204).send();
            } else {
                res.status(404).send('User not found. Please try again.');
            }
        } catch (error) {
            res.status(500).send('An error occurred while deleting the user.');
        }
    }
}

module.exports = UserController;
