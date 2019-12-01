var AWS = require('aws-sdk');

const docClient = new AWS.DynamoDB.DocumentClient({region: 'eu-central-1'});

exports.handler = async (event) => {

    const params = {
        TableName: "masters-pf"
      };

    return new Promise(function (resolve, reject) {
        docClient.scan(params, function (err, data) {
            if (err) {
                console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                resolve({
                    statusCode: 200,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': true,
                      },
                    body: JSON.stringify(data)
                });
            }
        });
    });
};
