var AWS = require('aws-sdk');
var fs = require('fs');
const AWS_REGION = 'eu-central-1';
const API_VERSION = '2012-08-10';

const itemObjectEmpty = {}
function populateObject(obj, keys, values) {
    keys.forEach(function (key) {
        obj[key] = values[key];
    });
    return itemObjectEmpty;
};

const generateTableStructure = (tableName, keys, item) => ({
    TableName: tableName,
    Item: populateObject(itemObjectEmpty, keys, item)
})

function setAWSregion() {
    AWS.config.update({ region: AWS_REGION });
}

class DynamoDBQueries {

    getAvailableTableNames() {
        setAWSregion();

        var ddb = new AWS.DynamoDB({ apiVersion: API_VERSION });

        return new Promise(function (resolve, reject) {
            ddb.listTables({ Limit: 10 }, function (err, data) {
                if (err) {
                    console.log("Error", err.code);
                } else {
                    resolve(data.TableNames);
                }
            });
        });
    }

    importJSONToTable(JSONfileName, tableName, keys, itemKeyIndex = 0, encoding = 'utf8') {
        setAWSregion();

        var docClient = new AWS.DynamoDB.DocumentClient();

        console.log("Importing data into DynamoDB. Please wait.");

        var allItems = JSON.parse(fs.readFileSync(JSONfileName, encoding));
        allItems.forEach(function (item) {
            var params = generateTableStructure(tableName, keys, item)

            docClient.put(params, function (err, data) {
                if (err) {
                    console.error("Unable to add item: " + item[Object.keys(item)[itemKeyIndex]], ". Error JSON:", JSON.stringify(err, null, 2));
                } else {
                    console.log("Item added: " + item[Object.keys(item)[itemKeyIndex]]);
                }
            });
        });

    };

}

var DynDBQueries = new DynamoDBQueries();

DynDBQueries.getAvailableTableNames().then((result) => {
    console.log(result);
  });


  const tableKeys = ['id', 'promo', 'content'];
  const tableName = 'masters-pf';
  const path = process.argv[2].toString();
  DynDBQueries.importJSONToTable(path, tableName, tableKeys);
  