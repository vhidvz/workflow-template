# Simple Workflow Microservice

This repository has an example of creating a simple workflow microservice with [NestJS](https://github.com/nestjs/nest) and [WorkflowJS](https://github.com/vhidvz/workflow-js).

# Diagram

![Simple Workflow](./diagram.svg)

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

Swagger UI is also exists and running on [http://[::1]:3000/api](http://[::1]:3000/api). if you need to understand better please look at the `src/`[app.workflow.ts](https://github.com/vhidvz/workflow-template/blob/master/src/app.workflow.ts) file.

## Scenario 1: Requested Service Not Approved

### _Step 1_

Create a flow by posting a request with plain data `Hi`.

```sh
curl --request POST \
  --url http://localhost:3000/flow \
  --header 'Content-Type: application/json' \
  --data '{
  "global": "Hi"
}'
```

__Response:__ base on the flow definition exclusive gateway `approval_gateway` cannot automatically done, therefor workflow will pauses at this point.

```json
{
  "data": {
    "global": "Hi",
    "_id": "643fcfe30eaf231a283a539b"
  },
  "status": "paused",
  "tokens": [
    {
      "id": "cc5c8c5baa370eec",
      "history": [
        {
          "status": "completed",
          "ref": "StartEvent_0do01j4",
          "name": "start"
        },
        {
          "status": "completed",
          "ref": "Activity_0mra47f",
          "name": "initial_task"
        },
        {
          "status": "paused",
          "ref": "Gateway_0az0yjr",
          "name": "approval_gateway"
        }
      ]
    }
  ],
  "_id": "643fcfe30eaf231a283a539a",
  "__v": 0
}
```

### _Step 2_

Find a flow by mongo id with the following `GET` request.

```sh
curl --request GET \
  --url http://localhost:3000/flow/643fcfe30eaf231a283a539a
```

__Response:__ it must be same as the previous result.

### _Step 3_

Resume the flow by posting a `PATCH` request with `no` response by user.

```sh
curl -X 'PATCH' \
  'http://[::1]:3000/flow/643fcfe30eaf231a283a539a/approval_gateway' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "local": "no"
}'
```

__Response:__ because of `some_task` is a user task at this state based on [diagram](#diagram) we need to pause flow, therefor another request needed to complete this task.

```json
{
  "_id": "643fcfe30eaf231a283a539a",
  "data": {
    "global": "Hi, Hello no!",
    "_id": "643fcfe30eaf231a283a539b"
  },
  "status": "paused",
  "tokens": [
    {
      "id": "cc5c8c5baa370eec",
      "history": [
        {
          "ref": "StartEvent_0do01j4",
          "status": "completed",
          "value": null,
          "name": "start"
        },
        {
          "ref": "Activity_0mra47f",
          "status": "completed",
          "value": null,
          "name": "initial_task"
        },
        {
          "ref": "Gateway_0az0yjr",
          "status": "completed",
          "value": {
            "local": "no"
          },
          "name": "approval_gateway"
        },
        {
          "ref": "Activity_1v0hfx6",
          "status": "paused",
          "value": null,
          "name": "some_task"
        }
      ]
    }
  ],
  "__v": 0
}
```

### _Step 4_

Finishing flow by resuming task `some_task`.

```sh
curl -X 'PATCH' \
  'http://[::1]:3000/flow/643fcfe30eaf231a283a539a/some_task' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "local": "done"
}'
```

__Response:__ status of context is terminated and could not resume again.

```json
{
  "_id": "643fcfe30eaf231a283a539a",
  "data": {
    "global": "Hi, Hello no!, received a value from previous task(some value(done) to end event.)",
    "_id": "643fcfe30eaf231a283a539b"
  },
  "status": "terminated",
  "tokens": [
    {
      "id": "cc5c8c5baa370eec",
      "history": [
        {
          "ref": "StartEvent_0do01j4",
          "status": "completed",
          "value": null,
          "name": "start"
        },
        {
          "ref": "Activity_0mra47f",
          "status": "completed",
          "value": null,
          "name": "initial_task"
        },
        {
          "ref": "Gateway_0az0yjr",
          "status": "completed",
          "value": {
            "local": "no"
          },
          "name": "approval_gateway"
        },
        {
          "ref": "Activity_1v0hfx6",
          "status": "completed",
          "value": {
            "local": "done"
          },
          "name": "some_task"
        },
        {
          "ref": "Event_13pwumb",
          "status": "terminated",
          "value": {
            "local": "some value(done) to end event."
          },
          "name": "end"
        }
      ]
    }
  ],
  "__v": 0
}
```

## Scenario 2: Requested Service Approved

### _Step 1_

Create a flow by posting a request with plain data `Hi`.

```sh
curl --request POST \
  --url http://localhost:3000/flow \
  --header 'Content-Type: application/json' \
  --data '{
  "global": "Hi"
}'
```

__Response:__ would like be previous [scenario](#scenario-1-requested-service-not-approved) but it has different id.

### _Step 2_

Resuming the flow by posting a `PATCH` request with `Vahid` response by user.

```sh
curl -X 'PATCH' \
  'http://[::1]:3000/flow/643fe71df232a501b76cd7d6/approval_gateway' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "local": "Vahid"
}'
```

__Response:__ because of `another_task` is a user task at this state based on [diagram](#diagram) we need to pause flow, therefor another request needed to complete this task.

```json
{
  "_id": "643fe71df232a501b76cd7d6",
  "data": {
    "global": "Hi, Hello Vahid!",
    "_id": "643fe71df232a501b76cd7d7"
  },
  "status": "paused",
  "tokens": [
    {
      "id": "9f053a81fa64e7fa",
      "history": [
        {
          "ref": "StartEvent_0do01j4",
          "status": "completed",
          "value": null,
          "name": "start"
        },
        {
          "ref": "Activity_0mra47f",
          "status": "completed",
          "value": null,
          "name": "initial_task"
        },
        {
          "ref": "Gateway_0az0yjr",
          "status": "completed",
          "value": {
            "local": "Vahid"
          },
          "name": "approval_gateway"
        },
        {
          "ref": "Gateway_0du1v6k",
          "status": "terminated",
          "value": null,
          "name": "parallel_gateway"
        }
      ],
      "locked": true
    },
    {
      "id": "f44c569ffee96983",
      "history": [
        {
          "ref": "Activity_1yl745l",
          "status": "completed",
          "value": null,
          "name": "do_some_work"
        },
        {
          "ref": "Gateway_0ll1i6q",
          "status": "paused",
          "value": null
        }
      ],
      "parent": "9f053a81fa64e7fa"
    },
    {
      "id": "772454979815fdc1",
      "history": [
        {
          "ref": "Activity_1mzlm3i",
          "status": "paused",
          "value": null,
          "name": "another_task"
        }
      ],
      "parent": "9f053a81fa64e7fa"
    }
  ],
  "__v": 0
}
```

### _Step 3_

Resuming the flow by posting a `PATCH` request with `Finished Successfully` response by user.

```sh
curl -X 'PATCH' \
  'http://[::1]:3000/flow/643fe71df232a501b76cd7d6/another_task' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "local": "Finished Successfully"
}'
```

__Response:__ because of `review` is a user task at this state based on [diagram](#diagram) we need to pause flow, therefor another request needed to complete this task.

```json
{
  "_id": "643fe71df232a501b76cd7d6",
  "data": {
    "global": "Hi, Hello Vahid!",
    "_id": "643fe71df232a501b76cd7d7"
  },
  "status": "paused",
  "tokens": [
    {
      "id": "9f053a81fa64e7fa",
      "history": [
        {
          "ref": "StartEvent_0do01j4",
          "status": "completed",
          "value": null,
          "name": "start"
        },
        {
          "ref": "Activity_0mra47f",
          "status": "completed",
          "value": null,
          "name": "initial_task"
        },
        {
          "ref": "Gateway_0az0yjr",
          "status": "completed",
          "value": {
            "local": "Vahid"
          },
          "name": "approval_gateway"
        },
        {
          "ref": "Gateway_0du1v6k",
          "status": "terminated",
          "value": null,
          "name": "parallel_gateway"
        }
      ],
      "locked": true
    },
    {
      "id": "f44c569ffee96983",
      "history": [
        {
          "ref": "Activity_1yl745l",
          "status": "completed",
          "value": null,
          "name": "do_some_work"
        },
        {
          "ref": "Gateway_0ll1i6q",
          "status": "terminated",
          "value": null
        }
      ],
      "parent": "9f053a81fa64e7fa",
      "locked": true
    },
    {
      "id": "772454979815fdc1",
      "history": [
        {
          "ref": "Activity_1mzlm3i",
          "status": "completed",
          "value": {
            "local": "Finished Successfully"
          },
          "name": "another_task"
        },
        {
          "ref": "Activity_1cqjzpt",
          "status": "completed",
          "value": null,
          "name": "pay_money"
        },
        {
          "ref": "Gateway_0ll1i6q",
          "status": "terminated",
          "value": null
        }
      ],
      "parent": "9f053a81fa64e7fa",
      "locked": true
    },
    {
      "id": "191b71808f807535",
      "history": [
        {
          "ref": "Gateway_0ll1i6q",
          "status": "completed",
          "value": null
        },
        {
          "ref": "Activity_0thx22h",
          "status": "paused",
          "value": null,
          "name": "review"
        }
      ]
    }
  ],
  "__v": 0
}
```

### _Step 4_

Finishing flow by resuming task `review`.

```sh
curl -X 'PATCH' \
  'http://[::1]:3000/flow/643fe71df232a501b76cd7d6/review' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "local": "review"
}'
```

__Response:__ status of context is terminated and could not resume again.

```json
{
  "_id": "643fe71df232a501b76cd7d6",
  "data": {
    "global": "Hi, Hello Vahid!, received a value from previous task(review to end event.)",
    "_id": "643fe71df232a501b76cd7d7"
  },
  "status": "terminated",
  "tokens": [
    {
      "id": "9f053a81fa64e7fa",
      "history": [
        {
          "ref": "StartEvent_0do01j4",
          "status": "completed",
          "value": null,
          "name": "start"
        },
        {
          "ref": "Activity_0mra47f",
          "status": "completed",
          "value": null,
          "name": "initial_task"
        },
        {
          "ref": "Gateway_0az0yjr",
          "status": "completed",
          "value": {
            "local": "Vahid"
          },
          "name": "approval_gateway"
        },
        {
          "ref": "Gateway_0du1v6k",
          "status": "terminated",
          "value": null,
          "name": "parallel_gateway"
        }
      ],
      "locked": true
    },
    {
      "id": "f44c569ffee96983",
      "history": [
        {
          "ref": "Activity_1yl745l",
          "status": "completed",
          "value": null,
          "name": "do_some_work"
        },
        {
          "ref": "Gateway_0ll1i6q",
          "status": "terminated",
          "value": null
        }
      ],
      "parent": "9f053a81fa64e7fa",
      "locked": true
    },
    {
      "id": "772454979815fdc1",
      "history": [
        {
          "ref": "Activity_1mzlm3i",
          "status": "completed",
          "value": {
            "local": "Finished Successfully"
          },
          "name": "another_task"
        },
        {
          "ref": "Activity_1cqjzpt",
          "status": "completed",
          "value": null,
          "name": "pay_money"
        },
        {
          "ref": "Gateway_0ll1i6q",
          "status": "terminated",
          "value": null
        }
      ],
      "parent": "9f053a81fa64e7fa",
      "locked": true
    },
    {
      "id": "191b71808f807535",
      "history": [
        {
          "ref": "Gateway_0ll1i6q",
          "status": "completed",
          "value": null
        },
        {
          "ref": "Activity_0thx22h",
          "status": "completed",
          "value": {
            "local": "review"
          },
          "name": "review"
        },
        {
          "ref": "Event_13pwumb",
          "status": "terminated",
          "value": {
            "local": "review to end event."
          },
          "name": "end"
        }
      ]
    }
  ],
  "__v": 0
}
```

## License

This project is licensed under the MIT License - SEE the [LICENSE](LICENSE) file for details
