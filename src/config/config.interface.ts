export interface ConfigSchema {
    clientId: string;
    clientSecret: string;
    serverEndpoint: string;
    database: DatabaseConfig;
    jwtExpiration: number;
    jwtConstants: string;
    customerServiceFrontendEndpoint: string;
}

export interface DatabaseConfig {
    type: any;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
}
