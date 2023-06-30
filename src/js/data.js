"use strict";

const result = new Array();
const school = new Array();
const glossary = new Array();
var cities = new Array();
const agents = new Array();

//console.log(result);
//console.log(school);
//console.log(glossary);

$(function() {
    /* set up XMLHttpRequest */
    var url = "src/data/datasets.xlsx";
    var oReq = new XMLHttpRequest();
    oReq.open("GET", url, true);
    oReq.responseType = "arraybuffer";

    /* A function that is called when the XMLHttpRequest is loaded. */
    oReq.onload = function() {
        var arraybuffer = oReq.response;

        var data = new Uint8Array(arraybuffer);

        var workbook = XLSX.read(data, { type: 'array' });
        //result.push(workbook.SheetNames);
        let i = 0;
        /* Iterating through the sheets in the workbook and pushing the sheet name and the sheet data
        into the result array. */
        workbook.SheetNames.forEach(function(SheetNames) {
            var roa = XLSX.utils.sheet_to_json(workbook.Sheets[SheetNames], { header: 1 });
            // result.push(roa);
            result.push([workbook.SheetNames[i], roa]);
            i++;
        });

        //console.log(result);
        /* Pushing the data from the excel file into the arrays. */
        for (let h = 0; h < result[0][1].length; h++) {
            school.push(result[0][1][h]);
        }

        for (let k = 0; k < result[1][1].length; k++) {
            glossary.push(result[1][1][k]);
        }

        for (let j = 0; j < result[2][1].length; j++) {
            agents.push(result[2][1][j]);
        }

    }
    oReq.send();
});

export { result, school, glossary, cities, agents };