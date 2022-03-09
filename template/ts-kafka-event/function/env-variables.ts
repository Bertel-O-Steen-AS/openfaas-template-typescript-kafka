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
  EVENT_HUB_CONNECTION_STRING:
    env?.EVENT_HUB_CONNECTION_STRING || (await getKubernetesSecret(secretNames.connectionString)),
  EVENT_HUB_NAME: env?.EVENT_HUB_NAME || (await getKubernetesSecret(secretNames.eventHubName)),
  EVENT_HUB_NAMESPACE_URL: env?.EVENT_HUB_NAMESPACE_URL || (await getKubernetesSecret(secretNames.evenHubNamespaceUrl)),
  EVENT_HUB_KAFKA_CHANNEL_CONSUME: env?.EVENT_HUB_KAFKA_CHANNEL_CONSUME || null,
  EVENT_HUB_KAFKA_CHANNEL_PRODUCE: env?.EVENT_HUB_KAFKA_CHANNEL_PRODUCE || null,
  KAFKA_PORT: env?.KAFKA_PORT,
  LOG_LEVEL: env?.LOG_LEVEL || 'info',
});
