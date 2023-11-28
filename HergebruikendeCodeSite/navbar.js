fetch("../HergebruikendeCodeSite/navbar.html")
  .then(response => {
    return response.text()
  })
  .then(data => {
    document.querySelector("navigatiebalk").innerHTML = data;
  });
