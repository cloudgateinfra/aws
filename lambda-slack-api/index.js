# awslambdanodepoc
# https://github.com/example/aws-lambda-node-poc
const axios = require('axios');

exports.handler = async (event) => {

    //This function is a super primitive ETL function running on AWS Lambda. What it does:
    // 1) Pull JSON Data from example
    // 2) Post the JSON to the example #lambda_posts channel

    let apiInfoResp = null;
    let requestData = event.body ? JSON.parse(event.body) : event;
    let exampleJWT = requestData.exampleJWT;
    let exampleTargetGuid = requestData.exampleTargetGuid
    let exampleBaseURL = requestData.exampleBaseURL
    let eventType = requestData.eventType
    let slackPostUrl = process.env.slack_post_url
    let imageURL = null

    let config = {
        headers: {
            "X-Auth-Token": exampleJWT,
        }
    }

    //EXTRACT the data
    try {
        switch (eventType){
            case "inventory-model":
                apiInfoResp = await axios.get(exampleBaseURL + '/f5/api/inventory-model/' + exampleTargetGuid, config);
                imageURL = await axios.get(exampleBaseURL + '/f5/api/inventory-model/' + exampleTargetGuid + '/imageUrl', config).data
                break;
            case "contact":
                apiInfoResp = await axios.get(exampleBaseURL + '/f5/api/contact/' + exampleTargetGuid, config);
                imageURL = "Not Implemented";
                break;
        }
    } catch (error) {
        console.error(error);
    }

    //TRANSFORM the data - no transformation of data in this POC

    //LOAD the data
    try {
        //post to #lambda_posts channel
        let slackData = {
            "text": "AWS Lambda Data Post\n" +
                "example Data Source: " + exampleBaseURL +
                "\nEvent Type: " + eventType +
                "\nImage URL: " + JSON.stringify(imageURL) +
                "\n\n" + JSON.stringify(apiInfoResp.data)
        }

        let slackResp = await axios.post(slackPostUrl, slackData);
    } catch (error) {
        console.error(error);
    }

    const response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Headers" : "*",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
        body: "ETL Action complete for '" + eventType + "' and exampleTargetGuid " + exampleTargetGuid
    };
    return response;
};
