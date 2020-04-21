const search = document.getElementById("search");
const submit = document.getElementById("submit");
const random = document.getElementById("random");
const mealsEl = document.getElementById("meals");
const resultHeading = document.getElementById("result-heading");
const single_mealEl = document.getElementById("single-meal");
function searchMeal(e) {
  e.preventDefault();
  single_mealEl.innerHTMl = "";
  const term = search.value;
  if (term.trim()){
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        resultHeading.innerHTML = `<h2>Search result for '${term}':</h2>`;
        if (data.meals === null) {
          resultHeading.innerHTML = `<p>There is no search result .Try again!</p>`;
        } else {
          mealsEl.innerHTML = data.meals.map(
            (meal) => `
            <div class="meal">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}" id="meal_img"/>
              <div class="meal-Info">
              <h3>${meal.strMeal}</h3>
              </div>
            </div>
          `
          )
          .join("");
        }
      });
      search.value="";
    }else{
    alert("Please insert a search term.");
  };
};
submit.addEventListener("submit", searchMeal);
