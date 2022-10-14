"use strict";

const allCardFields = document.querySelectorAll("span[id^=card__]");
const allInputFields = document.querySelectorAll("input");
const inputForm = document.querySelector(".card__form");
const allErrorMsg = document.querySelectorAll(".error__msg");
const form = document.querySelector(".card__form");
const submitButton = document.querySelector("#submit");
const continueButton = document.querySelector("#continue");
const successMessage = document.querySelector(".message");

//This array stores the default card details
const cardDefText = [...allCardFields].flatMap((el) => {
  return [...el.textContent.split("/")];
});

//This Symbol.split object allows the String.split method to split a string in fours
const splitByNum = {
  [Symbol.split](str) {
    let num = 4;
    let pos = 0;

    const result = [];
    while (pos < str.length) {
      const groupMatch = str.slice(pos, pos + num);
      if (pos + num >= str.length) {
        result.push(groupMatch);
        break;
      }
      result.push(groupMatch);
      pos += num;
    }
    return result;
  },
};

//This Fn auto-updates the respective card fields
const updateFields = function (inputEl, cardSpan) {
  cardSpan.textContent = inputEl.value || cardDefText[cardSpan.dataset.pos];
};

const stripSpace = (str) => str.replace(/ /g, "");

const groupFours = (text) => text.split(splitByNum).join(" ");

const updateText = function (inputEl, cardSpan) {
  const remSpace = stripSpace(inputEl.value);
  const inpId = inputEl.id;
  switch (true) {
    case inpId === "card_number":
      if (remSpace.length > 16) {
        inputEl.value = cardSpan.textContent;
        break;
      }
      inputEl.value = groupFours(remSpace);
      updateFields(inputEl, cardSpan);
      break;

    case inpId === "card_expiry-MM" ||
      inpId === "card_expiry-YY" ||
      inpId === "card_cvc":
      if (remSpace.length > inputEl.size) {
        inputEl.value = cardSpan.textContent;
        break;
      }
      inputEl.value = remSpace;
      updateFields(inputEl, cardSpan);
      break;

    default:
      updateFields(inputEl, cardSpan);
      break;
  }
};

const successFn = function () {
  successMessage.classList.toggle("hidden");
  form.classList.toggle("hidden");
};

function errorCheck(e) {
  e.preventDefault();

  let noError = true; //State Variable to check if any errors occured

  //Clear out any errors shown before
  allErrorMsg.forEach((el) => (el.textContent = ""));

  for (const el of allInputFields) {
    const errorSibl =
      document.querySelector(`#${el.id}~span`) ||
      el.closest("div").querySelector(".error__msg");
    const elText = el.value;
    const stripText = stripSpace(elText);

    //The regex replaces all alphabetic chars and spaces with an empty string
    //The boolean is true if all chars are letters
    const isAllText = elText.replace(/[\p{L} ]/gu, "") === "";

    if (errorSibl.textContent !== "") continue;

    switch (true) {
      case stripText === "":
        errorSibl.textContent = "Can't be blank";
        noError = false;
        break;
      case el.dataset.lit === "number":
        if (!isFinite(stripText)) {
          errorSibl.textContent = "Wrong format, numbers only";
          noError = false;
        } else if (stripText.length !== el.size) {
          errorSibl.textContent = `Must be ${el.size} digits long`;
          noError = false;
        }
        break;

      case el.dataset.lit === "text" && !isAllText:
        errorSibl.textContent = "Wrong format, text only";
        noError = false;
        break;

      default:
        break;
    }
  }

  if (noError) successFn();
}

function restart() {
  allInputFields.forEach((el) => {
    el.value = "";
    const errorSibl =
      document.querySelector(`#${el.id}~span`) ||
      el.closest("div").querySelector(".error__msg");
    console.log(errorSibl);
    errorSibl.textContent = "";
    const cardSpan = document.querySelector(`#card__${el.id}`);
    cardSpan.textContent = cardDefText[cardSpan.dataset.pos];
  });

  successMessage.classList.toggle("hidden");
  form.classList.toggle("hidden");
}

function inputGet() {
  const cardElem = document.querySelector(`#card__${this.id}`);
  updateText(this, cardElem);
}

allInputFields.forEach((el, i) => el.addEventListener("input", inputGet));
submitButton.addEventListener("click", errorCheck);
continueButton.addEventListener("click", restart);
