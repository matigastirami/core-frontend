import App from '../interfaces/IApp';

export default class AppService {

    constructor() {}

    public async getApp(_id): Promise<App> {
        return {
            code: 'appMock1',
            description: 'appMock1',
            url: 'https://mock1.com'
        }
    }

    public async getApps(): Promise<Array<App>> {
        return [
            {
                code: 'appMock1',
                description: 'appMock1',
                url: 'https://mock1.com'
            },
            {
                code: 'appMock2',
                description: 'appMock2',
                url: 'https://mock2.com'
            }
        ]
    }
}