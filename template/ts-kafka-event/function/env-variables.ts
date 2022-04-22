import { getKubernetesSecret } from './utils';
import { IEnvironmentVariables } from './types';

// ToDo: replace the values below with your actual secret names
const secretNames = {
  connectionString: '<ConnectionStringSecretName>',
  eventHubName: '<EventHubSecretName>',
  evenHubNamespaceUrl: '<EvenHubNamespaceUrlSecretName>',
};

export const getEventHubsVariables = async (env = process.env): Promise<IEnvironmentVariables> => ({
  CONSUMER_GROUP: env?.CONSUMER_GROUP,
  EVENT_HUB_CLIENT_ID: env?.EVENT_HUB_CLIENT_ID,
  EVENT_HUB_CONNECTION_STRING:
    env?.EVENT_HUB_CONNECTION_STRING || (await getKubernetesSecret(secretNames.connectionString)),
  EVENT_HUB_NAMESPACE_URL: env?.EVENT_HUB_NAMESPACE_URL || (await getKubernetesSecret(secretNames.evenHubNamespaceUrl)),
  KAFKA_TOPIC_CONSUME: env?.KAFKA_TOPIC_CONSUME || null,
  KAFKA_TOPIC_PRODUCE: env?.KAFKA_TOPIC_PRODUCE || null,
  KAFKA_PORT: env?.KAFKA_PORT,
  LOG_LEVEL: env?.LOG_LEVEL || 'info',
});
