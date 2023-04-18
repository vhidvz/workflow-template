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

Swagger UI is also exists and running on [http://[::1]:3000/api](http://[::1]:3000/api)

## _Step 1_

create a flow by posting a request with plain data `Hi`.

```sh
curl --request POST \
  --url http://localhost:3000/flow \
  --header 'Content-Type: application/json' \
  --data '{
 "global": "Hi"
}'
```

__Response:__ base on the flow definition exclusive gateway cannot automatically done, therefor workflow will pauses at this point.

```json
{
  "data": {
    "global": "Hi",
    "_id": "643ef248f6dafc316b6a33d2"
  },
  "status": "paused",
  "tokens": [
    {
      "id": "b792edad36578871",
      "histories": [
        {
          "status": "completed",
          "ref": "StartEvent_0do01j4",
          "name": "start"
        },
        {
          "status": "paused",
          "ref": "Activity_0mra47f",
          "name": "initial_task"
        }
      ]
    }
  ],
  "_id": "643ef248f6dafc316b6a33d1",
  "__v": 0
}
```

## _Step 2_

find a flow by mongo id with the following `GET` request.

```sh
curl --request GET \
  --url http://localhost:3000/flow/643ef248f6dafc316b6a33d1
```

__Response:__ it must be same as the previous result.
