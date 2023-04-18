# Simple Workflow Micro-Service Example

This repository has an example of creating a simple workflow microservice with [NestJS](https://github.com/nestjs/nest) and [WorkflowJS](https://github.com/vhidvz/workflow-js).

![Simple Workflow](./diagram.svg)

# Prerequisite

- Git control version tools
- NPM and NodeJS 18 or upper
- Docker 23 or above whit Compose

# Up and Running

First of all need to clone this repository by following command.

```sh
git clone https://github.com/vhidvz/workflow-template.git
```

Then install the node dependencies with command `cd workflow-template && npm ci`. after that, install the MongoDB community server by the following command in your terminal.

```sh
docker-compose up -d
```

To start and run the project type `npm run start`, that's it...

# Usage and Dangling

- Step 1: create a flow by posting a request with plain data `Hi`.

```sh
curl --request POST \
  --url http://localhost:3000/ \
  --header 'Content-Type: text/plain' \
  --data Hi
```
