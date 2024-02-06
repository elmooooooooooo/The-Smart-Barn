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

let newHourCheck = [false, false];
let newDayCheck = [false, false];

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

window.onload = function () {
    console.log("hello");
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

    renderEverything();
    getAndPlaceMinuteData(temperatureDataPointsPerMinute, temperatureDataPointsPerHour, temperatureDataPointsPerDay, chartPerMinute, chartPerHour, chartPerDay, 'graph1temp', 'graph2temp', 'graph3temp', 1);
    getAndPlaceMinuteData(humidityDataPointsPerMinute, humidityDataPointsPerHour, humidityDataPointsPerDay, chartPerMinute, chartPerHour, chartPerDay, 'graph1hum', 'graph2hum', 'graph3hum', 2);
}