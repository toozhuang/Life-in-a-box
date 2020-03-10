/** 1/3/2020
 *   作者: Wang
 *   功能: 导入随手记账单信息,并把csv转化成json文件
 * 然后放到数据库
 */
const moment = require("moment");
const fs = require('fs');
const csv2json = require("csvtojson");      // note 这里倒入的是版本2+的 csvjson
import * as AWS from 'aws-sdk';

const credentials = new AWS.SharedIniFileCredentials({profile: 'sisi-account'});

AWS.config.credentials = credentials;
AWS.config.update({region: 'ap-east-1'});

const ddb = new AWS.DynamoDB();


const csvFilePath = './data/mymoney.csv';

const MoneyKey: Array<string> = [
    'type',
    'createdDate',
    'category',
    'subCategory',
    'project',
    'account',
    'currency',
    'amount',
    'member',
    'from',
    'note',
    'relatedId'];


const writeToJson = (moneyRecord: any[]) => {


    const streamFile = fs.createWriteStream('../wang-box/src/mock/data.json');

    streamFile.write('[')
    moneyRecord.forEach(item => {
        streamFile.write(JSON.stringify(item));
        streamFile.write(",");
    })
    streamFile.write(']');

    streamFile.end()
}

csv2json({noheader: true, nullObject: false})
    .fromFile(csvFilePath)
    .then((value: Array<any>) => {
        let moneyRecord = [];
        value.forEach((item, index) => {
            if (index < 2) {
                return;
            } else {

                const singleRecord = {};
                Object.keys(item).map((key, orderIndex) => {
                    singleRecord[MoneyKey[orderIndex]] = item[key]
                        ? item[key] : null;
                });
                const dateInUnixString = moment(singleRecord['createdDate']).unix().toString();
                singleRecord['uuid'] = dateInUnixString;
                // 日期同样存储为 unix的时间
                singleRecord['createdDate'] = dateInUnixString;
                moneyRecord.push(
                    singleRecord
                );

            }

        });

        console.log(moneyRecord);

        writeToJson(moneyRecord);


        /**
         * 逐一 把随手记里面的数据发送过去，
         * 这样的好处是，对于插入操作，更容易debug
         * 而且每次更新以后的覆盖更加under track
         */
        moneyRecord.forEach((record, index) => {
            return;
            const transformRecord = {};
            Object.keys(record).map(theKey => {
                transformRecord[theKey] = record[theKey] ? {'S': record[theKey]} : {NULL: true};
            });
            const params = {
                TableName: "mymoney",
                Item: transformRecord
            };

            const singlePutPromise = (params) => {
                return ddb.putItem(params).promise()
            };

            singlePutPromise(params).then().catch(error => {
                console.log(index, 'error: ', error,)
            });
        });

    })
;





