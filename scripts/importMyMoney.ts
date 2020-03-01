/** 1/3/2020
 *   作者: Wang
 *   功能: 导入随手记账单信息,并把csv转化成json文件
 * 然后放到数据库
 */

const csv2json = require("csvtojson");
import * as async from 'async';
import * as AWS from 'aws-sdk';

const credentials = new AWS.SharedIniFileCredentials({profile: 'sisi-account'});

AWS.config.credentials = credentials;
AWS.config.update({region: 'ap-east-1'});


const csvFilePath = './data/mymoney.csv';

//
// csv2json()
//     .fromFile(csvFilePath,
//         (err, result) => {
//             console.log(result);
//         });

// 下面是主要尝试一下 把 aws - sdk 拿来使用

const ddb = new AWS.DynamoDB();

// const params = {
//         RequestItems:
//             {
//                 'mymoney': {
//                     Item: {
//                         'uuid': {S: '001'},
//                         'CUSTOMER_NAME': {S: 'Richard Roe'}
//                     }
//                 }
//             }
//     }
// ;

const params = {
    RequestItems: {
        'mymoney': [
            {
                PutRequest:{
                    Item: {
                        'uuid': {S: '001'},
                        'name': {S: 'Richard Roe'}
                    }
                }
            },
            {
                PutRequest:{
                    Item: {
                        'uuid': {S: '002'},
                        'name': {S: '周旺'}
                    }
                }
            }
        ]
    }
};

// Call DynamoDB to add the item to the table
// ddb.putItem(params, function (err, data) {
//     if (err) {
//         console.log("Error", err);
//     } else {
//         console.log("Success", data);
//     }
// });
/**
 * 下面这个是 用 promise 的方式来解决这个问题
 * @param data
 */
const putData = async (data) => {
    try {
        const result = await ddb.batchWriteItem(data).promise();
        console.log(' resultLLL');
        return result;
    } catch (error) {
        console.log('error: ',);
    }
};

putData(params).then(result => {
    // console.log(result)
}).catch(error => {
    console.log('所以有错误：：： ');
});





