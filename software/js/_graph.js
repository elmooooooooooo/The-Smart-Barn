var chartPerMinute;
var chartPerHour;
var chartPerDay;
var previousHour = getHour();
var previousDay = getDay();
var counter = 0
var temperatureDataPointsPerMinute = [];
var humidityDataPointsPerMinute = [];

var temperatureDataPointsPerHour = [];
var humidityDataPointsPerHour = [];

var temperatureDataPointsPerDay = [];
var humidityDataPointsPerDay = [];

let graphType = {
    "graph1temp": true,
    "graph1hum": true,
    "graph2temp": true,
    "graph2hum": true,
    "graph3temp": true,
    "graph3hum": true
}

function renderEverything() {
    chartPerMinute.options.data[0].visible = graphType["graph1temp"];
    chartPerMinute.options.data[1].visible = graphType["graph1hum"];
    chartPerMinute.render();
    chartPerHour.options.data[0].visible = graphType["graph2temp"];
    chartPerHour.options.data[1].visible = graphType["graph2hum"];
    chartPerHour.render();
    chartPerDay.options.data[0].visible = graphType["graph3temp"];
    chartPerDay.options.data[1].visible = graphType["graph3hum"];
    chartPerDay.render();
}



function checkBox(graphID) {
    graphType[graphID] = !graphType[graphID];
    renderEverything()
}

function pushData(list, data) {
    var yData = parseInt(data)
    list.push({
        x: counter, y: yData, label: getDataDateString()
    });
}

function dataListOverflowProtection(list, maxLength) {
    if (list.length > maxLength) {
        list.splice(0, 1)
    }
}

function getAndPlaceMinuteData(minuteChart, hourChart, dayChart) {
    // $.getJSON("http://172.16.114.131:5000", function (data) { // school
    // $.getJSON("http://192.168.0.246:5000", function (data) { // thuis laptop
    // $.getJSON("http://192.168.0.221:5000", function (data) { // thuis pc
    // $.getJSON("http://192.168.0.13:5000", function (data) { 
    $.getJSON("http://172.16.118.128:5000", function (data) { 
        pushData(temperatureDataPointsPerMinute, data[1])
        pushData(humidityDataPointsPerMinute, data[2])

        dataListOverflowProtection(temperatureDataPointsPerMinute, 60)
        dataListOverflowProtection(humidityDataPointsPerMinute, 60)

        minuteChart.options.data[0].visible = graphType["graph1temp"];
        minuteChart.options.data[1].visible = graphType["graph1hum"];
        minuteChart.render();

        if (checkIfNewHour()) {
            getAndPlaceHourData(hourChart, dayChart);
        }

        counter++;
        setTimeout(() => {
            getAndPlaceMinuteData(minuteChart, hourChart, dayChart)
        }, 100);
    })
}

function getAndPlaceHourData(hourChart, dayChart) {

    pushData(temperatureDataPointsPerHour, averageOfList(temperatureDataPointsPerMinute))
    pushData(humidityDataPointsPerHour, averageOfList(humidityDataPointsPerMinute))

    dataListOverflowProtection(temperatureDataPointsPerHour, 24)
    dataListOverflowProtection(humidityDataPointsPerHour, 24)

    hourChart.options.data[0].visible = graphType["graph2temp"];
    hourChart.options.data[1].visible = graphType["graph2hum"];
    hourChart.render();

    if (checkIfNewDay()) {
        getAndPlaceDayData(dayChart);
    }
}

function getAndPlaceDayData(dayChart) {

    pushData(temperatureDataPointsPerDay, averageOfList(temperatureDataPointsPerHour))
    pushData(humidityDataPointsPerDay, averageOfList(temperatureDataPointsPerHour))

    dataListOverflowProtection(temperatureDataPointsPerDay, 365)
    dataListOverflowProtection(humidityDataPointsPerDay, 365)

    dayChart.options.data[0].visible = graphType["graph3temp"];
    dayChart.options.data[1].visible = graphType["graph3hum"];
    dayChart.render();
}

function firstLoadCycle(minuteChart, hourChart, dayChart) {
    if (loadingDone) {
        renderEverything();
        getAndPlaceMinuteData(minuteChart, hourChart, dayChart);
    } else {
        setTimeout(() => {
            firstLoadCycle(minuteChart, hourChart, dayChart);
        }, 100);
    }
}

window.onload = function () {
    console.log("data chart started");
    chartPerMinute = new CanvasJS.Chart("chartPerMinute", {
        title: {
            text: "Data of the last hour"
        },
        data: [{
            type: "line",
            visible: graphType["graph1temp"],
            dataPoints: temperatureDataPointsPerMinute,

        }, {
            type: "line",
            visible: graphType["graph1hum"],
            dataPoints: humidityDataPointsPerMinute
        }],

        axisY: {
            minimum: 0,
            maximum: 100
        }

    });
    chartPerHour = new CanvasJS.Chart("chartPerHour", {
        title: {
            text: "Data of the last 24 hours"
        },
        data: [{
            type: "line",
            dataPoints: temperatureDataPointsPerHour,
        },
        {
            type: "line",
            dataPoints: humidityDataPointsPerHour
        }],
        axisY: {
            minimum: 0,
            maximum: 100
        }
    });

    chartPerDay = new CanvasJS.Chart("chartPerDay", {
        title: {
            text: "Data of the last year"
        },
        data: [{
            type: "line",

            dataPoints: temperatureDataPointsPerDay,
        },
        {
            type: "line",
            dataPoints: humidityDataPointsPerDay
        }],
        axisY: {
            minimum: 0,
            maximum: 100
        }
    });
    console.log(`logging file found on ${getFilePath()}`)
    // console.log(`time started ${}`)
    getAllData();
    saveDataInArrays();
    // loadingDone = true;
    firstLoadCycle(chartPerMinute, chartPerHour, chartPerDay);
}