export default function Element ({ html, state }) {
  const { attrs, store } = state
  const { key } = attrs
  const {id, poster_path, title, vote_average} = store.shows.results[key]
  return html`
    <style>
        a {
            transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        .aspect-ratio-box {
            padding-top: 150%;
        }
        img {
            filter: grayscale(0%);
        }
    </style>
    <a href="/movie?id=${id}&page=1"
        class="relative flex flex-col"
    >
        <div class="aspect-ratio-box h-0 overflow-hidden relative">
            <div class="absolute top0 left0 w-full h-full flex items-center flex-col justify-center">
                <div class="relative flex-grow">
                    <img
                        width="342" height="513"
                        src="https://image.tmdb.org/t/p/w342${poster_path}"
                        class="object-cover w-full h-full"
                    />
                </div>
          </div>
        </div>
        <div class="flex flex-col content-between items-center pt-1 pb-1 pl1 pr1">
            <h2 class="text-1 font-normal mb-2">${title}</h2>
            <div class="flex relative items-center">${vote_average}</div>
        </div>
    </a>`
}
