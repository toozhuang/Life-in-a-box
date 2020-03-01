/** 1/3/2020
 *   作者: Wang
 *   功能: 导入随手记账单信息,并把csv转化成json文件
 * 然后放到数据库
 */

const Papa = require("papaparse");

const csvFilePath = './data/mymoney.csv';

Papa.parse(csvFilePath, {delimiter: ","},(err,result)=>{
  console.log(result);
});