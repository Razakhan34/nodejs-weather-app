console.log("client side js is loaded");
const weatherForm = document.querySelector(".weather-form");
const messageOne = document.querySelector(".messageOne");
const messageTwo = document.querySelector(".messageTwo");

weatherForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const address = weatherForm.address.value;

  messageOne.textContent = "Loading....";
  messageTwo.textContent = "";

  fetch(`http://localhost:5000/weather?address=${address}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
        return;
      }
      messageOne.textContent = data.location;
      messageTwo.textContent = data.forecastData;
    });
});
