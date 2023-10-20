const dataURL = "http://172.16.1.107:5000";
function requestData() {
    const fetchPromise = fetch(dataURL);
    fetchPromise.then(response => {
        return response.json();
    }).then(data => {
        transferData(data)
    });
}

function transferData(data) {
    document.getElementById("text").innerHTML = data;
    dataArray = Object.entries(data)
    console.log(dataArray)
    writeCSV(dataArray);
}

function writeCSV(data) {
    let csvContent = "data:text/csv;charset=utf-8" + data.map(e => e.join(",")).join("\n");
    var encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
}
