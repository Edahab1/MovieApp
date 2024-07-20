const displayRow = document.getElementById("displayRow");

// movies display functions
function display(arr) {
  let movies = "";

  for (let i = 0; i < arr.length; i++) {
    movies += `<div class="col-sm-6 col-lg-4">
            <div class="movieCard position-relative overflow-hidden">
              <div class="cardImage">
                <img
                  src="https://image.tmdb.org/t/p/w500${arr[i].poster_path}"
                  class="bg-black w-100"
                  alt=""
                />
              </div>
              <div
                class="overlay animate__animated"
              >
                <h2 class="title animate__animated">${arr[i].title}</h2>
                <div class="details text-start p-3">
                  <p class="description fw-lighter text-start animate__animated">${arr[
                    i
                  ].overview
                    .split(" ")
                    .slice(0, 40)
                    .join(" ")}</p>
                  <p class="release-date animate__animated">Release Date : <span>${
                    arr[i].release_date
                  }</span></p>
                  <h3 class="vote animate__animated">${arr[
                    i
                  ].vote_average.toFixed(1)}</h3>
                </div>
              </div>
            </div>
          </div>`;
  }
  displayRow.innerHTML = movies;
  mouseEvent();
}


export async function displayMovies(type) {
  try {
    let response = await fetch(
      `https://api.themoviedb.org/3/movie/${type}?api_key=2769b189339b907774df11719be7f0b8&language=en-US&page=1`
    );
    response = await response.json();
    response = response.results;
    display(response);
    // console.log(response);
  } catch (err) {
    console.log("error", err);
  }
}

export async function displayTrending() {
  try {
    let response = await fetch(
      `https://api.themoviedb.org/3/trending/all/day?api_key=2769b189339b907774df11719be7f0b8`
    );
    response = await response.json();
    response = response.results;
    display(response);
  } catch (err) {
    console.log("error", err);
  }
}

// animation when hovering in and out of the movie card
function mouseEvent() {
  let movieCards = document.querySelectorAll(".movieCard");

  movieCards.forEach((card) => {
    $(card).on("mouseenter", function () {
      $(this).find($(".overlay")).css({ opacity: "1", visibility: "visible" });
      $(this)
        .find(".title")
        .addClass("animate__slideInDown")
        .removeClass("animate__slideOutLeft");
      $(this)
        .find(".description")
        .addClass("animate__flipInX")
        .removeClass("animate__slideOutLeft");
      $(this)
        .find(".release-date, .rating, .vote")
        .addClass("animate__slideInUp")
        .removeClass("animate__slideOutLeft");
    });

    $(card).on("mouseleave", function () {
      $(this).find($(".overlay")).css({ opacity: "0", visibility: "hidden" });
      $(this)
        .find(".title")
        .removeClass("animate__slideInDown")
        .addClass("animate__slideOutLeft");
      $(this)
        .find(".description")
        .addClass("animate__slideOutLeft")
        .removeClass("animate__flipInX");
      $(this)
        .find(".release-date, rating, .vote")
        .removeClass("animate__slideInUp")
        .addClass("animate__slideOutLeft");
    });
  });
}

// search input function
export async function searchMovies(input) {
  try {
    let response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${input}&api_key=2769b189339b907774df11719be7f0b8&language=en-US&include_adult=false`
    );
    response = await response.json();
    response = response.results;
    display(response);
  } catch (err) {
    console.log("error", err);
  }
}

// contact form input validation
export function validateInputs(element) {
  const userName = document.getElementById("userName");
  const userEmail = document.getElementById("userEmail");
  const userPhone = document.getElementById("userPhone");
  const userAge = document.getElementById("userAge");
  const userPassword = document.getElementById("userPassword");
  const userRePassword = document.getElementById("userRePassword");
  const submitBtn = document.getElementById("submitBtn");
  const inputs = document.querySelectorAll("input");

  var regex = {
    userName: /^[a-z]{3,}$/i,
    userEmail: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
    userPhone: /^[0-9]{11,16}$/,
    userAge: /^1[8-9]|([2-9][0-9]){1,2}$/,
    userPassword: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/,
  };

  if (element.id === "userRePassword") {
    const passwordElement = document.getElementById("userPassword");
    if (passwordElement && element.value === passwordElement.value) {
      element.classList.add("is-valid");
      element.classList.remove("is-invalid");
      element.nextElementSibling.classList.replace("d-block", "d-none");
    } else {
      element.classList.remove("is-valid");
      element.classList.add("is-invalid");
      element.nextElementSibling.classList.replace("d-none", "d-block");
    }
  } else {
    if (regex[element.id].test(element.value)) {
      element.classList.add("is-valid");
      element.classList.remove("is-invalid");
      console.log("Match");
      element.nextElementSibling.classList.replace("d-block", "d-none");
    } else {
      console.log("No Match");
      element.classList.remove("is-valid");
      element.classList.add("is-invalid");
      element.nextElementSibling.classList.replace("d-none", "d-block");
    }
  }
}

export function inputValid() {
  if (
    userName.classList.contains("is-valid") &&
    userEmail.classList.contains("is-valid") &&
    userPhone.classList.contains("is-valid") &&
    userAge.classList.contains("is-valid") &&
    userPassword.classList.contains("is-valid") &&
    userRePassword.classList.contains("is-valid")
  ) {
    window.alert("contact details successfuly sent");

    userName.value= null;
    userName.classList.remove("is-valid");
    userEmail.value= null;
    userEmail.classList.remove("is-valid");
    userPhone.value= null;
    userPhone.classList.remove("is-valid");
    userAge.value= null;
    userAge.classList.remove("is-valid");
    userPassword.value= null;
    userPassword.classList.remove("is-valid");
    userRePassword.value= null;
    userRePassword.classList.remove("is-valid");

    
  } else {
    window.alert("contact details are empty or not valid");
  }
}
