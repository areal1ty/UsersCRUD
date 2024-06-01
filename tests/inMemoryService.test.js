const userService = require('../service/inMemoryUserService');
const User = require('../model/user');

const user1 = {name: 'John Doe', email: 'doe@gmail.com'};
const user2 = {name: 'Jane Doe', email: 'jane@gmail.com'};

describe('User Service', () => {
    beforeEach(() => {
        let users = [];
        let idCounter = 1;
    });

    test('getAll should return all users', () => {
        userService.create(user1);
        userService.create(user2);

        expect(userService.getAll()).toEqual([user1, user2]);
        expect(userService.getAll().length).toEqual(2);
    });

    test('getById should return correct user', () => {
        userService.create(user1);
        expect(userService.getById(user1.id)).toEqual(user1);
    });

    test('create should add a new user', () => {
        const result = userService.create(user1);
        expect(result).toEqual(new User(result.id, user1.name, user1.email));
        expect(userService.getAll()).toContainEqual(result);
    });

test('update should modify an existing user', () => {
    const user = userService.create(user1);
    const updatedData = {name: 'Doe John', email: 'doedoe@gmail.com'};

    const result = userService.update(user.id, updatedData);

    expect(result.name).toBe(updatedData.name);
    expect(result.email).toBe(updatedData.email);
    expect(userService.getById(user.id)).toEqual(result);
});

test('update should return null if user does not exist', () => {
    expect(userService.update(999, {name: 'J Doe', email: 'test@gmail.com'})).toBeNull();
});

test('delete should remove an existing user', () => {
    const user = userService.create(user1);
    const result = userService.delete(user.id);

    expect(result).toBe(true);
    expect(userService.getById(user.id)).toBeUndefined();
});

test('delete should return false if user does not exist', () => {
    expect(userService.delete(999)).toBe(false);
});

});