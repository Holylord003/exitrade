const ObjectsToCsv = require('objects-to-csv');
 
exports.dataToCsv = (data, outputName) => {
    return new Promise((resolve, reject) => {
        const csv = new ObjectsToCsv(data);
        csv.toDisk(`./${outputName}.csv`);
        return resolve()
        
     })
 }
