import { IEnvironmentVariables, IEventPayload } from './types';

export const onMessage = (payload: IEventPayload, variables: IEnvironmentVariables) => {
  console.log('Received event: ', payload);
};
