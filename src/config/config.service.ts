import * as _ from 'config';
import { ConfigSchema } from './config.interface';

const config: ConfigSchema = {
    serverEndpoint: _.get('serverEndpoint'),
    clientId: _.get('clientId'),
    clientSecret: _.get('clientSecret'),
    database: _.get('database')
};

function updateConfig() { }

function getConfig() {
    return config;
}

export default { getConfig };
