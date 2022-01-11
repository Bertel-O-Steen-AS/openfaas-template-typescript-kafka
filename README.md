<!-- @format -->

# Typescript Kafka template for OpenFaaS

This template is based on the official `express` template from OpenFaaS. It allows you to write your function in Typescript, that will be compiled to javascript during the build process. The function can consume and/or produce events using the Kafka protocol. This template was developed in order to communicate with Azure Event Hubs using the Kafka protocol.

## Usage

```shell
faas-cli template pull https://github.com/nanopils/openfaas-template-typescript-kafka
faas-cli new my-kafka-function --lang ts-kafka
```
