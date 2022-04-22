export interface IEnvironmentVariables {
  CONSUMER_GROUP: string;
  EVENT_HUB_CLIENT_ID: string;
  EVENT_HUB_CONNECTION_STRING: string;
  EVENT_HUB_NAMESPACE_URL: string;
  KAFKA_TOPIC_CONSUME: string;
  KAFKA_TOPIC_PRODUCE: string;
  KAFKA_PORT: string;
  LOG_LEVEL: string;
}

export interface IEventPayload {
  // ToDo: Add expected fields here
}
