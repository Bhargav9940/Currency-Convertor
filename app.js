let BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCur = document.querySelector(".from select");
const toCur = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const exchangeIcon = document.querySelector(".dropdown i");
const para = document.querySelectorAll("p");


// for(let curCode in countryList) {
//     console.log(curCode, countryList[curCode]);
// }

window.addEventListener("load", () => {
    updateExchangeRate();
});

for(let select of dropdowns) {
    for(curCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = curCode;
        newOption.value = curCode;
        if(select.name === "from" && curCode === "USD") {
            newOption.selected = "selected";
        }
        if(select.name === "to" && curCode === "INR") {
            // newOption.selected = 1;
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let curCode = element.value;
    let countryCode = countryList[curCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click",async (evt) => {
    //Removes default behavior of a button which is reloading the page
    //Nothing will happen after below line, when button is clicked
    //Default behavior of event is prevented (cancelled)
    evt.preventDefault();
    updateExchangeRate();
});


const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }

    let fromCurValue = fromCur.value.toLowerCase();
    let toCurValue = toCur.value.toLowerCase();

    const URL = `${BASE_URL}/${fromCurValue}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurValue][toCurValue];
    
    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCur.value} = ${finalAmount} ${toCur.value}`;
}

exchangeIcon.addEventListener("click", () => {
    let tempVal = dropdowns[0].value;
    dropdowns[0].value = dropdowns[1].value;
    dropdowns[1].value = tempVal;

    updateFlag(dropdowns[0]);
    updateFlag(dropdowns[1]);
    updateExchangeRate();
});