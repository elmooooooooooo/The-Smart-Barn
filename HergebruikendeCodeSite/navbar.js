fetch("../HergebruikendeCodeSite/navbar.html")
  .then(response => {
    return response.text()
  })
  .then(data => {
    document.querySelector("navigatiebalk").innerHTML = data;
  });

function setActiveNavButton(currentPage)
{
    if (document.getElementById(currentPage) == null) {
        setTimeout(() => {
            setActiveNavButton(currentPage);
        }, 100);
    } else {
        document.querySelector(`#${currentPage}`).classList.remove("navbutton");
        document.querySelector(`#${currentPage}`).classList.add("navbutton_active");
        
    }
}