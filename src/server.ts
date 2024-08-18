import { load } from 'ts-dotenv';
import express, { Express } from 'express';
import { strict as assert } from 'assert';

import v1Endpoint from './route/api/v1/endpoint.js';

const env = load({
    VERSION: String,
    PORT: Number
});

assert(typeof env.VERSION === 'string')
assert(typeof env.PORT === 'number');

const server: Express = express();

server.use('/api/v1', v1Endpoint);

server.listen(env.PORT, () => { console.log(`Server v${env.VERSION} started on ::${env.PORT}`) })