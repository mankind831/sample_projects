// Import required AWS SDK clients and commands for Node.js
import { CreateTableCommand } from "@aws-sdk/client-dynamodb";
import _ from "lodash";
import { client } from "../lib/client/dynamo";

const params = [{
    AttributeDefinitions: [
      {
          AttributeName: "transNo", //ATTRIBUTE_NAME_2
          AttributeType: "S", //ATTRIBUTE_TYPE
      },
      {
          AttributeName: "empID", //ATTRIBUTE_NAME_2
          AttributeType: "S", //ATTRIBUTE_TYPE
      },
    ],
    KeySchema: [
      {
        AttributeName: "transNo", //ATTRIBUTE_NAME_1
        KeyType: "HASH",
      },
      {
        AttributeName: "empID", //ATTRIBUTE_NAME_1
        KeyType: "RANGE",
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
    TableName: "Absent", //TABLE_NAME
    StreamSpecification: {
      StreamEnabled: false,
    },
  },
  {
    AttributeDefinitions: [
      {
          AttributeName: "adminID", //ATTRIBUTE_NAME_2
          AttributeType: "S", //ATTRIBUTE_TYPE
      },
    ],
    KeySchema: [
      {
        AttributeName: "adminID", //ATTRIBUTE_NAME_1
        KeyType: "HASH",
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
    TableName: "Admin", //TABLE_NAME
    StreamSpecification: {
      StreamEnabled: false,
    },
  },{
    AttributeDefinitions: [
      {
          AttributeName: "accountID", //ATTRIBUTE_NAME_2
          AttributeType: "S", //ATTRIBUTE_TYPE
      },
      {
          AttributeName: "email", //ATTRIBUTE_NAME_2
          AttributeType: "S", //ATTRIBUTE_TYPE
      },
    ],
    KeySchema: [
      {
        AttributeName: "accountID", //ATTRIBUTE_NAME_1
        KeyType: "HASH",
      },
      {
        AttributeName: "email", //ATTRIBUTE_NAME_1
        KeyType: "RANGE",
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
    TableName: "Account", //TABLE_NAME
    StreamSpecification: {
      StreamEnabled: false,
    },
  },{
    AttributeDefinitions: [
      {
          AttributeName: "compID", //ATTRIBUTE_NAME_2
          AttributeType: "S", //ATTRIBUTE_TYPE
      },
    ],
    KeySchema: [
      {
        AttributeName: "compID", //ATTRIBUTE_NAME_1
        KeyType: "HASH",
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
    TableName: "Company", //TABLE_NAME
    StreamSpecification: {
      StreamEnabled: false,
    },
  },{
    AttributeDefinitions: [
      {
          AttributeName: "empID", //ATTRIBUTE_NAME_2
          AttributeType: "S", //ATTRIBUTE_TYPE
      },
      {
          AttributeName: "accountID", //ATTRIBUTE_NAME_2
          AttributeType: "S", //ATTRIBUTE_TYPE
      },
    ],
    KeySchema: [
      {
        AttributeName: "empID", //ATTRIBUTE_NAME_1
        KeyType: "HASH",
      },
      {
        AttributeName: "accountID", //ATTRIBUTE_NAME_1
        KeyType: "RANGE",
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
    TableName: "Employee", //TABLE_NAME
    StreamSpecification: {
      StreamEnabled: false,
    },
  },{
    AttributeDefinitions: [
      {
          AttributeName: "employerID", //ATTRIBUTE_NAME_2
          AttributeType: "S", //ATTRIBUTE_TYPE
      },
    ],
    KeySchema: [
      {
        AttributeName: "employerID", //ATTRIBUTE_NAME_1
        KeyType: "HASH",
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
    TableName: "Employer", //TABLE_NAME
    StreamSpecification: {
      StreamEnabled: false,
    },
  },{
    AttributeDefinitions: [
      {
          AttributeName: "transNo", //ATTRIBUTE_NAME_2
          AttributeType: "S", //ATTRIBUTE_TYPE
      },
      {
          AttributeName: "empID", //ATTRIBUTE_NAME_2
          AttributeType: "S", //ATTRIBUTE_TYPE
      },
    ],
    KeySchema: [
      {
        AttributeName: "transNo", //ATTRIBUTE_NAME_1
        KeyType: "HASH",
      },
      {
        AttributeName: "empID", //ATTRIBUTE_NAME_1
        KeyType: "RANGE",
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
    TableName: "Leave", //TABLE_NAME
    StreamSpecification: {
      StreamEnabled: false,
    },
  },{
    AttributeDefinitions: [
      {
          AttributeName: "transNo", //ATTRIBUTE_NAME_2
          AttributeType: "S", //ATTRIBUTE_TYPE
      },
      {
          AttributeName: "empID", //ATTRIBUTE_NAME_2
          AttributeType: "S", //ATTRIBUTE_TYPE
      },
    ],
    KeySchema: [
      {
        AttributeName: "transNo", //ATTRIBUTE_NAME_1
        KeyType: "HASH",
      },
      {
        AttributeName: "empID", //ATTRIBUTE_NAME_1
        KeyType: "RANGE",
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
    TableName: "Overtime", //TABLE_NAME
    StreamSpecification: {
      StreamEnabled: false,
    },
  }];

  const run = () => {
    _.each(params, async (table) => {
        try {
            const data = await client.send(new CreateTableCommand(table));
            console.log("Table Created", data);
            return data;
          } catch (err) {
            console.log("Error", err);
          }
    })
  };
  run();