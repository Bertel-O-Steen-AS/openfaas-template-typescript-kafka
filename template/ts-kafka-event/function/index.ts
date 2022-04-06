import { KafkaPubSub } from 'graphql-kafka-subscriptions';
import * as Logger from 'bunyan';
import { LogLevel } from 'bunyan';
import { IEnvironmentVariables, IEventPayload } from './types';
import { onMessage } from './handler';

const pubSubs: { [key: string]: KafkaPubSub } = {};

export const startKafkaConsumer = async (variables: IEnvironmentVariables) => {
  const pubSub = getPubSubByTopic(variables);

  const subIdCounter = await pubSub.subscribe(
    variables?.EVENT_HUB_KAFKA_CHANNEL_CONSUME || '',
    (payload: IEventPayload) => {
      onMessage(payload, variables);
    },
  );
};

const getPubSubByTopic = (variables: IEnvironmentVariables): KafkaPubSub => {
  const topic = variables?.EVENT_HUB_NAME;
  const channel = variables?.EVENT_HUB_KAFKA_CHANNEL_CONSUME;
  const host = variables?.EVENT_HUB_NAMESPACE_URL;
  const port = variables?.KAFKA_PORT;
  const consumerGroup = variables?.CONSUMER_GROUP;
  const connectionString = variables?.EVENT_HUB_CONNECTION_STRING;
  const level: LogLevel = (variables?.LOG_LEVEL as LogLevel) || 'info';
  console.log(`Listening to topic name (i.e. event hub name) '${topic}' and channel '${channel}'`);

  if (pubSubs[topic]) return pubSubs[topic];

  console.log(`topic: '${topic}'`);
  console.log(`host: '${host}'`);
  console.log(`port: '${port}'`);
  console.log(`consumerGroup: '${consumerGroup}'`);
  console.log(`connectionString: '${connectionString}'`);

  const logger = Logger.createLogger({
    name: 'pubsub',
    stream: process.stdout,
    level,
  });

  const pubSub = new KafkaPubSub({
    topic,
    host,
    port,
    logger,
    groupId: consumerGroup,
    globalConfig: {
      debug: 'all',
      'socket.keepalive.enable': true,
      'enable.auto.commit': false,
      'security.protocol': 'SASL_SSL',
      'sasl.mechanisms': 'PLAIN',
      'sasl.username': '$ConnectionString', //do not replace $ConnectionString
      'sasl.password': connectionString,
      'api.version.request': true,
    },
  });

  pubSubs[topic] = pubSub;
  return pubSub;
};
