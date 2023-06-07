export default function Element ({ html, state }) {
  const { store } = state
  const { movie = {} } = store
  const { title, tagline } = movie
  return html`
  <style>
    :host {
        display: block;
        margin-bottom: 1rem;
    }
  </style>
  <h1 class="text2 tracking-2 font-bold mb-5 leading1 uppercase">${title}</h1>
  <h2 class="text-1 font-light uppercase">${tagline}</h2>
`
}

