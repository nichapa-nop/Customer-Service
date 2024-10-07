import * as _ from 'config';
import { ConfigSchema } from './config.interface';

const config: ConfigSchema = {
    serverEndpoint: _.get('serverEndpoint'),
    clientId: _.get('clientId'),
    clientSecret: _.get('clientSecret'),
    database: _.get('database'),
    jwtExpiration: _.get('jwtExpiration'),
    jwtConstants: _.get('jwtConstants'),
    customerServiceFrontendEndpoint: _.get('customerServiceFrontendEndpoint'),
};

function getConfig() {
    return config;
}

export default { getConfig };
