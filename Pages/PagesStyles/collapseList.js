function changeVisibilityStatus(collapsibleListIndex) {
  var content = document.querySelectorAll(".collapsibleList")[collapsibleListIndex]
  var collapsibleIcon = document.querySelectorAll(".collapsibleIcon")[collapsibleListIndex];

  if (content.style.display == "none") {
    content.style.display = "block";
    collapsibleIcon.innerHTML = "&#10134";
  } else {
    content.style.display = "none";
    collapsibleIcon.innerHTML = "&#10133"

  }
}