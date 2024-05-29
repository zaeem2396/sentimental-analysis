const UserAuthController = require('../../controllers/UserAuthController')
const auth = require('../../models/Auth')
const httpMocks = require('node-mocks-http')
const m = require('../../utils/message')

jest.mock('../../models/Auth')

describe('UserAuthController.createUser', () => {
    it('should return 200 and create user response on successful user creation', async () => {
        const req = httpMocks.createRequest({
            method: 'POST',
            url: '/sentimental-analysis/api/user/create',
            body: {
                name: 'John Doe',
                email: 'john.doe@example.com',
                password: 'password123'
            }
        });
        const res = httpMocks.createResponse();

        auth.register.mockResolvedValue({ id: 1, name: 'John Doe', email: 'john.doe@example.com' });

        await UserAuthController.createUser(req, res);

        expect(res.statusCode).toBe(200);
        const data = res._getJSONData();
        expect(data.response).toEqual({ id: 1, name: 'John Doe', email: 'john.doe@example.com' });
    });

    it('should return 409 and an error message on failure', async () => {
        const req = httpMocks.createRequest({
            method: 'POST',
            url: '/sentimental-analysis/api/user/create',
            body: {
                name: 'John Doe',
                email: 'john.doe@example.com',
                password: 'password123'
            }
        });
        const res = httpMocks.createResponse();

        auth.register.mockRejectedValue(new Error(m.user.user_exist));

        await UserAuthController.createUser(req, res);

        expect(res.statusCode).toBe(500);
        const data = res._getJSONData();
        expect(data.message).toBe(m.default.server_error);
        expect(data.error).toBe(`Error: ${m.user.user_exist}`);
    });
});