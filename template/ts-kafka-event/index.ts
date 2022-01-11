// Copyright (c) Alex Ellis 2017. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { startKafkaConsumer } from "./function";
import { getEventHubsVariables } from "./function/env-variables";
import { IEnvironmentVariables } from "./function/types";

getEventHubsVariables(process.env)
  .then((variables: IEnvironmentVariables) => startKafkaConsumer(variables));

