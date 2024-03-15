fetch("../HergebruikendeCodeSite/navbar.html")
  .then(response => {
    return response.text()
  })
  .then(data => {
    document.querySelector("navigatiebalk").innerHTML = data;
  });

window.onresize = function (e) {
  if (document.body.clientWidth > 1000) {
    document.getElementById("mobileMenu").style.display = "none";
    document.getElementById("hamburgerCheckBox").checked = false;
  }
}

function setActiveNavButton(currentPage) {
  if (document.getElementById(currentPage) == null) {
    setTimeout(() => {
      setActiveNavButton(currentPage);
    }, 100);
  } else {
    document.querySelector(`#${currentPage}`).classList.remove("navbutton");
    document.querySelector(`#${currentPage}`).classList.add("navbutton_active");

  }
}

function onLogin(currentPage) {
  if (document.getElementById(currentPage) == null) {
    setTimeout(() => {
      onLogin(currentPage);
    }, 100);
  } else if (netlifyIdentity.currentUser()) {
    document.getElementById('login').innerHTML = 'Data';
    document.getElementById('login').href = '/pages/Data.html';
    document.getElementById('login2').innerHTML = 'Data';
    document.getElementById('login2').href = '/pages/Data.html';
  }
}