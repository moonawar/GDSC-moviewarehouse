let mainList = [
  {
    title: "Spider-Man: Into the Spider-Verse",
    id: "spiderverse",
    "imdb-rating": "8.4",
    "synopsis":
    "Teen Miles Morales becomes the Spider-Man of his universe, and must join with five spider-powered individuals from other dimensions to stop a threat for all realities."
  },
  {
    title: "Us (2019)",
    id: "us",
    "imdb-rating": "6.8",
    "synopsis":
    "A family's serene beach vacation turns to chaos when their doppelgängers appear and begin to terrorize them." 
  },
  {
    title: "Interstellar",
    id: "interstellar",
    "imdb-rating": "8.6",
    "synopsis":
    "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival." 
  },
  {
    title: "Get Out",
    id: "get-out",
    "imdb-rating": "7.7",
    "synopsis":
    "A young African-American visits his white girlfriend's parents for the weekend, where his simmering uneasiness about their reception of him eventually reaches a boiling point." 
  },
  {
    title: "Inception",
    id: "inception",
    "imdb-rating": "8.8",
    "synopsis":
    "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster." 
  },
  {
    title: "Joker",
    id: "joker",
    "imdb-rating": "8.4",
    "synopsis":
    "In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime. This path brings him face-to-face with his alter-ego: the Joker." 
  }
];
let idList = [];

const addMovie = (movieName, movieId = "") => {
  const poster = document.createElement("img");
  poster.className = `movieposter`;
  poster.id = movieId;
  poster.src = `./assets/dynamic/movieposter/${movieName}.png`;

  idList.push(movieName);
  const moviePosters = document.getElementById("movie-posters");
  moviePosters.appendChild(poster);
};


document.addEventListener("DOMContentLoaded", () => {
  const moviePosters = document.getElementById("movie-posters");
  addMovie(mainList[mainList.length - 1].id, `lastClone`);
  for (let i = 0; i < mainList.length; i++) {
    addMovie(mainList[i].id);
  }
  addMovie(mainList[0].id, "firstClone");

  let counter = 1;
  const moviePoster = document.getElementsByClassName("movieposter");
  const size = moviePoster[2].clientWidth + 0.05;
  const height = `${size*100/1366}%`;
  moviePosters.style.transform = "translateX(" + -size * counter + "px)";

  console.log(height);

  const prevButton = document.getElementById("prevButton");
  const nextButton = document.getElementById("nextButton");
  const trailerSrc = document.getElementById("trailer-src");
  const carousel = document.getElementById("carousel");

  const detailsTitle = document.getElementById("details-title");
  const detailsRating = document.getElementById("details-rating");
  const detailsSynopsis = document.getElementById("details-synopsis");

  const changeDetails = (counter) => {
    if (counter === 0){
      detailsTitle.innerHTML = `Title : ${mainList[mainList.length-1].title}`
      detailsRating.innerHTML = `Rating : ${mainList[mainList.length-1]['imdb-rating']}`
      detailsSynopsis.innerHTML = `Synopsis : ${mainList[mainList.length-1]['synopsis']}`
    }
    else if (counter === (mainList.length +1)){
      detailsTitle.innerHTML = `Title : ${mainList[0].title}`
      detailsRating.innerHTML = `Rating : ${mainList[0]['imdb-rating']}`
      detailsSynopsis.innerHTML = `Synopsis : ${mainList[0]['synopsis']}`
    }
    else{
      detailsTitle.innerHTML = `Title : ${mainList[counter-1].title}`
      detailsRating.innerHTML = `Rating : ${mainList[counter-1]['imdb-rating']}`
      detailsSynopsis.innerHTML = `Synopsis : ${mainList[counter-1]['synopsis']}`
    }
  }
  
  const title = document.getElementById("title");

  title.innerHTML = mainList.find(x => x.id === idList[counter]).title
  carousel.style.height = height; 

  nextButton.addEventListener("click", () => {
    if (counter >= moviePoster.length - 1) return;
    moviePosters.style.transition = "transform 0.4s ease-in-out";
    counter++;
    moviePosters.style.transform = "translateX(" + -size * counter + "px)";
    trailerSrc.src = `./assets/dynamic/movietrailer/${idList[counter]}.mp4`;
    title.innerHTML = mainList.find(x => x.id === idList[counter]).title
    changeDetails(counter)
  });

  prevButton.addEventListener("click", () => {
    if (counter <= 0) return;
    moviePosters.style.transition = "transform 0.4s ease-in-out";
    counter--;
    moviePosters.style.transform = "translateX(" + -size * counter + "px)";
    trailerSrc.src = `./assets/dynamic/movietrailer/${idList[counter]}.mp4`;
    title.innerHTML = mainList.find(x => x.id === idList[counter]).title
    changeDetails(counter)
  });

  moviePosters.addEventListener("transitionend", () => {
    if (moviePoster[counter].id === "lastClone") {
      moviePosters.style.transition = "none";
      counter = moviePoster.length - 2;
      moviePosters.style.transform = "translateX(" + -size * counter + "px)";
    }
    if (moviePoster[counter].id === "firstClone") {
      moviePosters.style.transition = "none";
      counter = 1;
      moviePosters.style.transform = "translateX(" + -size * counter + "px)";
    }
  });

  const movieContainer = document.getElementById("movie-container");
  const trailer = document.getElementById("trailer");
  const audioControl = document.getElementById("audio-control");
  let isMuted = true;

  movieContainer.addEventListener("mouseenter", () => {
    trailer.style.visibility = "visible";
    audioControl.style.visibility = "visible";
    if (isMuted === true) {
      audioControl.src = "./assets/static/audio-control-muted.png"
      trailer.muted = true;
    }
    trailer.load();
    trailer.play();
    trailer.loop = true;
  });

  movieContainer.addEventListener("mouseleave", () => {
    trailer.style.visibility = "hidden";
    audioControl.style.visibility = "hidden";
    trailer.pause();
    trailer.currentTime = 0;
  });

  audioControl.addEventListener("click", () => {
    if (isMuted === true) {
      trailer.muted = false;
      audioControl.src = "./assets/static/audio-control.png"
      isMuted = false;

    } else {
      trailer.muted = true;
      audioControl.src = "./assets/static/audio-control-muted.png"
      isMuted = true;
    }
  });

  const detailsButton = document.getElementById("details-button");
  const movieDetails = document.getElementById("movie-details");

  let detailsShown = false;

  detailsButton.addEventListener('click', () => {
      if (detailsShown === false){
        detailsShown = true
        movieDetails.style.visibility = 'visible';
        detailsButton.innerHTML = 'Hide Details ⓘ';
        changeDetails(counter)
      }
      else{
        console.log('clicked')
        detailsShown = false;
        movieDetails.style.visibility = 'hidden';
        detailsButton.innerHTML = 'Show Details ⓘ';
        changeDetails(counter)
      }
  })
});
