const movieDetail = document.querySelector("#movie-detail");
const params = new URLSearchParams(location.search);
const imdbID = params.get("id");

if (imdbID) {
    searchMovie(imdbID.trim())
}

async function searchMovie(imdbID) {

    let response = await fetch(`https://www.omdbapi.com/?apikey=f35226b4&i=${imdbID}&plot=full`);
    let data = await response.json()
    console.log(data);

    if (data.Response === "True") {
        displayMovie(data)
    } else {
        console.log(data.Error);
    }

}

function displayMovie(data) {

    movieDetail.innerHTML = `

        <div class="grid md:grid-cols-[280px_1fr]
                    gap-8 lg:gap-12">


            <!-- POSTER -->

            <div>

                <img
                    src="${data.Poster}"
                    alt="${data.Title}"
                    class="w-full
                           rounded-2xl
                           border border-zinc-800
                           shadow-2xl
                           shadow-black/40"
                >

            </div>


            <!-- DETAILS -->

            <div>

                <h2 class="text-4xl md:text-5xl
                           font-black
                           tracking-tight
                           mb-5">

                    ${data.Title}

                </h2>


                <!-- BASIC INFO -->

                <section class="flex flex-wrap
                                gap-2 mb-7">

                    <p class="px-3 py-1
                              rounded-full
                              bg-zinc-900
                              border border-zinc-800
                              text-sm text-zinc-400">

                        ${data.Released}

                    </p>

                    <p class="px-3 py-1
                              rounded-full
                              bg-zinc-900
                              border border-zinc-800
                              text-sm text-zinc-400">

                        ${data.Rated}

                    </p>

                    <p class="px-3 py-1
                              rounded-full
                              bg-zinc-900
                              border border-zinc-800
                              text-sm text-zinc-400">

                        ${data.Runtime}

                    </p>

                    <p class="px-3 py-1
                              rounded-full
                              bg-zinc-900
                              border border-zinc-800
                              text-sm text-zinc-400">

                        ${data.Genre}

                    </p>

                    <p class="px-3 py-1
                              rounded-full
                              bg-amber-400/10
                              border border-amber-400/20
                              text-sm text-amber-400">

                        ★ ${data.imdbRating} / 10

                    </p>

                </section>


                <!-- PLOT -->

                <div class="border-y
                            border-zinc-800
                            py-6 mb-7">

                    <p class="text-lg
                              font-bold
                              mb-3">

                        Plot Overview

                    </p>

                    <p class="text-zinc-400
                              leading-7
                              max-w-3xl">

                        ${data.Plot}

                    </p>

                </div>


                <!-- DIRECTOR + WRITER -->

                <div class="grid sm:grid-cols-2
                            gap-5 mb-6">

                    <section class="bg-zinc-900
                                    border border-zinc-800
                                    rounded-xl p-4">

                        <p class="text-xs
                                  uppercase
                                  tracking-wider
                                  text-zinc-500">

                            Director

                        </p>

                        <p class="mt-2
                                  font-semibold
                                  text-zinc-200">

                            ${data.Director}

                        </p>

                    </section>


                    <section class="bg-zinc-900
                                    border border-zinc-800
                                    rounded-xl p-4">

                        <p class="text-xs
                                  uppercase
                                  tracking-wider
                                  text-zinc-500">

                            Writer

                        </p>

                        <p class="mt-2
                                  font-semibold
                                  text-zinc-200">

                            ${data.Writer}

                        </p>

                    </section>

                </div>


                <!-- ACTORS -->

                <div class="bg-zinc-900
                            border border-zinc-800
                            rounded-xl p-4 mb-6">

                    <p class="text-xs
                              uppercase
                              tracking-wider
                              text-zinc-500">

                        Actors

                    </p>

                    <p class="mt-2
                              font-semibold
                              text-zinc-200">

                        ${data.Actors}

                    </p>

                </div>


                <!-- LANGUAGE + COUNTRY -->

                <div class="grid sm:grid-cols-2
                            gap-5 mb-8">

                    <section class="bg-zinc-900
                                    border border-zinc-800
                                    rounded-xl p-4">

                        <p class="text-xs
                                  uppercase
                                  tracking-wider
                                  text-zinc-500">

                            Language

                        </p>

                        <p class="mt-2
                                  font-semibold">

                            ${data.Language}

                        </p>

                    </section>


                    <section class="bg-zinc-900
                                    border border-zinc-800
                                    rounded-xl p-4">

                        <p class="text-xs
                                  uppercase
                                  tracking-wider
                                  text-zinc-500">

                            Country

                        </p>

                        <p class="mt-2
                                  font-semibold">

                            ${data.Country}

                        </p>

                    </section>

                </div>


                <!-- IMDB BUTTON -->

                <button
                    class="px-6 py-3
                           rounded-lg
                           bg-amber-400
                           text-black
                           font-bold
                           hover:bg-amber-300
                           active:scale-95
                           transition">

                    <a
                        href="https://www.imdb.com/title/${data.imdbID}"
                        target="_blank">

                        View on IMDb ↗

                    </a>

                </button>

            </div>

        </div>
    `;
}