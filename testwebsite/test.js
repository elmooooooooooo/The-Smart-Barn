const dataURL = "http://172.16.1.228:5000";
// const dataURL = "https://opentdb.com/api.php?amount=10";

requestData()

function requestData() {
    const fetchPromise = fetch(dataURL);
    fetchPromise.then(response => {
        return response.json();
    }).then(data => {
        transferData(data)
    }).catch(function (err) {
        console.log(err)
    });
}

function transferData(data) {
    document.getElementById("text").innerHTML = data;
    dataArray = Object.entries(data)
    console.log(dataArray)
    setTimeout(() => {
        requestData()
    }, 1000);
    // writeCSV(dataArray);
}

// function writeCSV(data) {
//     let csvContent = "data:text/csv;charset=utf-8" + data.map(e => e.join(",")).join("\n");
//     var encodedUri = encodeURI(csvContent);
//     window.open(encodedUri);
// }
