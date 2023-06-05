export default function Element ({ html, state }) {
  const { store } = state
  const { category, page } = store
  const pageInt = parseInt(page, 10)
  const prevUrl = `/?category=${category}&page=${pageInt - 1}`
  const nextUrl = `/?category=${category}&page=${pageInt + 1}`
  return html`
    <div class="flex align-items-center justify-content-between">
        <movie-button class="${pageInt === 1 ? 'invisible' : ''}" href="${prevUrl}" label="Prev"></movie-button>
        <movie-button href="${nextUrl}" label="Next"></movie-button>
    </div>`
}
