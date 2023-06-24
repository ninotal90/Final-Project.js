"use strict";

// B U R G E R  B A R
let navigationBar = document.getElementById("navElement");
let Burger = document.getElementById("burgerBar");
let mainDiv = document.querySelector(".main-div");

Burger.addEventListener("click", function () {
  navigationBar.classList.toggle("active");
  Burger.classList.toggle("burgerLine");
});

// scrollTop
let scrollTop = document.getElementById("top");
scrollTop.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// J S O N  G E T  M E T H O D
let wraperDiv = document.getElementById("wraper-div");

fetch("https://mocki.io/v1/d4867d8b-b5d5-4a48-a4ab-79131b5809b8", {
  method: "get",
})
  .then((Response) => Response.json())
  .then((responsJs) => {
    responsJs.forEach((element) => {
      let jsDivText = document.createElement("div");
      jsDivText.classList.add("js-div-text");
      let divConteiner = document.createElement("div");
      divConteiner.classList.add("div-conteiner");

      let pTeg = document.createElement("p");
      pTeg.classList.add("P-teg");
      pTeg.innerText = `CITY - ${element.city}`;

      let ulItem = document.createElement("ul");
      let liItem = document.createElement("li");
      liItem.classList.add("li-teg");
      liItem.innerText = `${element.name}`;

      ulItem.appendChild(liItem);
      jsDivText.appendChild(ulItem);
      jsDivText.appendChild(pTeg);
      divConteiner.appendChild(jsDivText);
      wraperDiv.appendChild(divConteiner);
    });
  })
  .catch((responsError) => console.log(responsError));

//Filter with async await
let searchFilter = document.getElementById("search-field");
let ulElement = document.getElementById("results");

let listItem = [];
async function asyncMyFunction() {
  let element = await fetch("https://dummyjson.com/quotes", {
    method: "get",
  });
  if (element.status !== 200) {
    throw "error";
  }
  let responsInfo = await element.json();
  return responsInfo;
}

asyncMyFunction()
  .then((dataJs) => {
    dataJs.quotes.forEach((object) => {
      let liElement = document.createElement("li");
      liElement.classList.add("li-element");
      let pText = document.createElement("p");
      pText.classList.add("p-text");
      pText.innerText = `${object.quote}`;
      liElement.innerText = `${object.author}`;

      listItem.push(liElement);
      liElement.appendChild(pText);
      ulElement.appendChild(liElement);
    });
  })
  .catch((error) => console.log(error));

function searchData(searchItem) {
  listItem.forEach((item) => {
    if (item.innerText.toLowerCase().includes(searchItem.toLowerCase())) {
      item.classList.remove("hide");
      item.classList.add("liActive");
    } else {
      item.classList.add("hide");
    }
  });
}

searchFilter.addEventListener("keyup", function (event) {
  if (event.target.value.length == 0) {
    ulElement.classList.add("deActive");
  } else {
    ulElement.classList.remove("deActive");
  }
  searchData(event.target.value);
});

// A C C O R D I O N JS

let accordionItem = document.querySelectorAll(".acordion-item");
accordionItem.forEach(function (accordionElement) {
  accordionElement.addEventListener("click", function () {
    this.classList.toggle("activeText");
  });
});

// F O O T E R   S E C T I O N
let formElement = document.getElementById("registration-form");

formElement.addEventListener("submit", function (event) {
  event.preventDefault();
  let errors = {};

  // U S E R N A M E
  let usernameValue = document.getElementById("username-field").value;

  if (usernameValue.length < 3) {
    errors.username = "Username must be more than 3 characters";
  }
  if (usernameValue == "") {
    errors.username = "Username field can not be empty";
  }

  // P A S S W O R D
  let password1 = document.getElementById("password-field").value;
  let password2 = document.getElementById("password-field2").value;

  if (password1.length < 6) {
    errors.password = "Password must be more than 6 characters";
  }
  if (password1 == "") {
    errors.password = "Password field can not be empty";
  }

  if (password1 != password2) {
    errors.password2 = "Password do not match";
  }
  // R A D I O
  let userAge = false;
  document.querySelectorAll('[name="age"]').forEach((item) => {
    if (item.checked) {
      userAge = true;
    }
  });
  if (!userAge) {
    errors.age = "Please Select your Age";
  }

  // C H E C K B O X
  let agree = document.getElementById("agree").checked;
  if (!agree) {
    errors.agree = "You must agree our terms and conditions";
  }
  document.querySelectorAll(".error-text").forEach((content) => {
    content.innerText = "";
  });
  for (let objectKey in errors) {
    let pErrorElement = document.getElementById("error-" + objectKey);

    if (pErrorElement) {
      pErrorElement.innerText = errors[objectKey];
    }
    console.log(pErrorElement);
  }
  if (Object.keys(errors).length == 0) {
    formElement.submit();
  }
});
// Show Hide Password
let passwordField = document.getElementById("password-field");
let toggleIcone = document.getElementById("toggleIcon");

toggleIcone.addEventListener("click", function () {
  if (passwordField.type == "password") {
    passwordField.setAttribute("type", "text");
    toggleIcone.classList.remove("fa-eye");
    toggleIcone.classList.add("fa-eye-slash");
  } else {
    passwordField.setAttribute("type", "password");
    toggleIcone.classList.remove("fa-eye-slash");
    toggleIcone.classList.add("fa-eye");
  }
});

let emailField = document.getElementById("emailField");

emailField.addEventListener("keyup", function () {
  let emailValue = document.getElementById("emailField").value;
  let pErrorEmail = document.querySelector(".error-email");
  let emailPatter =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (emailValue.match(emailPatter)) {
    pErrorEmail.innerText = "your email is valid";
    pErrorEmail.style.color = "green";
    emailField.style.outline = "none";
    emailField.style.border = "solid 2px green";
  } else {
    pErrorEmail.innerText = "your email is invalid";
    pErrorEmail.style.color = "red";
    emailField.style.outline = "none";
    emailField.style.border = "solid 2px red";
  }
  if (emailValue == "") {
    pErrorEmail.innerHTML = " ";
    emailField.style.border = "solid 2px black";
  }
});

// C O O K I E   N O T I F I C A T I O N

let cookieButton = document.querySelector(".button");
let cookieButton1 = document.querySelector(".button1");
let cookieSection = document.querySelector(".cookie-section");

cookieButton.addEventListener("click", function () {
  cookieSection.classList.add("activeCookie");
});

cookieButton1.addEventListener("click", function () {
  cookieSection.classList.add("activeCookie");
});
