import IApp from '../interfaces/IApp';
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

    public async createApp(data: IApp): Promise<any> {
        return {
            result: true,
            data: {
                message: 'App successfully created'
            }
        };
    }

    public async editApp(data: IApp): Promise<any> {
        return {
            result: true,
            data: {
                message: 'App successfully edited'
            }
        };
    }

    public async deleteApp(data: IApp): Promise<any> {
        return {
            result: true,
            data: {
                message: 'App successfully deleted'
            }
        };
    }
}