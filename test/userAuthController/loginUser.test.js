const UserAuthController = require('../../controllers/UserAuthController')
const auth = require('../../models/Auth')
const httpMocks = require('node-mocks-http')
const m = require('../../utils/message')

jest.mock('../../models/Auth')

describe('UserAuthController.loginUser', () => {
    it('should return 200 and login user returning user data along with access token', async () => {
        const req = httpMocks.createRequest({
            method: 'POST',
            url: '/sentimental-analysis/api/user/login',
            body: {
                email: 'test@example.com',
                password: 'XXXXXXXX'
            }
        });
        const res = httpMocks.createResponse();

        auth.login.mockResolvedValue({ access_token: 'jwt-token' });

        await UserAuthController.loginUser(req, res);

        expect(res.statusCode).toEqual(200);
        const data = res._getJSONData();
        expect(data.response).toEqual({ access_token: 'jwt-token' });
    })

    it('should return 401 and an error message on failure', async () => {
        const req = httpMocks.createRequest({
            method: 'POST',
            url: '/sentimental-analysis/api/user/login',
            body: {
                email: 'john.doe@example.com',
                password: 'password123'
            }
        });
        const res = httpMocks.createResponse();

        auth.login.mockRejectedValue(new Error(m.user.password_incorrect));

        await UserAuthController.loginUser(req, res);

        expect(res.statusCode).toBe(500);
        const data = res._getJSONData();
        expect(data.message).toBe(m.default.server_error);
        expect(data.error).toBe(`Error: ${m.user.password_incorrect}`);
    });

    it('should return 404 and an error message on failure', async () => {
        const req = httpMocks.createRequest({
            method: 'POST',
            url: '/sentimental-analysis/api/user/login',
            body: {
                email: 'john.doe@example.com',
                password: 'password123'
            }
        });
        const res = httpMocks.createResponse();

        auth.login.mockRejectedValue(new Error(m.user.user_not_found));

        await UserAuthController.loginUser(req, res);

        expect(res.statusCode).toBe(500);
        const data = res._getJSONData();
        expect(data.message).toBe(m.default.server_error);
        expect(data.error).toBe(`Error: ${m.user.user_not_found}`);
    });

    it('should return 500 and an error message on failure', async () => {
        const req = httpMocks.createRequest({
            method: 'POST',
            url: '/sentimental-analysis/api/user/login',
            body: {
                email: 'john.doe@example.com',
                password: 'password123'
            }
        });
        const res = httpMocks.createResponse();

        auth.login.mockRejectedValue(new Error(m.default.system_error));

        await UserAuthController.loginUser(req, res);

        expect(res.statusCode).toBe(500);
        const data = res._getJSONData();
        expect(data.message).toBe(m.default.server_error);
        expect(data.error).toBe(`Error: ${m.default.system_error}`);
    });
})