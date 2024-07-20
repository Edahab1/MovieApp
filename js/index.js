/* <reference types="../@types/jquery"/> */
import { displayMovies,
  displayTrending,
  searchMovies,
  validateInputs,
  inputValid,
 } from "./functions.js";

let type = "now_playing";

$(window).on("load", function () {
  closeMenu();
  displayMovies(type);
});

/*menubar button action*/
// open menu
function openMenu() {
  $(".menu-bar").css("margin-left", "0px");
  $(".aside-navbar").css("left", "250px");
  $(".menu-icon").addClass("d-none").removeClass("d-block");
  $(".close").addClass("d-block").removeClass("d-none");

  for (let i = 0; i <= 6; i++) {
    $(".links ul li")
      .eq(i)
      .animate({ bottom: 0 }, (i + 6) * 100);
  }
}
$(".menu-icon").click(() => {
  openMenu();
});

function closeMenu() {
  $(".menu-bar").css("margin-left", "-225px");
  $(".aside-navbar").css("left", "0px");
  $(".menu-icon").addClass("d-block").removeClass("d-none");
  $(".close").addClass("d-none").removeClass("d-block");

  $(".links ul li").animate(
    {
      bottom: 150,
    },
    200
  );
}
$(".close").click(() => {
  closeMenu();
});

$("#playing").click(function(){
  type = "now_playing";
  displayMovies(type);
})

$("#popular").click(function(){
  type = "popular";
  displayMovies(type);
  console.log(type);
})

$("#top").click(function(){
  type = "top_rated";
  displayMovies(type);
  // console.log(type);
})

$("#trending").click(function(){
  displayTrending();
  // console.log(type);
})

$("#upcoming").click(function(){
  type = "upcoming";
  displayMovies(type);
  // console.log(type);
})

// search movies
$('#search').on("input", e => {
  searchMovies(e.target.value);
  if(e.target.value == "")
  {
      displayMovies(type);
  }
});

$("#contact").click(function(){
  let footerDistance = $("footer").offset().top;
  $("html, body").css("scroll-behavior", "smooth")
  $("html, body").animate({scrollTop: footerDistance}, 2000)
})

$("form input").on("input", function(e){
  validateInputs(e.target)
})

$("#submitBtn").click((event)=>{
  event.preventDefault();
  inputValid()
})