console.log("Client side javascipt file is loaded");

const weatherForm = document.querySelector("form");
const searchQuery = document.querySelector("input");
const messageOne = document.getElementById("message-1");
const messageTwo = document.getElementById("message-2");

messageOne.textContent = "";
messageTwo.textContent = "";

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const location = searchQuery.value;
    
    messageOne.textContent = "Loading...";
    messageTwo.textContent = "";

    fetch("http://localhost:3000/weather?address=" + location).then((response) => {
    // the first "then" is called when data arrives, the second then is called when it is parsed.
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error;
        } else {
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
        }
    })
});


}) 