export namespace testJson {
    const swagger: string;
    namespace info {
        const version: string;
        const title: string;
    }
    const host: string;
    const basePath: string;
    const tags: {
        name: string;
        description: string;
    }[];
    const schemes: string[];
    const produces: string[];
    const paths: {
        "/api/v1/accounts/login": {
            post: {
                tags: string[];
                summary: string;
                operationId: string;
                consumes: string[];
                parameters: {
                    in: string;
                    name: string;
                    description: string;
                    required: boolean;
                    schema: {
                        $ref: string;
                    };
                }[];
                responses: {
                    "200": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                    "400": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                    "401": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                    "403": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                    "500": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                };
                deprecated: boolean;
            };
        };
        "/api/v1/accounts/logout": {
            get: {
                tags: string[];
                summary: string;
                operationId: string;
                responses: {
                    "200": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                    "401": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                    "500": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                };
                security: {
                    "Token Access": never[];
                }[];
                deprecated: boolean;
            };
        };
        "/api/v1/accounts/register": {
            post: {
                tags: string[];
                summary: string;
                operationId: string;
                consumes: string[];
                parameters: {
                    in: string;
                    name: string;
                    description: string;
                    required: boolean;
                    schema: {
                        $ref: string;
                    };
                }[];
                responses: {
                    "200": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                    "400": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                    "500": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                };
                deprecated: boolean;
            };
        };
        "/api/v1/accounts/restore": {
            post: {
                tags: string[];
                summary: string;
                operationId: string;
                consumes: string[];
                parameters: {
                    in: string;
                    name: string;
                    description: string;
                    required: boolean;
                    schema: {
                        type: string;
                    };
                }[];
                responses: {
                    "200": {
                        description: string;
                        schema: {
                            type: string;
                        };
                    };
                };
                security: {
                    "Token Access": never[];
                }[];
                deprecated: boolean;
            };
        };
        "/api/v1/admin/register": {
            post: {
                tags: string[];
                summary: string;
                operationId: string;
                consumes: string[];
                parameters: {
                    in: string;
                    name: string;
                    description: string;
                    required: boolean;
                    schema: {
                        $ref: string;
                    };
                }[];
                responses: {
                    "200": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                    "400": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                    "401": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                };
                security: {
                    "Token Access": never[];
                }[];
                deprecated: boolean;
            };
        };
        "/api/v1/export/audit.xlsx": {
            get: {
                tags: string[];
                summary: string;
                operationId: string;
                produces: string[];
                responses: {
                    "200": {
                        description: string;
                        schema: {
                            type: string;
                            format: string;
                        };
                    };
                    "401": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                    "403": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                    "500": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                };
                security: {
                    "Token Access": never[];
                }[];
                deprecated: boolean;
            };
        };
        "/api/v1/export/track-event": {
            post: {
                tags: string[];
                summary: string;
                operationId: string;
                consumes: string[];
                parameters: {
                    in: string;
                    name: string;
                    description: string;
                    required: boolean;
                    schema: {
                        $ref: string;
                    };
                }[];
                responses: {
                    "200": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                    "401": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                    "403": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                    "500": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                };
                security: {
                    "Token Access": never[];
                }[];
                deprecated: boolean;
            };
        };
        "/api/v1/notations/element/types": {
            get: {
                tags: string[];
                summary: string;
                operationId: string;
                responses: {
                    "200": {
                        description: string;
                        schema: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                        };
                    };
                };
                security: {
                    "Token Access": never[];
                }[];
                deprecated: boolean;
            };
        };
        "/api/v1/notations/element/{id}/unique-values": {
            get: {
                tags: string[];
                summary: string;
                operationId: string;
                parameters: {
                    name: string;
                    in: string;
                    description: string;
                    required: boolean;
                    type: string;
                    format: string;
                }[];
                responses: {
                    "200": {
                        description: string;
                        schema: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                        };
                    };
                    "400": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                    "401": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                    "500": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                };
                security: {
                    "Token Access": never[];
                }[];
                deprecated: boolean;
            };
        };
        "/api/v1/notations/list": {
            get: {
                tags: string[];
                summary: string;
                operationId: string;
                responses: {
                    "200": {
                        description: string;
                        schema: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                        };
                    };
                    "400": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                    "401": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                    "500": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                };
                security: {
                    "Token Access": never[];
                }[];
                deprecated: boolean;
            };
        };
        "/api/v1/notations/{id}": {
            get: {
                tags: string[];
                summary: string;
                operationId: string;
                parameters: {
                    name: string;
                    in: string;
                    description: string;
                    required: boolean;
                    type: string;
                    format: string;
                }[];
                responses: {
                    "200": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                    "400": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                    "401": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                    "500": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                };
                security: {
                    "Token Access": never[];
                }[];
                deprecated: boolean;
            };
        };
        "/api/v1/notations/{id}/elements": {
            get: {
                tags: string[];
                summary: string;
                operationId: string;
                parameters: {
                    name: string;
                    in: string;
                    description: string;
                    required: boolean;
                    type: string;
                    format: string;
                }[];
                responses: {
                    "200": {
                        description: string;
                        schema: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                        };
                    };
                };
                deprecated: boolean;
            };
        };
        "/api/v1/notations/{id}/remove": {
            delete: {
                tags: string[];
                summary: string;
                operationId: string;
                parameters: {
                    name: string;
                    in: string;
                    description: string;
                    required: boolean;
                    type: string;
                    format: string;
                }[];
                responses: {
                    "200": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                    "400": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                    "401": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                    "500": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                };
                security: {
                    "Token Access": never[];
                }[];
                deprecated: boolean;
            };
        };
        "/api/v1/notations/{id}/update": {
            post: {
                tags: string[];
                summary: string;
                operationId: string;
                consumes: string[];
                parameters: ({
                    name: string;
                    in: string;
                    description: string;
                    required: boolean;
                    type: string;
                    format: string;
                    schema?: undefined;
                } | {
                    in: string;
                    name: string;
                    description: string;
                    required: boolean;
                    schema: {
                        $ref: string;
                    };
                    type?: undefined;
                    format?: undefined;
                })[];
                responses: {
                    "200": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                    "400": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                    "401": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                    "500": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                };
                security: {
                    "Token Access": never[];
                }[];
                deprecated: boolean;
            };
        };
        "/api/v1/researches/create": {
            post: {
                tags: string[];
                summary: string;
                operationId: string;
                consumes: string[];
                parameters: ({
                    name: string;
                    in: string;
                    description: string;
                    required: boolean;
                    type: string;
                    "x-example": string;
                } | {
                    name: string;
                    in: string;
                    description: string;
                    required: boolean;
                    type: string;
                    "x-example"?: undefined;
                })[];
                responses: {
                    "200": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                    "400": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                    "401": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                    "500": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                };
                security: {
                    "Token Access": never[];
                }[];
                deprecated: boolean;
            };
        };
        "/api/v1/researches/list": {
            get: {
                tags: string[];
                summary: string;
                operationId: string;
                responses: {
                    "200": {
                        description: string;
                        schema: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                        };
                    };
                    "400": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                    "401": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                    "500": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                };
                security: {
                    "Token Access": never[];
                }[];
                deprecated: boolean;
            };
        };
        "/api/v1/researches/{id}": {
            get: {
                tags: string[];
                summary: string;
                operationId: string;
                parameters: {
                    name: string;
                    in: string;
                    description: string;
                    required: boolean;
                    type: string;
                    format: string;
                }[];
                responses: {
                    "200": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                };
                security: {
                    "Token Access": never[];
                }[];
                deprecated: boolean;
            };
        };
        "/api/v1/researches/{id}/ml/analysis": {
            get: {
                tags: string[];
                summary: string;
                operationId: string;
                parameters: {
                    name: string;
                    in: string;
                    description: string;
                    required: boolean;
                    type: string;
                    format: string;
                }[];
                responses: {
                    "200": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                };
                security: {
                    "Token Access": never[];
                }[];
                deprecated: boolean;
            };
            post: {
                tags: string[];
                summary: string;
                operationId: string;
                consumes: string[];
                parameters: ({
                    in: string;
                    name: string;
                    description: string;
                    required: boolean;
                    schema: {
                        $ref: string;
                    };
                    type?: undefined;
                    format?: undefined;
                } | {
                    name: string;
                    in: string;
                    description: string;
                    required: boolean;
                    type: string;
                    format: string;
                    schema?: undefined;
                })[];
                responses: {
                    "200": {
                        description: string;
                        schema: {
                            type: string;
                            format: string;
                        };
                    };
                };
                security: {
                    "Token Access": never[];
                }[];
                deprecated: boolean;
            };
        };
        "/api/v1/researches/{id}/ml/analysis/check": {
            get: {
                tags: string[];
                summary: string;
                operationId: string;
                parameters: {
                    name: string;
                    in: string;
                    description: string;
                    required: boolean;
                    type: string;
                    format: string;
                }[];
                responses: {
                    "200": {
                        description: string;
                        schema: {
                            type: string;
                            enum: string[];
                        };
                    };
                };
                security: {
                    "Token Access": never[];
                }[];
                deprecated: boolean;
            };
        };
        "/api/v1/researches/{id}/ml/text": {
            get: {
                tags: string[];
                summary: string;
                operationId: string;
                parameters: {
                    name: string;
                    in: string;
                    description: string;
                    required: boolean;
                    type: string;
                    format: string;
                }[];
                responses: {
                    "200": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                    "400": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                    "401": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                    "500": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                };
                security: {
                    "Token Access": never[];
                }[];
                deprecated: boolean;
            };
            post: {
                tags: string[];
                summary: string;
                operationId: string;
                consumes: string[];
                parameters: ({
                    name: string;
                    in: string;
                    description: string;
                    required: boolean;
                    type: string;
                    format: string;
                    schema?: undefined;
                } | {
                    in: string;
                    name: string;
                    description: string;
                    required: boolean;
                    schema: {
                        $ref: string;
                    };
                    type?: undefined;
                    format?: undefined;
                })[];
                responses: {
                    "200": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                    "400": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                    "401": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                    "500": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                };
                security: {
                    "Token Access": never[];
                }[];
                deprecated: boolean;
            };
        };
        "/api/v1/researches/{id}/ml/text/check": {
            get: {
                tags: string[];
                summary: string;
                operationId: string;
                parameters: {
                    name: string;
                    in: string;
                    description: string;
                    required: boolean;
                    type: string;
                    format: string;
                }[];
                responses: {
                    "200": {
                        description: string;
                        schema: {
                            type: string;
                            enum: string[];
                        };
                    };
                    "400": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                    "401": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                    "500": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                };
                security: {
                    "Token Access": never[];
                }[];
                deprecated: boolean;
            };
        };
        "/api/v1/researches/{id}/remove": {
            delete: {
                tags: string[];
                summary: string;
                operationId: string;
                parameters: {
                    name: string;
                    in: string;
                    description: string;
                    required: boolean;
                    type: string;
                    format: string;
                }[];
                responses: {
                    "200": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                    "400": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                    "401": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                    "500": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                };
                security: {
                    "Token Access": never[];
                }[];
                deprecated: boolean;
            };
        };
        "/api/v1/researches/{id}/update": {
            post: {
                tags: string[];
                summary: string;
                operationId: string;
                consumes: string[];
                parameters: ({
                    name: string;
                    in: string;
                    description: string;
                    required: boolean;
                    type: string;
                    format: string;
                    schema?: undefined;
                } | {
                    in: string;
                    name: string;
                    description: string;
                    required: boolean;
                    schema: {
                        $ref: string;
                    };
                    type?: undefined;
                    format?: undefined;
                })[];
                responses: {
                    "200": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                    "400": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                    "401": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                    "500": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                };
                security: {
                    "Token Access": never[];
                }[];
                deprecated: boolean;
            };
        };
        "/api/v1/researches/{researchId}/dashboards": {
            get: {
                tags: string[];
                summary: string;
                operationId: string;
                parameters: {
                    name: string;
                    in: string;
                    description: string;
                    required: boolean;
                    type: string;
                    format: string;
                }[];
                responses: {
                    "200": {
                        description: string;
                        schema: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                        };
                    };
                    "400": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                    "401": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                };
                security: {
                    "Token Access": never[];
                }[];
                deprecated: boolean;
            };
            post: {
                tags: string[];
                summary: string;
                operationId: string;
                consumes: string[];
                parameters: ({
                    in: string;
                    name: string;
                    description: string;
                    required: boolean;
                    schema: {
                        $ref: string;
                    };
                    type?: undefined;
                    format?: undefined;
                } | {
                    name: string;
                    in: string;
                    description: string;
                    required: boolean;
                    type: string;
                    format: string;
                    schema?: undefined;
                })[];
                responses: {
                    "200": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                    "400": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                    "401": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                    "500": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                };
                security: {
                    "Token Access": never[];
                }[];
                deprecated: boolean;
            };
        };
        "/api/v1/researches/{researchId}/dashboards/panel": {
            get: {
                tags: string[];
                summary: string;
                operationId: string;
                parameters: {
                    name: string;
                    in: string;
                    description: string;
                    required: boolean;
                    type: string;
                    format: string;
                }[];
                responses: {
                    "200": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                    "401": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                };
                security: {
                    "Token Access": never[];
                }[];
                deprecated: boolean;
            };
        };
        "/api/v1/researches/{researchId}/dashboards/{dashboardId}": {
            delete: {
                tags: string[];
                summary: string;
                operationId: string;
                parameters: {
                    name: string;
                    in: string;
                    description: string;
                    required: boolean;
                    type: string;
                    format: string;
                }[];
                responses: {
                    "200": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                    "400": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                    "401": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                };
                security: {
                    "Token Access": never[];
                }[];
                deprecated: boolean;
            };
        };
        "/api/v1/researches/{researchId}/dashboards/{dashboardId}/rename": {
            post: {
                tags: string[];
                summary: string;
                operationId: string;
                consumes: string[];
                parameters: ({
                    in: string;
                    name: string;
                    description: string;
                    required: boolean;
                    schema: {
                        type: string;
                        items: {
                            $ref: string;
                        };
                    };
                    type?: undefined;
                    format?: undefined;
                } | {
                    name: string;
                    in: string;
                    description: string;
                    required: boolean;
                    type: string;
                    format: string;
                    schema?: undefined;
                })[];
                responses: {
                    "200": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                    "400": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                    "401": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                };
                security: {
                    "Token Access": never[];
                }[];
                deprecated: boolean;
            };
        };
    };
    const securityDefinitions: {
        "Token Access": {
            type: string;
            name: string;
            in: string;
        };
    };
    namespace definitions {
        namespace AggregateMethod {
            export const type: string;
            export const required: string[];
            export namespace properties {
                namespace alias {
                    const type_1: string;
                    export { type_1 as type };
                    export const example: string;
                    export const description: string;
                }
                namespace id {
                    const type_2: string;
                    export { type_2 as type };
                    export const format: string;
                    const example_1: number;
                    export { example_1 as example };
                    const description_1: string;
                    export { description_1 as description };
                }
                namespace name {
                    const type_3: string;
                    export { type_3 as type };
                    const example_2: string;
                    export { example_2 as example };
                    const description_2: string;
                    export { description_2 as description };
                    const _enum: string[];
                    export { _enum as enum };
                }
            }
            const title_1: string;
            export { title_1 as title };
        }
        namespace AnalysisRequest {
            const type_4: string;
            export { type_4 as type };
            const required_1: string[];
            export { required_1 as required };
            export namespace properties_1 {
                namespace expertMode {
                    const description_3: string;
                    export { description_3 as description };
                    export const $ref: string;
                }
                namespace filterSelectedValues {
                    const type_5: string;
                    export { type_5 as type };
                    const description_4: string;
                    export { description_4 as description };
                    export namespace items {
                        const type_6: string;
                        export { type_6 as type };
                        const format_1: string;
                        export { format_1 as format };
                    }
                }
                namespace interpretation {
                    const type_7: string;
                    export { type_7 as type };
                    const description_5: string;
                    export { description_5 as description };
                    const _enum_1: string[];
                    export { _enum_1 as enum };
                }
                namespace maxWaitTime {
                    const type_8: string;
                    export { type_8 as type };
                    const format_2: string;
                    export { format_2 as format };
                    const example_3: number;
                    export { example_3 as example };
                    const description_6: string;
                    export { description_6 as description };
                }
                namespace mlAlgorithm {
                    const type_9: string;
                    export { type_9 as type };
                    const description_7: string;
                    export { description_7 as description };
                    const _enum_2: string[];
                    export { _enum_2 as enum };
                }
                namespace mlKeysRequest {
                    const description_8: string;
                    export { description_8 as description };
                    const $ref_1: string;
                    export { $ref_1 as $ref };
                }
            }
            export { properties_1 as properties };
            const title_2: string;
            export { title_2 as title };
            const description_9: string;
            export { description_9 as description };
        }
        namespace AnalysisResponse {
            const type_10: string;
            export { type_10 as type };
            const required_2: string[];
            export { required_2 as required };
            export namespace properties_2 {
                export namespace data {
                    const description_10: string;
                    export { description_10 as description };
                    const $ref_2: string;
                    export { $ref_2 as $ref };
                }
                export namespace errorMessage {
                    const type_11: string;
                    export { type_11 as type };
                    const description_11: string;
                    export { description_11 as description };
                }
                export namespace expertMode_1 {
                    const description_12: string;
                    export { description_12 as description };
                    const $ref_3: string;
                    export { $ref_3 as $ref };
                }
                export { expertMode_1 as expertMode };
                export namespace filterSelectedValues_1 {
                    const type_12: string;
                    export { type_12 as type };
                    const description_13: string;
                    export { description_13 as description };
                    export namespace items_1 {
                        const type_13: string;
                        export { type_13 as type };
                        const format_3: string;
                        export { format_3 as format };
                    }
                    export { items_1 as items };
                }
                export { filterSelectedValues_1 as filterSelectedValues };
                export namespace id_1 {
                    const type_14: string;
                    export { type_14 as type };
                    const format_4: string;
                    export { format_4 as format };
                    const example_4: number;
                    export { example_4 as example };
                    const description_14: string;
                    export { description_14 as description };
                }
                export { id_1 as id };
                export namespace interpretation_1 {
                    const type_15: string;
                    export { type_15 as type };
                    const description_15: string;
                    export { description_15 as description };
                    export namespace items_2 {
                        const $ref_4: string;
                        export { $ref_4 as $ref };
                    }
                    export { items_2 as items };
                }
                export { interpretation_1 as interpretation };
                export namespace maxWaitTime_1 {
                    const type_16: string;
                    export { type_16 as type };
                    const format_5: string;
                    export { format_5 as format };
                    const example_5: number;
                    export { example_5 as example };
                    const description_16: string;
                    export { description_16 as description };
                }
                export { maxWaitTime_1 as maxWaitTime };
                export namespace mlAlgorithm_1 {
                    const type_17: string;
                    export { type_17 as type };
                    const description_17: string;
                    export { description_17 as description };
                    export namespace items_3 {
                        const $ref_5: string;
                        export { $ref_5 as $ref };
                    }
                    export { items_3 as items };
                }
                export { mlAlgorithm_1 as mlAlgorithm };
                export namespace mlKeysResponse {
                    const description_18: string;
                    export { description_18 as description };
                    const $ref_6: string;
                    export { $ref_6 as $ref };
                }
                export namespace params {
                    const type_18: string;
                    export { type_18 as type };
                    const description_19: string;
                    export { description_19 as description };
                    export namespace items_4 {
                        const $ref_7: string;
                        export { $ref_7 as $ref };
                    }
                    export { items_4 as items };
                }
                export namespace selectedAlgorithm {
                    const description_20: string;
                    export { description_20 as description };
                    const $ref_8: string;
                    export { $ref_8 as $ref };
                }
                export namespace selectedInterpretation {
                    const description_21: string;
                    export { description_21 as description };
                    const $ref_9: string;
                    export { $ref_9 as $ref };
                }
                export namespace status {
                    const type_19: string;
                    export { type_19 as type };
                    const description_22: string;
                    export { description_22 as description };
                    const _enum_3: string[];
                    export { _enum_3 as enum };
                }
            }
            export { properties_2 as properties };
            const title_3: string;
            export { title_3 as title };
            const description_23: string;
            export { description_23 as description };
        }
        namespace AuthRequest {
            const type_20: string;
            export { type_20 as type };
            const required_3: string[];
            export { required_3 as required };
            export namespace properties_3 {
                namespace login {
                    const type_21: string;
                    export { type_21 as type };
                    const example_6: string;
                    export { example_6 as example };
                    const description_24: string;
                    export { description_24 as description };
                }
                namespace password {
                    const type_22: string;
                    export { type_22 as type };
                    const example_7: number;
                    export { example_7 as example };
                    const description_25: string;
                    export { description_25 as description };
                }
            }
            export { properties_3 as properties };
            const title_4: string;
            export { title_4 as title };
            const description_26: string;
            export { description_26 as description };
        }
        namespace AuthResponse {
            const type_23: string;
            export { type_23 as type };
            const required_4: string[];
            export { required_4 as required };
            export namespace properties_4 {
                export namespace login_1 {
                    const type_24: string;
                    export { type_24 as type };
                    const example_8: string;
                    export { example_8 as example };
                    const description_27: string;
                    export { description_27 as description };
                }
                export { login_1 as login };
                export namespace message {
                    const type_25: string;
                    export { type_25 as type };
                    const example_9: string;
                    export { example_9 as example };
                    const description_28: string;
                    export { description_28 as description };
                }
                export namespace role {
                    const type_26: string;
                    export { type_26 as type };
                    const example_10: string;
                    export { example_10 as example };
                    const description_29: string;
                    export { description_29 as description };
                    const _enum_4: string[];
                    export { _enum_4 as enum };
                }
                export namespace token {
                    const type_27: string;
                    export { type_27 as type };
                    const example_11: string;
                    export { example_11 as example };
                    const description_30: string;
                    export { description_30 as description };
                }
            }
            export { properties_4 as properties };
            const title_5: string;
            export { title_5 as title };
            const description_31: string;
            export { description_31 as description };
        }
        namespace Chart {
            const type_28: string;
            export { type_28 as type };
            const required_5: string[];
            export { required_5 as required };
            export namespace properties_5 {
                export namespace data_1 {
                    const description_32: string;
                    export { description_32 as description };
                    const $ref_10: string;
                    export { $ref_10 as $ref };
                }
                export { data_1 as data };
                export namespace id_2 {
                    const type_29: string;
                    export { type_29 as type };
                    const format_6: string;
                    export { format_6 as format };
                    const description_33: string;
                    export { description_33 as description };
                }
                export { id_2 as id };
                export namespace type_30 {
                    const type_31: string;
                    export { type_31 as type };
                    const description_34: string;
                    export { description_34 as description };
                }
                export { type_30 as type };
                export namespace x {
                    const type_32: string;
                    export { type_32 as type };
                    const example_12: string[];
                    export { example_12 as example };
                    const description_35: string;
                    export { description_35 as description };
                    export namespace items_5 {
                        const type_33: string;
                        export { type_33 as type };
                    }
                    export { items_5 as items };
                }
                export namespace y {
                    const type_34: string;
                    export { type_34 as type };
                    const example_13: string[];
                    export { example_13 as example };
                    const description_36: string;
                    export { description_36 as description };
                    export namespace items_6 {
                        const type_35: string;
                        export { type_35 as type };
                    }
                    export { items_6 as items };
                }
            }
            export { properties_5 as properties };
            const title_6: string;
            export { title_6 as title };
        }
        namespace ChartRename {
            const type_36: string;
            export { type_36 as type };
            const required_6: string[];
            export { required_6 as required };
            export namespace properties_6 {
                export namespace id_3 {
                    const type_37: string;
                    export { type_37 as type };
                    const format_7: string;
                    export { format_7 as format };
                    const description_37: string;
                    export { description_37 as description };
                }
                export { id_3 as id };
                export namespace x_1 {
                    const type_38: string;
                    export { type_38 as type };
                    const description_38: string;
                    export { description_38 as description };
                    export namespace items_7 {
                        const type_39: string;
                        export { type_39 as type };
                    }
                    export { items_7 as items };
                }
                export { x_1 as x };
                export namespace y_1 {
                    const type_40: string;
                    export { type_40 as type };
                    const description_39: string;
                    export { description_39 as description };
                    export namespace items_8 {
                        const type_41: string;
                        export { type_41 as type };
                    }
                    export { items_8 as items };
                }
                export { y_1 as y };
            }
            export { properties_6 as properties };
            const title_7: string;
            export { title_7 as title };
        }
        namespace CommonDto {
            const type_42: string;
            export { type_42 as type };
            export namespace properties_7 {
                namespace value {
                    const type_43: string;
                    export { type_43 as type };
                    const description_40: string;
                    export { description_40 as description };
                }
            }
            export { properties_7 as properties };
            const title_8: string;
            export { title_8 as title };
            const description_41: string;
            export { description_41 as description };
        }
        namespace CommonDtoOfstring {
            const type_44: string;
            export { type_44 as type };
            export namespace properties_8 {
                export namespace value_1 {
                    const type_45: string;
                    export { type_45 as type };
                    const description_42: string;
                    export { description_42 as description };
                    const _enum_5: string[];
                    export { _enum_5 as enum };
                }
                export { value_1 as value };
            }
            export { properties_8 as properties };
            const title_9: string;
            export { title_9 as title };
            const description_43: string;
            export { description_43 as description };
        }
        namespace Dashboard {
            const type_46: string;
            export { type_46 as type };
            const required_7: string[];
            export { required_7 as required };
            export namespace properties_9 {
                export namespace aggregateMethod {
                    const type_47: string;
                    export { type_47 as type };
                    const example_14: string;
                    export { example_14 as example };
                    const description_44: string;
                    export { description_44 as description };
                    const _enum_6: string[];
                    export { _enum_6 as enum };
                }
                export namespace charts {
                    const type_48: string;
                    export { type_48 as type };
                    const description_45: string;
                    export { description_45 as description };
                    export namespace items_9 {
                        const $ref_11: string;
                        export { $ref_11 as $ref };
                    }
                    export { items_9 as items };
                }
                export namespace created {
                    const type_49: string;
                    export { type_49 as type };
                    const example_15: number;
                    export { example_15 as example };
                    const description_46: string;
                    export { description_46 as description };
                }
                export namespace id_4 {
                    const type_50: string;
                    export { type_50 as type };
                    const format_8: string;
                    export { format_8 as format };
                    const example_16: number;
                    export { example_16 as example };
                    const description_47: string;
                    export { description_47 as description };
                }
                export { id_4 as id };
                export namespace name_1 {
                    const type_51: string;
                    export { type_51 as type };
                    const example_17: string;
                    export { example_17 as example };
                    const description_48: string;
                    export { description_48 as description };
                }
                export { name_1 as name };
            }
            export { properties_9 as properties };
            const title_10: string;
            export { title_10 as title };
            const description_49: string;
            export { description_49 as description };
        }
        namespace DashboardPanel {
            const type_52: string;
            export { type_52 as type };
            const required_8: string[];
            export { required_8 as required };
            export namespace properties_10 {
                namespace aggregateMethods {
                    const type_53: string;
                    export { type_53 as type };
                    const description_50: string;
                    export { description_50 as description };
                    export namespace items_10 {
                        const $ref_12: string;
                        export { $ref_12 as $ref };
                    }
                    export { items_10 as items };
                }
                namespace notationElements {
                    const type_54: string;
                    export { type_54 as type };
                    const description_51: string;
                    export { description_51 as description };
                    export namespace items_11 {
                        const $ref_13: string;
                        export { $ref_13 as $ref };
                    }
                    export { items_11 as items };
                }
            }
            export { properties_10 as properties };
            const title_11: string;
            export { title_11 as title };
        }
        namespace ErrorMessage {
            const type_55: string;
            export { type_55 as type };
            const required_9: string[];
            export { required_9 as required };
            export namespace properties_11 {
                export namespace message_1 {
                    const type_56: string;
                    export { type_56 as type };
                    const example_18: string;
                    export { example_18 as example };
                    const description_52: string;
                    export { description_52 as description };
                }
                export { message_1 as message };
            }
            export { properties_11 as properties };
            const title_12: string;
            export { title_12 as title };
            const description_53: string;
            export { description_53 as description };
        }
        namespace ExpertMode {
            const type_57: string;
            export { type_57 as type };
            export namespace properties_12 {
                namespace estimators {
                    const type_58: string;
                    export { type_58 as type };
                    const format_9: string;
                    export { format_9 as format };
                    const example_19: number;
                    export { example_19 as example };
                    const description_54: string;
                    export { description_54 as description };
                }
                namespace tasks {
                    const type_59: string;
                    export { type_59 as type };
                    const format_10: string;
                    export { format_10 as format };
                    const example_20: number;
                    export { example_20 as example };
                    const description_55: string;
                    export { description_55 as description };
                }
            }
            export { properties_12 as properties };
            const title_13: string;
            export { title_13 as title };
            const description_56: string;
            export { description_56 as description };
        }
        namespace Export {
            const type_60: string;
            export { type_60 as type };
            const required_10: string[];
            export { required_10 as required };
            export namespace properties_13 {
                namespace objectId {
                    const type_61: string;
                    export { type_61 as type };
                    const format_11: string;
                    export { format_11 as format };
                    const example_21: number;
                    export { example_21 as example };
                    const description_57: string;
                    export { description_57 as description };
                }
                namespace param {
                    const type_62: string;
                    export { type_62 as type };
                    const example_22: string;
                    export { example_22 as example };
                    const description_58: string;
                    export { description_58 as description };
                }
                namespace success {
                    const type_63: string;
                    export { type_63 as type };
                    const example_23: boolean;
                    export { example_23 as example };
                    const description_59: string;
                    export { description_59 as description };
                }
            }
            export { properties_13 as properties };
            const title_14: string;
            export { title_14 as title };
            const description_60: string;
            export { description_60 as description };
        }
        namespace ExternalData {
            const type_64: string;
            export { type_64 as type };
            const required_11: string[];
            export { required_11 as required };
            export namespace properties_14 {
                export namespace x1 {
                    const type_65: string;
                    export { type_65 as type };
                    const example_24: string[];
                    export { example_24 as example };
                    const description_61: string;
                    export { description_61 as description };
                    export namespace items_12 {
                        const type_66: string;
                        export { type_66 as type };
                    }
                    export { items_12 as items };
                }
                export namespace x2 {
                    const type_67: string;
                    export { type_67 as type };
                    const example_25: string[];
                    export { example_25 as example };
                    const description_62: string;
                    export { description_62 as description };
                    export namespace items_13 {
                        const type_68: string;
                        export { type_68 as type };
                    }
                    export { items_13 as items };
                }
                export namespace y_2 {
                    const type_69: string;
                    export { type_69 as type };
                    const example_26: number[];
                    export { example_26 as example };
                    const description_63: string;
                    export { description_63 as description };
                    export namespace items_14 {
                        const type_70: string;
                        export { type_70 as type };
                        const format_12: string;
                        export { format_12 as format };
                    }
                    export { items_14 as items };
                }
                export { y_2 as y };
            }
            export { properties_14 as properties };
            const title_15: string;
            export { title_15 as title };
        }
        namespace FrontChart {
            const type_71: string;
            export { type_71 as type };
            const required_12: string[];
            export { required_12 as required };
            export namespace properties_15 {
                export namespace type_72 {
                    const type_73: string;
                    export { type_73 as type };
                    const description_64: string;
                    export { description_64 as description };
                }
                export { type_72 as type };
                export namespace x_2 {
                    const type_74: string;
                    export { type_74 as type };
                    const description_65: string;
                    export { description_65 as description };
                    export namespace items_15 {
                        const type_75: string;
                        export { type_75 as type };
                    }
                    export { items_15 as items };
                }
                export { x_2 as x };
                export namespace y_3 {
                    const type_76: string;
                    export { type_76 as type };
                    const description_66: string;
                    export { description_66 as description };
                    export namespace items_16 {
                        const type_77: string;
                        export { type_77 as type };
                    }
                    export { items_16 as items };
                }
                export { y_3 as y };
            }
            export { properties_15 as properties };
            const title_16: string;
            export { title_16 as title };
        }
        namespace FrontDashboard {
            const type_78: string;
            export { type_78 as type };
            const required_13: string[];
            export { required_13 as required };
            export namespace properties_16 {
                export namespace aggregateMethod_1 {
                    const type_79: string;
                    export { type_79 as type };
                    const example_27: string;
                    export { example_27 as example };
                    const description_67: string;
                    export { description_67 as description };
                    const _enum_7: string[];
                    export { _enum_7 as enum };
                }
                export { aggregateMethod_1 as aggregateMethod };
                export namespace charts_1 {
                    const type_80: string;
                    export { type_80 as type };
                    const description_68: string;
                    export { description_68 as description };
                    export namespace items_17 {
                        const $ref_14: string;
                        export { $ref_14 as $ref };
                    }
                    export { items_17 as items };
                }
                export { charts_1 as charts };
                export namespace name_2 {
                    const type_81: string;
                    export { type_81 as type };
                    const example_28: string;
                    export { example_28 as example };
                    const description_69: string;
                    export { description_69 as description };
                }
                export { name_2 as name };
            }
            export { properties_16 as properties };
            const title_17: string;
            export { title_17 as title };
        }
        namespace Interpretation {
            const type_82: string;
            export { type_82 as type };
            export namespace properties_17 {
                export namespace id_5 {
                    const type_83: string;
                    export { type_83 as type };
                    const example_29: string;
                    export { example_29 as example };
                    const description_70: string;
                    export { description_70 as description };
                    const _enum_8: string[];
                    export { _enum_8 as enum };
                }
                export { id_5 as id };
                export namespace interpretationName {
                    const type_84: string;
                    export { type_84 as type };
                    const example_30: string;
                    export { example_30 as example };
                    const description_71: string;
                    export { description_71 as description };
                }
            }
            export { properties_17 as properties };
            const title_18: string;
            export { title_18 as title };
            const description_72: string;
            export { description_72 as description };
        }
        namespace MlAlgorithm {
            const type_85: string;
            export { type_85 as type };
            export namespace properties_18 {
                export namespace algorithmName {
                    const type_86: string;
                    export { type_86 as type };
                    const example_31: string;
                    export { example_31 as example };
                    const description_73: string;
                    export { description_73 as description };
                }
                export namespace id_6 {
                    const type_87: string;
                    export { type_87 as type };
                    const example_32: string;
                    export { example_32 as example };
                    const description_74: string;
                    export { description_74 as description };
                    const _enum_9: string[];
                    export { _enum_9 as enum };
                }
                export { id_6 as id };
            }
            export { properties_18 as properties };
            const title_19: string;
            export { title_19 as title };
            const description_75: string;
            export { description_75 as description };
        }
        namespace MlAnalysis {
            const type_88: string;
            export { type_88 as type };
            export namespace properties_19 {
                export namespace target {
                    const type_89: string;
                    export { type_89 as type };
                }
                export namespace x_3 {
                    const type_90: string;
                    export { type_90 as type };
                    export namespace items_18 {
                        const type_91: string;
                        export { type_91 as type };
                    }
                    export { items_18 as items };
                }
                export { x_3 as x };
                export namespace y_4 {
                    const type_92: string;
                    export { type_92 as type };
                    export namespace items_19 {
                        const type_93: string;
                        export { type_93 as type };
                    }
                    export { items_19 as items };
                }
                export { y_4 as y };
            }
            export { properties_19 as properties };
            const title_20: string;
            export { title_20 as title };
            const description_76: string;
            export { description_76 as description };
        }
        namespace MlKeysRequest {
            const type_94: string;
            export { type_94 as type };
            const required_14: string[];
            export { required_14 as required };
            export namespace properties_20 {
                namespace featuresIds {
                    const type_95: string;
                    export { type_95 as type };
                    const example_33: number[];
                    export { example_33 as example };
                    const description_77: string;
                    export { description_77 as description };
                    export namespace items_20 {
                        const type_96: string;
                        export { type_96 as type };
                        const format_13: string;
                        export { format_13 as format };
                    }
                    export { items_20 as items };
                }
                namespace targetAttributeId {
                    const type_97: string;
                    export { type_97 as type };
                    const format_14: string;
                    export { format_14 as format };
                    const example_34: number;
                    export { example_34 as example };
                    const description_78: string;
                    export { description_78 as description };
                }
                namespace targetId {
                    const type_98: string;
                    export { type_98 as type };
                    const format_15: string;
                    export { format_15 as format };
                    const example_35: number;
                    export { example_35 as example };
                    const description_79: string;
                    export { description_79 as description };
                }
            }
            export { properties_20 as properties };
            const title_21: string;
            export { title_21 as title };
            const description_80: string;
            export { description_80 as description };
        }
        namespace MlKeysResponse {
            const type_99: string;
            export { type_99 as type };
            const required_15: string[];
            export { required_15 as required };
            export namespace properties_21 {
                export namespace features {
                    const type_100: string;
                    export { type_100 as type };
                    const description_81: string;
                    export { description_81 as description };
                    export namespace items_21 {
                        const $ref_15: string;
                        export { $ref_15 as $ref };
                    }
                    export { items_21 as items };
                }
                export namespace target_1 {
                    const description_82: string;
                    export { description_82 as description };
                    const $ref_16: string;
                    export { $ref_16 as $ref };
                }
                export { target_1 as target };
                export namespace targetAttribute {
                    const description_83: string;
                    export { description_83 as description };
                    const $ref_17: string;
                    export { $ref_17 as $ref };
                }
            }
            export { properties_21 as properties };
            const title_22: string;
            export { title_22 as title };
            const description_84: string;
            export { description_84 as description };
        }
        namespace MlText {
            const type_101: string;
            export { type_101 as type };
            const required_16: string[];
            export { required_16 as required };
            export namespace properties_22 {
                export namespace clustersAmount {
                    const type_102: string;
                    export { type_102 as type };
                    const format_16: string;
                    export { format_16 as format };
                    const example_36: number;
                    export { example_36 as example };
                    const description_85: string;
                    export { description_85 as description };
                }
                export namespace data_2 {
                    const type_103: string;
                    export { type_103 as type };
                    const description_86: string;
                    export { description_86 as description };
                }
                export { data_2 as data };
                export namespace errorMessage_1 {
                    const type_104: string;
                    export { type_104 as type };
                    const description_87: string;
                    export { description_87 as description };
                }
                export { errorMessage_1 as errorMessage };
                export namespace filterSelectedValues_2 {
                    const type_105: string;
                    export { type_105 as type };
                    const description_88: string;
                    export { description_88 as description };
                    export namespace items_22 {
                        const type_106: string;
                        export { type_106 as type };
                        const format_17: string;
                        export { format_17 as format };
                    }
                    export { items_22 as items };
                }
                export { filterSelectedValues_2 as filterSelectedValues };
                export namespace id_7 {
                    const type_107: string;
                    export { type_107 as type };
                    const format_18: string;
                    export { format_18 as format };
                    const example_37: number;
                    export { example_37 as example };
                    const description_89: string;
                    export { description_89 as description };
                }
                export { id_7 as id };
                export namespace params_1 {
                    const type_108: string;
                    export { type_108 as type };
                    const description_90: string;
                    export { description_90 as description };
                    export namespace items_23 {
                        const $ref_18: string;
                        export { $ref_18 as $ref };
                    }
                    export { items_23 as items };
                }
                export { params_1 as params };
                export namespace status_1 {
                    const type_109: string;
                    export { type_109 as type };
                    const description_91: string;
                    export { description_91 as description };
                    const _enum_10: string[];
                    export { _enum_10 as enum };
                }
                export { status_1 as status };
                export namespace textKey {
                    const type_110: string;
                    export { type_110 as type };
                    const example_38: string;
                    export { example_38 as example };
                    const description_92: string;
                    export { description_92 as description };
                }
            }
            export { properties_22 as properties };
            const title_23: string;
            export { title_23 as title };
            const description_93: string;
            export { description_93 as description };
        }
        namespace Notation {
            const type_111: string;
            export { type_111 as type };
            const required_17: string[];
            export { required_17 as required };
            export namespace properties_23 {
                export namespace created_1 {
                    const type_112: string;
                    export { type_112 as type };
                    const example_39: number;
                    export { example_39 as example };
                    const description_94: string;
                    export { description_94 as description };
                }
                export { created_1 as created };
                export namespace notationId {
                    const type_113: string;
                    export { type_113 as type };
                    const format_19: string;
                    export { format_19 as format };
                    const example_40: number;
                    export { example_40 as example };
                    const description_95: string;
                    export { description_95 as description };
                }
                export namespace notationName {
                    const type_114: string;
                    export { type_114 as type };
                    const example_41: string;
                    export { example_41 as example };
                    const description_96: string;
                    export { description_96 as description };
                }
                export namespace researchId {
                    const type_115: string;
                    export { type_115 as type };
                    const format_20: string;
                    export { format_20 as format };
                    const example_42: number;
                    export { example_42 as example };
                    const description_97: string;
                    export { description_97 as description };
                }
                export namespace researchName {
                    const type_116: string;
                    export { type_116 as type };
                    const example_43: string;
                    export { example_43 as example };
                    const description_98: string;
                    export { description_98 as description };
                }
                export namespace status_2 {
                    const type_117: string;
                    export { type_117 as type };
                    const example_44: string;
                    export { example_44 as example };
                    const description_99: string;
                    export { description_99 as description };
                    const _enum_11: string[];
                    export { _enum_11 as enum };
                }
                export { status_2 as status };
                export namespace updated {
                    const type_118: string;
                    export { type_118 as type };
                    const example_45: number;
                    export { example_45 as example };
                    const description_100: string;
                    export { description_100 as description };
                }
            }
            export { properties_23 as properties };
            const title_24: string;
            export { title_24 as title };
            const description_101: string;
            export { description_101 as description };
        }
        namespace NotationDetail {
            const type_119: string;
            export { type_119 as type };
            const required_18: string[];
            export { required_18 as required };
            export namespace properties_24 {
                export namespace created_2 {
                    const type_120: string;
                    export { type_120 as type };
                    const example_46: number;
                    export { example_46 as example };
                    const description_102: string;
                    export { description_102 as description };
                }
                export { created_2 as created };
                export namespace elements {
                    const type_121: string;
                    export { type_121 as type };
                    const description_103: string;
                    export { description_103 as description };
                    export namespace items_24 {
                        const $ref_19: string;
                        export { $ref_19 as $ref };
                    }
                    export { items_24 as items };
                }
                export namespace notationId_1 {
                    const type_122: string;
                    export { type_122 as type };
                    const format_21: string;
                    export { format_21 as format };
                    const example_47: number;
                    export { example_47 as example };
                    const description_104: string;
                    export { description_104 as description };
                }
                export { notationId_1 as notationId };
                export namespace notationName_1 {
                    const type_123: string;
                    export { type_123 as type };
                    const example_48: string;
                    export { example_48 as example };
                    const description_105: string;
                    export { description_105 as description };
                }
                export { notationName_1 as notationName };
                export namespace researchId_1 {
                    const type_124: string;
                    export { type_124 as type };
                    const format_22: string;
                    export { format_22 as format };
                    const example_49: number;
                    export { example_49 as example };
                    const description_106: string;
                    export { description_106 as description };
                }
                export { researchId_1 as researchId };
                export namespace researchName_1 {
                    const type_125: string;
                    export { type_125 as type };
                    const example_50: string;
                    export { example_50 as example };
                    const description_107: string;
                    export { description_107 as description };
                }
                export { researchName_1 as researchName };
                export namespace status_3 {
                    const type_126: string;
                    export { type_126 as type };
                    const example_51: string;
                    export { example_51 as example };
                    const description_108: string;
                    export { description_108 as description };
                    const _enum_12: string[];
                    export { _enum_12 as enum };
                }
                export { status_3 as status };
                export namespace updated_1 {
                    const type_127: string;
                    export { type_127 as type };
                    const example_52: number;
                    export { example_52 as example };
                    const description_109: string;
                    export { description_109 as description };
                }
                export { updated_1 as updated };
            }
            export { properties_24 as properties };
            const title_25: string;
            export { title_25 as title };
            const description_110: string;
            export { description_110 as description };
        }
        namespace NotationDetails {
            const type_128: string;
            export { type_128 as type };
            const required_19: string[];
            export { required_19 as required };
            export namespace properties_25 {
                export namespace alias_1 {
                    const type_129: string;
                    export { type_129 as type };
                    const example_53: string;
                    export { example_53 as example };
                    const description_111: string;
                    export { description_111 as description };
                }
                export { alias_1 as alias };
                export namespace id_8 {
                    const type_130: string;
                    export { type_130 as type };
                    const format_23: string;
                    export { format_23 as format };
                    const example_54: number;
                    export { example_54 as example };
                    const description_112: string;
                    export { description_112 as description };
                }
                export { id_8 as id };
                export namespace name_3 {
                    const type_131: string;
                    export { type_131 as type };
                    const example_55: string;
                    export { example_55 as example };
                    const description_113: string;
                    export { description_113 as description };
                }
                export { name_3 as name };
            }
            export { properties_25 as properties };
            const title_26: string;
            export { title_26 as title };
            const description_114: string;
            export { description_114 as description };
        }
        namespace NotationElement {
            const type_132: string;
            export { type_132 as type };
            const required_20: string[];
            export { required_20 as required };
            export namespace properties_26 {
                export namespace alias_2 {
                    const type_133: string;
                    export { type_133 as type };
                    const example_56: string;
                    export { example_56 as example };
                    const description_115: string;
                    export { description_115 as description };
                }
                export { alias_2 as alias };
                export namespace description_116 {
                    const type_134: string;
                    export { type_134 as type };
                    const example_57: string;
                    export { example_57 as example };
                    const description_117: string;
                    export { description_117 as description };
                }
                export { description_116 as description };
                export namespace id_9 {
                    const type_135: string;
                    export { type_135 as type };
                    const format_24: string;
                    export { format_24 as format };
                    const example_58: number;
                    export { example_58 as example };
                    const description_118: string;
                    export { description_118 as description };
                }
                export { id_9 as id };
                export namespace name_4 {
                    const type_136: string;
                    export { type_136 as type };
                    const example_59: string;
                    export { example_59 as example };
                    const description_119: string;
                    export { description_119 as description };
                }
                export { name_4 as name };
                export namespace typeKey {
                    const type_137: string;
                    export { type_137 as type };
                    const example_60: string;
                    export { example_60 as example };
                    const description_120: string;
                    export { description_120 as description };
                    const _enum_13: string[];
                    export { _enum_13 as enum };
                }
                export namespace uniqueValues {
                    const type_138: string;
                    export { type_138 as type };
                    const description_121: string;
                    export { description_121 as description };
                    export namespace items_25 {
                        const $ref_20: string;
                        export { $ref_20 as $ref };
                    }
                    export { items_25 as items };
                }
            }
            export { properties_26 as properties };
            const title_27: string;
            export { title_27 as title };
            const description_122: string;
            export { description_122 as description };
        }
        namespace NotationElementType {
            const type_139: string;
            export { type_139 as type };
            const required_21: string[];
            export { required_21 as required };
            export namespace properties_27 {
                export namespace code {
                    const type_140: string;
                    export { type_140 as type };
                    const example_61: string;
                    export { example_61 as example };
                    const description_123: string;
                    export { description_123 as description };
                    const _enum_14: string[];
                    export { _enum_14 as enum };
                }
                export namespace description_124 {
                    const type_141: string;
                    export { type_141 as type };
                    const example_62: string;
                    export { example_62 as example };
                    const description_125: string;
                    export { description_125 as description };
                }
                export { description_124 as description };
                export namespace id_10 {
                    const type_142: string;
                    export { type_142 as type };
                    const format_25: string;
                    export { format_25 as format };
                    const example_63: number;
                    export { example_63 as example };
                    const description_126: string;
                    export { description_126 as description };
                }
                export { id_10 as id };
            }
            export { properties_27 as properties };
            const title_28: string;
            export { title_28 as title };
            const description_127: string;
            export { description_127 as description };
        }
        namespace NotationElementUniqueValue {
            const type_143: string;
            export { type_143 as type };
            const required_22: string[];
            export { required_22 as required };
            export namespace properties_28 {
                export namespace alias_3 {
                    const type_144: string;
                    export { type_144 as type };
                    const example_64: string;
                    export { example_64 as example };
                    const description_128: string;
                    export { description_128 as description };
                }
                export { alias_3 as alias };
                export namespace id_11 {
                    const type_145: string;
                    export { type_145 as type };
                    const format_26: string;
                    export { format_26 as format };
                    const example_65: number;
                    export { example_65 as example };
                    const description_129: string;
                    export { description_129 as description };
                }
                export { id_11 as id };
                export namespace isSelected {
                    const type_146: string;
                    export { type_146 as type };
                    const example_66: boolean;
                    export { example_66 as example };
                    const description_130: string;
                    export { description_130 as description };
                }
                export namespace name_5 {
                    const type_147: string;
                    export { type_147 as type };
                    const example_67: string;
                    export { example_67 as example };
                    const description_131: string;
                    export { description_131 as description };
                }
                export { name_5 as name };
            }
            export { properties_28 as properties };
            const title_29: string;
            export { title_29 as title };
            const description_132: string;
            export { description_132 as description };
        }
        namespace NotationUpdateRequest {
            const type_148: string;
            export { type_148 as type };
            const required_23: string[];
            export { required_23 as required };
            export namespace properties_29 {
                export namespace elements_1 {
                    const type_149: string;
                    export { type_149 as type };
                    const description_133: string;
                    export { description_133 as description };
                    export namespace items_26 {
                        const $ref_21: string;
                        export { $ref_21 as $ref };
                    }
                    export { items_26 as items };
                }
                export { elements_1 as elements };
                export namespace notationName_2 {
                    const type_150: string;
                    export { type_150 as type };
                    const example_68: string;
                    export { example_68 as example };
                    const description_134: string;
                    export { description_134 as description };
                }
                export { notationName_2 as notationName };
                export namespace status_4 {
                    const type_151: string;
                    export { type_151 as type };
                    const example_69: string;
                    export { example_69 as example };
                    const description_135: string;
                    export { description_135 as description };
                    const _enum_15: string[];
                    export { _enum_15 as enum };
                }
                export { status_4 as status };
            }
            export { properties_29 as properties };
            const title_30: string;
            export { title_30 as title };
            const description_136: string;
            export { description_136 as description };
        }
        namespace RegistrationRequest {
            const type_152: string;
            export { type_152 as type };
            const required_24: string[];
            export { required_24 as required };
            export namespace properties_30 {
                export namespace login_2 {
                    const type_153: string;
                    export { type_153 as type };
                    const example_70: string;
                    export { example_70 as example };
                    const description_137: string;
                    export { description_137 as description };
                }
                export { login_2 as login };
                export namespace name_6 {
                    const type_154: string;
                    export { type_154 as type };
                    const example_71: string;
                    export { example_71 as example };
                    const description_138: string;
                    export { description_138 as description };
                }
                export { name_6 as name };
                export namespace password_1 {
                    const type_155: string;
                    export { type_155 as type };
                    const example_72: number;
                    export { example_72 as example };
                    const description_139: string;
                    export { description_139 as description };
                }
                export { password_1 as password };
                export namespace surname {
                    const type_156: string;
                    export { type_156 as type };
                    const example_73: string;
                    export { example_73 as example };
                    const description_140: string;
                    export { description_140 as description };
                }
            }
            export { properties_30 as properties };
            const title_31: string;
            export { title_31 as title };
            const description_141: string;
            export { description_141 as description };
        }
        namespace RegistrationResponse {
            const type_157: string;
            export { type_157 as type };
            const required_25: string[];
            export { required_25 as required };
            export namespace properties_31 {
                export namespace message_2 {
                    const type_158: string;
                    export { type_158 as type };
                    const example_74: string;
                    export { example_74 as example };
                    const description_142: string;
                    export { description_142 as description };
                }
                export { message_2 as message };
            }
            export { properties_31 as properties };
            const title_32: string;
            export { title_32 as title };
            const description_143: string;
            export { description_143 as description };
        }
        namespace ResearchCreateResponse {
            const type_159: string;
            export { type_159 as type };
            const required_26: string[];
            export { required_26 as required };
            export namespace properties_32 {
                export namespace id_12 {
                    const type_160: string;
                    export { type_160 as type };
                    const format_27: string;
                    export { format_27 as format };
                    const example_75: number;
                    export { example_75 as example };
                    const description_144: string;
                    export { description_144 as description };
                }
                export { id_12 as id };
                export namespace notationId_2 {
                    const type_161: string;
                    export { type_161 as type };
                    const format_28: string;
                    export { format_28 as format };
                    const example_76: number;
                    export { example_76 as example };
                    const description_145: string;
                    export { description_145 as description };
                }
                export { notationId_2 as notationId };
            }
            export { properties_32 as properties };
            const title_33: string;
            export { title_33 as title };
            const description_146: string;
            export { description_146 as description };
        }
        namespace ResearchResponse {
            const type_162: string;
            export { type_162 as type };
            const required_27: string[];
            export { required_27 as required };
            export namespace properties_33 {
                export namespace created_3 {
                    const type_163: string;
                    export { type_163 as type };
                    const example_77: number;
                    export { example_77 as example };
                    const description_147: string;
                    export { description_147 as description };
                }
                export { created_3 as created };
                export namespace department {
                    const type_164: string;
                    export { type_164 as type };
                    const example_78: string;
                    export { example_78 as example };
                    const description_148: string;
                    export { description_148 as description };
                }
                export namespace file {
                    const type_165: string;
                    export { type_165 as type };
                    const example_79: string;
                    export { example_79 as example };
                    const description_149: string;
                    export { description_149 as description };
                }
                export namespace id_13 {
                    const type_166: string;
                    export { type_166 as type };
                    const format_29: string;
                    export { format_29 as format };
                    const example_80: number;
                    export { example_80 as example };
                    const description_150: string;
                    export { description_150 as description };
                }
                export { id_13 as id };
                export namespace notationId_3 {
                    const type_167: string;
                    export { type_167 as type };
                    const format_30: string;
                    export { format_30 as format };
                    const example_81: number;
                    export { example_81 as example };
                    const description_151: string;
                    export { description_151 as description };
                }
                export { notationId_3 as notationId };
                export namespace notationName_3 {
                    const type_168: string;
                    export { type_168 as type };
                    const example_82: string;
                    export { example_82 as example };
                    const description_152: string;
                    export { description_152 as description };
                }
                export { notationName_3 as notationName };
                export namespace researchId_2 {
                    const type_169: string;
                    export { type_169 as type };
                    const format_31: string;
                    export { format_31 as format };
                    const example_83: number;
                    export { example_83 as example };
                    const description_153: string;
                    export { description_153 as description };
                }
                export { researchId_2 as researchId };
                export namespace researchName_2 {
                    const type_170: string;
                    export { type_170 as type };
                    const example_84: string;
                    export { example_84 as example };
                    const description_154: string;
                    export { description_154 as description };
                }
                export { researchName_2 as researchName };
                export namespace result {
                    const type_171: string;
                    export { type_171 as type };
                    const example_85: boolean;
                    export { example_85 as example };
                    const description_155: string;
                    export { description_155 as description };
                }
                export namespace status_5 {
                    const type_172: string;
                    export { type_172 as type };
                    const example_86: string;
                    export { example_86 as example };
                    const description_156: string;
                    export { description_156 as description };
                    const _enum_16: string[];
                    export { _enum_16 as enum };
                }
                export { status_5 as status };
                export namespace updated_2 {
                    const type_173: string;
                    export { type_173 as type };
                    const example_87: number;
                    export { example_87 as example };
                    const description_157: string;
                    export { description_157 as description };
                }
                export { updated_2 as updated };
            }
            export { properties_33 as properties };
            const title_34: string;
            export { title_34 as title };
            const description_158: string;
            export { description_158 as description };
        }
        namespace ResearchUpdateRequest {
            const type_174: string;
            export { type_174 as type };
            const required_28: string[];
            export { required_28 as required };
            export namespace properties_34 {
                export namespace department_1 {
                    const type_175: string;
                    export { type_175 as type };
                    const example_88: string;
                    export { example_88 as example };
                    const description_159: string;
                    export { description_159 as description };
                }
                export { department_1 as department };
                export namespace name_7 {
                    const type_176: string;
                    export { type_176 as type };
                    const example_89: string;
                    export { example_89 as example };
                    const description_160: string;
                    export { description_160 as description };
                }
                export { name_7 as name };
            }
            export { properties_34 as properties };
            const title_35: string;
            export { title_35 as title };
            const description_161: string;
            export { description_161 as description };
        }
        namespace SuccessMessage {
            const type_177: string;
            export { type_177 as type };
            const required_29: string[];
            export { required_29 as required };
            export namespace properties_35 {
                export namespace message_3 {
                    const type_178: string;
                    export { type_178 as type };
                    const example_90: string;
                    export { example_90 as example };
                    const description_162: string;
                    export { description_162 as description };
                }
                export { message_3 as message };
            }
            export { properties_35 as properties };
            const title_36: string;
            export { title_36 as title };
            const description_163: string;
            export { description_163 as description };
        }
    }
}
