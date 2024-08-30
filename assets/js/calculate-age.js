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

const validateDay = () => {
  const day = day_input.value;
  if (!day) {
    day_div.classList.add("error");
    day_error.innerHTML = "This field is required";
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
  year_div.classList.remove("error");
  year_error.innerHTML = "";
  return true;
}

const calculateAge = () => {
  const now = new Date();
  const dob = new Date();
  dob.setDate(parseInt(day_input.value));
  dob.setMonth(parseInt(month_input.value) - 1);
  dob.setYear(parseInt(year_input.value));

  let diffYears = now.getFullYear() - dob.getFullYear();
  let diffMonths = now.getMonth() - dob.getMonth();
  if (diffMonths < 0) {
    diffYears--;
    diffMonths += 12;
  }
  let diffDays = now.getDate() - dob.getDate();
  if (diffDays < 0) {
    diffMonths--;
    now.setMonth(now.getMonth() + 1);
    diffDays = now.getDate() - dob.getDate();
  }
  
  years.innerHTML = diffYears;
  months.innerHTML = diffMonths;
  days.innerHTML = diffDays;
}

day_input.onblur = validateDay;
month_input.onblur = validateMonth;
year_input.onblur = validateYear;
button.onclick = () => {
  const dayIsValid = validateDay();
  const monthIsValid = validateMonth();
  const yearIsValid = validateYear()
  if (dayIsValid && monthIsValid && yearIsValid) {
    calculateAge();
  }
}
