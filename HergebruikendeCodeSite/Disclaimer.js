fetch("../HergebruikendeCodeSite/Disclaimer.html")
  .then(response => {
    return response.text()
  })
  .then(data => {
    document.querySelector("disclaimer").innerHTML = data;
  });
