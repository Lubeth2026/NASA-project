"use strict";

console.log("Greetings!");


const form = document.getElementById("date");
const inputDate = document.getElementById("inputDate");
const statusDiv = document.getElementById("status");
const resultsDiv = document.getElementById("results");

function setStatus(message, isError){
    statusDiv.innerHTML = ""
    const p = document.createElement("p");
    p.textContent = message


    if(isError){
        p.classList.add("bg-red-400")
        p.classList.remove("bg-green-400");
    } else {
        p.classList.add("bg-green-400");
        p.classList.remove("bg-red-400"); 
    }
    statusDiv.appendChild(p);
}


function buildAPODURL (date, apiKey){
const base = "https://api.nasa.gov/planetary/apod";
const keyParam = "api_key=" + apiKey;
const dateParam = "date=" + date;
return base + "?" + keyParam + "&" + dateParam
}

async function fetchNasaData(url) {
    try {
        setStatus("Loading...", false)
        const res = await fetch(url)

        if(!res.ok){
            throw new Error("Error getting data");
        }
        const data = await res.json()
        setStatus("Success!")
        return data

    } catch (error) {
         setStatus("Error:",+ error.message, true );
        console.log(error)
    }
}

async function keyApiKey(){
    try {
        const options = {method: "POST"};
        const res = await fetch("https://proxy-key-t0ox.onrender.com/get-key3", options);

        if(!res.ok){
            throw new Error("Couldn't get key!!")
        }
        const data = await res.json()
        return data
    } catch (error) {
        console.log("Error:!", error.message)
    }
}

//this puts the content on the dom//
function render(nasaData){
     const h2 = document.createElement("h2")
     h2.textContent = nasaData.title

     const dateP = document.createElement("p")
     dateP.textContent = nasaData.date

     const explanationP = document.createElement("p")
     explanationP.textContent = nasaData.explanation

     const img = document.createElement("img")
     img.src = nasaData.url
     img.alt = nasaData.title

     resultsDiv.appendChild(h2);
     resultsDiv.appendChild(dateP);
     resultsDiv.appendChild(explanationP);
     resultsDiv.appendChild(img);
     
}
async function run() {
    try {
        const date = inputDate.value;
        const API_KEY = await keyApiKey();
        const url = buildAPODURL(date, API_KEY.key);
        const nasaData = await fetchNasaData(url);
        render(nasaData)
    } catch (error) {
        console.log(error)
    }
}





async function main() {
    setStatus("Enter a date and click fetch", false)

    form.addEventListener("submit", async (event)=>{
        event.preventDefault()
        console.log("Submitting Form")
        await run();
        inputDate.value = ""  
    })
}
main()