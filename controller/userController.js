const userService = require('../service/inMemoryUserService')

exports.getAll = (req, res) => {
    const users = userService.getAll();
    res.json(users);
};

exports.getById = (req, res) => {
    const user = userService.getById(req.params.id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).send('User not found. Please try again!')
    }
};

exports.create = (req, res) => {
    const newUser = userService.create(req.body);
    res.status(201).json(newUser);
};

exports.update = (req, res) => {
    const updatedUser = userService.update(req.params.id, req.body);
    if (updatedUser) {
        res.json(updatedUser)
    } else {
        res.status(404).send('User not found. Please try again')
    }
}

exports.delete = (req, res) => {
    const isSucceed = userService.delete(req.params.id);
    if (isSucceed) {
        res.status(204).send();
    } else {
        res.status(404).send('User not found. Please try again');
    }
}