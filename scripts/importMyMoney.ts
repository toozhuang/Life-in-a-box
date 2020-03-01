/** 1/3/2020
 *   作者: Wang
 *   功能: 导入随手记账单信息,并把csv转化成json文件
 * 然后放到数据库
 */

const csv2json=require("csvtojson");

const csvFilePath = './data/mymoney.csv';


const readFile = csv2json()
    .fromFile(csvFilePath);

readFile.then(value=>console.log(value));

    // .then((jsonObj) => {
    //     console.log(jsonObj);
    //     /**
    //      * [
    //      *    {a:"1", b:"2", c:"3"},
    //      *    {a:"4", b:"5". c:"6"}
    //      * ]
    //      */
    // });
