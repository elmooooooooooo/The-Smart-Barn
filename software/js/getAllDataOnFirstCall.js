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

function pushFromCsvData(list, data, date) {
    var yData = parseInt(data)
    list.push({
        x: counter, y: yData, label: date
    });
}

function saveDataInArrays() {
    if (csvData[0] != undefined) {
        for (var index = 0; index < csvData.length; index++) {
            pushFromCsvData(temperatureDataPointsPerMinute, csvData[index][1], csvData[index][0]);
            pushFromCsvData(humidityDataPointsPerMinute, csvData[index][2], csvData[index][0]);
            if (temperatureDataPointsPerMinute.length > 60) {
                pushFromCsvData(temperatureDataPointsPerHour, averageOfList(temperatureDataPointsPerMinute), temperatureDataPointsPerMinute[temperatureDataPointsPerMinute.length - 1]["label"]);
                temperatureDataPointsPerMinute.splice(0, temperatureDataPointsPerMinute.length)
                pushFromCsvData(humidityDataPointsPerHour, averageOfList(humidityDataPointsPerMinute), humidityDataPointsPerMinute[humidityDataPointsPerMinute.length - 1]["label"]);
                humidityDataPointsPerMinute.splice(0, humidityDataPointsPerMinute.length);
            }

            if (temperatureDataPointsPerHour.length > 24) {
                pushFromCsvData(temperatureDataPointsPerDay, averageOfList(temperatureDataPointsPerHour), temperatureDataPointsPerHour[temperatureDataPointsPerHour.length - 1]["label"]);
                temperatureDataPointsPerHour.splice(0, temperatureDataPointsPerHour.length);
                pushFromCsvData(humidityDataPointsPerDay, averageOfList(humidityDataPointsPerHour), humidityDataPointsPerHour[humidityDataPointsPerHour.length - 1]["label"]);
                humidityDataPointsPerHour.splice(0, humidityDataPointsPerHour.length);
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
