const button = document.getElementById("button");
const day_div = document.getElementById("day-div");
const day_input = document.getElementById("day-input");
const day_error = document.getElementById("day-error");
const month_div = document.getElementById("month-div");
const month_input = document.getElementById("month-input");
const month_error = document.getElementById("month-error");
const year_div = document.getElementById("year-div");
const year_input = document.getElementById("year-input");
const year_error = document.getElementById("year-error");
const days = document.getElementById("days");
const months = document.getElementById("months");
const years = document.getElementById("years");
const days_text = document.getElementById("days-text");
const months_text = document.getElementById("months-text");
const years_text = document.getElementById("years-text");

const re = new RegExp(/[0-9]+/);
const isNumeric = (n) => {
  return re.test(n) && !isNaN(parseInt(n));
}

const validateDay = () => {
  const day = day_input.value;
  if (!day) {
    day_div.classList.add("error");
    day_error.innerHTML = "This field is required";
    return false;
  }
  const d = parseInt(day);
  if (!isNumeric(d) || d < 1) {
    day_div.classList.add("error");
    day_error.innerHTML = "Must be a valid day";
    return false;
  }
  day_div.classList.remove("error");
  day_error.innerHTML = "";
  return true;
}
const validateMonth = () => {
  const month = month_input.value;
  if (!month) {
    month_div.classList.add("error");
    month_error.innerHTML = "This field is required";
    return false;
  }
  const m = parseInt(month);
  if (!isNumeric(m) || m < 1 || m > 12) {
    month_div.classList.add("error");
    month_error.innerHTML = "Must be a valid month";
    return false;
  }
  month_div.classList.remove("error");
  month_error.innerHTML = "";
  return true;
}
const validateYear = () => {
  const year = year_input.value;
  if (!year) {
    year_div.classList.add("error");
    year_error.innerHTML = "This field is required";
    return false;
  }
  const y = parseInt(year);
  if (!isNumeric(y)) {
    year_div.classList.add("error");
    year_error.innerHTML = "Must be a valid year";
    return false;
  }
  if (y > new Date().getFullYear()) {
    year_div.classList.add("error");
    year_error.innerHTML = "Must be in the past";
    return false;
  }
  year_div.classList.remove("error");
  year_error.innerHTML = "";
  return true;
}

const calculateAge = () => {
  const now = new Date();
  const day = parseInt(day_input.value);
  const month = parseInt(month_input.value);
  const year = parseInt(year_input.value);
  const dob = new Date(year, month - 1, day);
  if (day !== dob.getDate() || month !== dob.getMonth() + 1 || year !== dob.getFullYear()) {
    day_div.classList.add("error");
    day_error.innerHTML = "Must be a valid date";
    month_div.classList.add("error");
    year_div.classList.add("error");
    return;
  }

  let diffYears = now.getFullYear() - dob.getFullYear();
  let diffMonths = now.getMonth() - dob.getMonth();
  if (diffMonths < 0) {
    diffYears--;
    diffMonths+=12;
  }
  let diffDays = now.getDate() - dob.getDate();
  if (diffDays < 0) {
    diffMonths--;
    diffDays+=30;
  }
  
  years.innerHTML = diffYears;
  months.innerHTML = diffMonths;
  days.innerHTML = diffDays;
  years_text.innerHTML = diffYears === 1 ? "year" : "years";
  months_text.innerHTML = diffMonths === 1 ? "month" : "months";
  days_text.innerHTML = diffDays === 1 ? "day" : "days";
}

day_input.onblur = validateDay;
month_input.onblur = validateMonth;
year_input.onblur = validateYear;

const handleButtonClick = () => {
  const dayIsValid = validateDay();
  const monthIsValid = validateMonth();
  const yearIsValid = validateYear()
  if (dayIsValid && monthIsValid && yearIsValid) {
    calculateAge();
  }
}

const handleEnter = (event) => {
  if (event && event.keyCode === 13) {
    handleButtonClick();
  }
}

day_input.onkeydown = handleEnter;
month_input.onkeydown = handleEnter;
year_input.onkeydown = handleEnter;
button.onclick = handleButtonClick;
