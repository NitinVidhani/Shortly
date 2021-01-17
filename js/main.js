var form = document.querySelector(".form");
var input = document.querySelector(".input");
var results = document.querySelector(".results");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  var link = input.value;
  if (!link) {
    input.classList.add("error");
  } else {
    input.classList.remove("error");
    console.log("Success");
    fetch(`https://api.shrtco.de/v2/shorten?url=${link}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          console.log(data);
          results.innerHTML = ` <div class="result-links flex">
          <div class="original-link">${data.result.original_link}</div>
          <input class="short-link" value="${data.result.full_short_link}" readonly>
          <button class="btn" onclick="copyText()">Copy</button>
        </div>`;
        } else {
          document.querySelector(".error-message").innerText =
            "Some Error Occured";
        }
      });
  }
});
function copyText() {
  var myInput = document.querySelector(".short-link");
  myInput.select();
  document.execCommand("copy");
  var button = document.querySelector(".result-links .btn");
  button.innerText = "Copied";
  button.style.backgroundColor = "hsl(260, 8%, 14%)";
}
