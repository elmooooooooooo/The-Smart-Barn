var filePath = ""
var csvData = []
var loadingDone = false;

function getFilePath() {
    let date = new Date();
    return filePath = `/data_${date.getFullYear()}-${always2TimeDigits(date.getMonth() + 1)}.csv`
}

function readTextFile(file, callback) { // lees json file
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

function getAllData() {
    readTextFile(getFilePath(), function (text) {
        var lines = text.split("\r\n");
        lines.pop(); // get rid of empty string

        for (var index = 0; index < lines.length; index++) {
            var singleDataLine = []
            var line = lines[index].split(",");
            for (var nestedIndex = 0; nestedIndex < line.length; nestedIndex++) {
                singleDataLine.push(line[nestedIndex]);
            }
            csvData.push(singleDataLine)
        }
    });
}

function pushFromCsvData(list, csvIndex, dataIndex) {
    var yData = parseInt(csvData[csvIndex][dataIndex])
    list.push({
        x: counter, y: yData, label: csvData[csvIndex][0]
    });
}

function saveDataInArrays() {
    if (csvData[0] != undefined) {
        for (var index = 0; index < csvData.length; index++) {
            pushFromCsvData(temperatureDataPointsPerMinute, index, 1);
            pushFromCsvData(humidityDataPointsPerMinute, index, 2);
if (temperatureDataPointsPerMinute.length >= 60) {
pushFromCsvData(temperatureDataPointsPerHour, averageOfList(temperatureDataPointsPerMinute);
temperatureDataPointsPerMinute = [];
pushFromCsvData(humidityDataPointsPerHour, averageOfList(humidityDataPointsPerMinute);
humidityDataPointsPerMinute = [];
}

if (temperatureDataPointsPerHour.length >= 24) {
pushFromCsvData(temperatureDataPointsPerDay, averageOfList(temperatureDataPointsPerHour);
temperatureDataPointsPerDay = [];
pushFromCsvData(humidityDataPointsPerDay, averageOfList(humidityDataPointsPerHour);
humidityDataPointsPerHour = [];
}

            counter++;

        }
        console.log(temperatureDataPointsPerMinute);
        loadingDone = true;
    } else {
        setTimeout(() => {
            saveDataInArrays()
        }, 100);
    }
}
