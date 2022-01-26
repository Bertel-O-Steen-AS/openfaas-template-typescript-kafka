// Copyright (c) Alex Ellis 2017. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import Fastify, { FastifyInstance } from 'fastify';
import { startKafkaConsumer } from './function';
import { getEventHubsVariables } from './function/env-variables';
import { IEnvironmentVariables } from './function/types';

getEventHubsVariables(process.env).then((variables: IEnvironmentVariables) => startKafkaConsumer(variables));

const httpPort = process.env.http_port || 3000;

const server: FastifyInstance = Fastify();

server.get('/healthz', async (request: any, reply: any) => {
  return { message: 'I am running!' };
});

server.listen(httpPort, (err: Error, address: string | number) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`🎉 HTTP server listening at ${address}`);
});
