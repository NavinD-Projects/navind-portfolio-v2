const ham = document.querySelector('.hamburger');
const nav = document.querySelector('nav ul');
//hamberger tog//
ham.addEventListener('click', () => {
  nav.classList.toggle('active');
  ham.classList.toggle('active');
});
document.querySelector('.container').addEventListener("submit", function (event) {
  event.preventDefault();
  let val = true;
  const name = document.getElementById("name").value.trim();
  if (name === "") {
    document.getElementById("nameErr").innerText = "Name is required";
    val = false;
  }
  else {
    document.getElementById("nameErr").innerText = "";
  }
  const email = document.getElementById("email").value.trim();
  const emailpat = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!email.match(emailpat)) {
    document.getElementById("emailErr").innerText = "enter valid mail";
    val = false;
  }
  else {
    document.getElementById("emailErr").innerText = "";
  }
  const msg = document.getElementById("message").value.trim();
  if (msg === "") {
    document.getElementById("msgErr").innerText = "Message cannot be empty";
    val = false;
  }
  else {
    document.getElementById("msgErr").innerText = "";
  }

  if (val) {
    alert("form submitted successfully! ");
  }
})

const toggle = document.querySelector("nav .toggle");
toggle.addEventListener("click", function () {
  this.classList.toggle("active");
  document.body.classList.toggle("dark");
});