"use strict";

console.log("Hey");

const outputDiv = document.getElementById("output")
function render(){
    const headline = "Hello!";
    const name = "Lue";
    const title = "Software Developer";
    const desc = "Working to empower the world with code.";
    const profilePic = "https://apod.masa.gov/apod/image/2401/ngc1232b_vlt_960.jpg";

    const h2 = document.createElement("h2")
    h2.textContent = headline

    const nameP = document.createElement("p")
    nameP.textContent = name

    const titleP = document.createElement("p")
    titleP.textContent = title

    const descP = document.createElement("p")
    descP.textContent = desc

    const img = document.createElement("img")
    img.src = profilePic
    img.alt = "This is the users profile pic"

    outputDiv.appendChild(h2);
    outputDiv.appendChild(name);
    outputDiv.appendChild(title);
    outputDiv.appendChild(desc);
    outputDiv.appendChild(img);
}
render();