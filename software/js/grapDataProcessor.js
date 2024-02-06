function getAndPlaceMinuteData(dataPointsPerMinute, dataPointsPerHour, dataPointsPerDay, minuteChart, hourChart, dayChart, graphTypePM, graphTypePH, graphTypePD, indexInData) {
    $.getJSON("http://172.16.114.131:5000", function (data) { // school
    // $.getJSON("http://192.168.0.246:5000", function (data) { // thuis laptop
        // $.getJSON("http://192.168.0.221:5000", function (data) { // thuis pc
        var yData = parseInt(data[indexInData])


        dataPointsPerMinute.push({
            x: counter, y: yData, label: getDataDateString()
        });

        if (dataPointsPerMinute.length > 60) {
            dataPointsPerMinute.splice(0, 1)
        }
        minuteChart.options.data[indexInData - 1].visible = graphType[graphTypePM];
        minuteChart.render();

        if (checkIfNewHour()) {
            newHourCheck = [true, true]
        }
        if (newHourCheck[indexInData - 1]) {
            getAndPlaceHourData(dataPointsPerMinute, dataPointsPerHour, dataPointsPerDay, hourChart, dayChart, graphTypePH, graphTypePD, indexInData);
            newHourCheck[indexInData - 1] = false;
        }

        counter++;
        setTimeout(() => {
            getAndPlaceMinuteData(dataPointsPerMinute, dataPointsPerHour, dataPointsPerDay, minuteChart, hourChart, dayChart, graphTypePM, graphTypePH, graphTypePD, indexInData)
        }, 100);
    })
}

function getAndPlaceHourData(dataPointsPerMinute, dataPointsPerHour, dataPointsPerDay, hourChart, dayChart, graphTypePH, graphTypePD, indexInData) {
    if (graphType[graphTypePH]) {
    }
    var yData = parseInt(averageOfList(dataPointsPerMinute));

    dataPointsPerHour.push({
        x: counter, y: yData, label: getDataDateString()
    });

    if (dataPointsPerHour.length > 24) {
        dataPointsPerHour.splice(0, 1);
    }
    if (checkIfNewDay()) {
        newDayCheck = [true, true];
    }
    if (newDayCheck[indexInData - 1]) {
        getAndPlaceDayData(dataPointsPerHour, dataPointsPerDay, dayChart, graphTypePD, indexInData);
        newDayCheck[indexInData - 1] = false;
    }

    hourChart.options.data[indexInData - 1].visible = graphType[graphTypePH];
    hourChart.render();
}

function getAndPlaceDayData(dataPointsPerHour, dataPointsPerDay, dayChart, graphTypePD, indexInData) {

    var yData = parseInt(averageOfList(dataPointsPerHour));

    dataPointsPerDay.push({
        x: counter, y: yData, label: getDataDateString()
    })

    if (dataPointsPerDay.length > 365) {
        dataPointsPerDay.splice(0, 1);
    }

    dayChart.options.data[indexInData - 1].visible = graphType[graphTypePD];
    dayChart.render();
}