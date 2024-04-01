export interface ConfigSchema {
    clientId: string;
    clientSecret: string;
    serverEndpoint: string;
    database: DatabaseConfig;
}

export interface DatabaseConfig {
    type: any
    host: string
    port: number
    username: string
    password: string
    database: string
}