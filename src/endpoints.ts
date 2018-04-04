import * as module from "module";

export interface EndpointsConfiguration {
    storageServiceEndpoint: string;
    resourceApiEndpoint: string;
    pimetrApiEndpoint: string;
    binsEndpoint: string;
}

export const endpoints = module.config() as EndpointsConfiguration;
