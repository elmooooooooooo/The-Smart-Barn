const dataURL = "http://172.16.1.107:5000"
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
}