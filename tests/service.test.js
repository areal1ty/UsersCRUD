const inMemoryService = require('../service/inMemoryUserService');
const dbService = require('../service/dbUserService');

const user1 = {name: 'John Doe', email: 'doe@gmail.com'};
const user2 = {name: 'Jane Doe', email: 'jane@gmail.com'};

describe('User Service Tests', () => {

    const storageImplementations = [
        {name: 'inMemoryService', service: new inMemoryService()},
        {name: 'dbService', service: new dbService()}
    ];

    storageImplementations.forEach(({name, service}) => {

        describe(`${name} implementation`, () => {
            beforeEach(() => {
                service.clear();
            });

            test('getAll should return all users', async () => {
                const createdUser1 = await service.create(user1);
                const createdUser2 = await service.create(user2);

                const users = await service.getAll();
                const plainUsers = users.map(user => ({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                }));

                const expectedUsers = [
                    {id: createdUser1.id, name: createdUser1.name, email: createdUser1.email},
                    {id: createdUser2.id, name: createdUser2.name, email: createdUser2.email}
                ];

                expect(plainUsers).toEqual(expectedUsers);
                expect(plainUsers).toHaveLength(2);
            });

            test('getById should return correct user', async () => {
                const user = await service.create(user1);
                const result = await service.getById(user.id);
                expect(result).toEqual(user);
            });

            test('create should add a new user', async () => {
                const result = await service.create(user1);
                expect(result).toEqual({id: result.id, name: user1.name, email: user1.email});
            });

            test('update should modify an existing user', async () => {
                const user = await service.create(user1);
                const updatedData = {name: 'Doe John', email: 'doedoe@gmail.com'};

                const result = await service.update(user.id, updatedData);
                const editedUser = await service.getById(user.id);
                expect(editedUser.name).toBe(updatedData.name);
                expect(editedUser.email).toBe(updatedData.email);
            });

            test('update should return null if user does not exist', async () => {
                const nonExistingUser = await service.update(999, {name: 'J Doe', email: 'test@gmail.com'});
                expect(nonExistingUser).toBeNull();
            });

            test('delete should remove an existing user', async () => {
                const user = await service.create(user1);
                const result = await service.delete(user.id);
                const undefinedUser = await service.getById(user.id);

                expect(result).toBe(true);
                expect(undefinedUser).toBeUndefined();
            });

            test('delete should return false if user does not exist', async () => {
                const result = await service.delete(999);
                expect(result).toBe(false);
            });
        });
    });
});