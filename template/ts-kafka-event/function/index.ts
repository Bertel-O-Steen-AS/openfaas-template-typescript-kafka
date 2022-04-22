import { Consumer as KafkaConsumer, Kafka, KafkaConfig, KafkaMessage, logLevel, SASLOptions } from 'kafkajs';
import { IEnvironmentVariables, IEventPayload } from './types';
import { onMessage } from './handler';

const consumers: { [topic: string]: KafkaConsumer } = {};

export const convertBufferToMessage = (payload: KafkaMessage): IEventPayload => {
  try {
    const value: Buffer = payload.value;
    return JSON.parse(value.toString());
  } catch (error) {
    console.error(`Error parsing event:`, error);
  }
};

export const startKafkaConsumer = async (variables: IEnvironmentVariables) => {
  const topic = variables?.KAFKA_TOPIC_CONSUME;
  if (!topic) {
    throw new Error(
      'The "KAFKA_TOPIC_CONSUME" environment variable is required in order for this function to work correctly!',
    );
  }
  const consumer = getKafkaConsumerByTopic(variables);

  try {
    // Consuming
    await consumer.connect();
    await consumer.subscribe({ topic, fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const payload: IEventPayload = convertBufferToMessage(message);
        onMessage(payload, variables);
      },
    });
  } catch (error) {
    console.error(error);
  }
};

const getKafkaConsumerByTopic = (variables: IEnvironmentVariables): KafkaConsumer => {
  const topic = variables?.KAFKA_TOPIC_CONSUME;
  const clientId = variables?.EVENT_HUB_CLIENT_ID || `client-${Math.random()}`;
  const host = variables?.EVENT_HUB_NAMESPACE_URL;
  const port = variables?.KAFKA_PORT;
  const consumerGroup = variables?.CONSUMER_GROUP;
  const connectionString = variables?.EVENT_HUB_CONNECTION_STRING;
  console.log(`Listening to topic name (i.e. event hub name) '${topic}'`);

  if (consumers[topic]) return consumers[topic];

  console.log(`topic: '${topic}'`);
  console.log(`host: '${host}'`);
  console.log(`port: '${port}'`);
  console.log(`consumerGroup: '${consumerGroup}'`);
  console.log(`connectionString: '${connectionString}'`);

  const broker = `${host}:${port}`;

  const sasl: SASLOptions = {
    mechanism: 'plain',
    username: '$ConnectionString',
    password: connectionString,
  };

  const kafkaConfig: KafkaConfig = {
    clientId,
    brokers: [broker],
    logLevel: logLevel.INFO,
    sasl,
    ssl: true,
  };

  const kafka = new Kafka(kafkaConfig);

  const consumer = kafka.consumer({ groupId: consumerGroup });

  consumers[topic] = consumer;

  return consumer;
};
