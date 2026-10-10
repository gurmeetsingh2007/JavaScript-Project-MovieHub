
API = "https://www.omdbapi.com/?apikey=f35226b4&s=avengers";

const movieForm = document.querySelector("#movieForm");
const movieInput = document.querySelector("#movieInput");
const movieHub = document.querySelector("#movieHub");

movieForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let query = movieInput.value.trim()
    if (!query) {
        return
    }
    console.log(query);
    searchMovies(query);
})

async function searchMovies(movieName) {
    movieHub.innerHTML = `
    <div class="col-span-full flex justify-center py-16">
        <span class="w-10 h-10
                     border-4 border-zinc-700
                     border-t-amber-400
                     rounded-full
                     animate-spin">
        </span>
    </div>
`;
    let response = await fetch(`https://www.omdbapi.com/?apikey=f35226b4&s=${encodeURIComponent(movieName)}`)
    let data = await response.json()
    console.log(data);
    if (data.Response === "True") {
        displayMovies(data.Search)
    } else {
        movieHub.innerHTML = `
    <div class="col-span-full py-16 text-center">

        <p class="text-zinc-500 text-lg">
            ${data.Error}
        </p>

        <p class="text-zinc-600 text-sm mt-2">
            Try searching for another movie.
        </p>

    </div>
`;
    }

}

function displayMovies(movies) {
    movieHub.innerHTML = ``
    movies.forEach((movie) => {
        const div = document.createElement("div")
        div.className = `
    movie-card
    group
    bg-zinc-900
    border border-zinc-800
    rounded-xl
    overflow-hidden
    cursor-pointer
    hover:-translate-y-1
    hover:border-amber-400/50
    hover:shadow-xl
    hover:shadow-black/30
    transition duration-300
`;
        div.dataset.imdbID = movie.imdbID
        // div.setAttribute("class" , "movie-card")
        div.innerHTML = `
    <div class="aspect-[2/3] overflow-hidden bg-zinc-800">

        <img
            src="${movie.Poster}"
            alt="${movie.Title}"
            class="w-full h-full object-cover
                   group-hover:scale-105
                   transition duration-500"
        >

    </div>

    <div class="p-4">

        <p class="font-bold text-zinc-100 truncate">
            ${movie.Title}
        </p>

        <div class="flex items-center justify-between mt-2">

            <p class="text-sm text-zinc-500">
                ${movie.Year}
            </p>

            <span class="text-xs text-zinc-500
                         capitalize">
                ${movie.Type}
            </span>

        </div>

    </div>
`;
        movieHub.append(div);
    })

}

movieHub.addEventListener("click", (e) => {
    e.stopPropagation();
    const movieCard = e.target.closest(".movie-card")
    const imdbID = movieCard.dataset.imdbID
    // console.log(imdbID);
    // location.href = `movie-details.html`
    location.href = `movie-details.html?id=${imdbID}`
})