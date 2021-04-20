// Get the modal
var modal = document.getElementById("modalContainer");

// Get the button that opens the modal
var settingsIcon = document.getElementById("settingsIcon");

// Get the <span> element that closes the modal
var closeIcon = document.getElementById("close");

// When the user clicks on the button, open the modal
settingsIcon.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
closeIcon.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}