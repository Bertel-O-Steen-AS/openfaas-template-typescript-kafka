export interface IEnvironmentVariables {
  CONSUMER_GROUP: string;
  CLIENT_ID: string;
  CONNECTION_STRING: string;
  KAFKA_HOST_URL: string;
  KAFKA_TOPIC_CONSUME: string;
  KAFKA_TOPIC_PRODUCE: string;
  KAFKA_PORT: string;
  LOG_LEVEL: string;
}

export interface IEventPayload {
  // ToDo: Add expected fields here
}
