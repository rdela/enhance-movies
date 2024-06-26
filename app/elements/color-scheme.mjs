export default function ColorScheme({ html }) {
  return html`
    <style>
      /* Colorscheme option default state */
      :is(icon-sun, icon-moon) svg {
        fill: transparent;
        transition: fill 0.25s var(--easeOutQuint), scale 0.25s var(--easeOutQuint);
        scale: 0.75;
        border-radius: 100%;
      }

      /* Preserve input focus detection but hide visually */
      input {
        inset-inline-start: -100vw;
      }

      input:focus-visible + :is(icon-sun, icon-moon) svg {
        outline: 2px solid white;
      }

      /* Colorscheme option active state */
      input:checked + :is(icon-sun, icon-moon) svg {
        fill: white;
        scale: 1;
      }
    </style>
    <form class='gap-4-lg mie-6 mie0-lg hidden'>
      <label aria-label="Light theme" class='cursor-pointer'>
        <input type='radio' name='colorscheme' value='light' class='absolute' />
        <icon-sun></icon-sun>
      </label>
      <label aria-label="Dark theme" class='cursor-pointer'>
        <input type='radio' name='colorscheme' value='dark' class='absolute' />
        <icon-moon></icon-moon>
      </label>
    </form>

    <js-naked-day>
    <script type='module'>
      const lightStyles = [
        ['--background', 'var(--light)'],
        ['--color', 'var(--dark)'],
        ['--dialogBackground', 'var(--dialogBackgroundLight)'],
        ['--featureBackdropOpacity', 'var(--featureBackdropOpacityLight)'],
        ['--movieBackdropFilter', 'var(--movieBackdropFilterLight)'],
      ]

      const darkStyles = [
        ['--background', 'var(--dark)'],
        ['--color', 'var(--light)'],
        ['--dialogBackground', 'var(--dialogBackgroundDark)'],
        ['--featureBackdropOpacity', 'var(--featureBackdropOpacityDark)'],
        ['--movieBackdropFilter', 'var(--movieBackdropFilterDark)'],
      ]

      const { documentElement: root } = document
      const { localStorage } = window

      class ColorScheme extends HTMLElement {
        constructor() {
          super()
          this.preference = localStorage.getItem('colorscheme') || null
          this.form = this.querySelector('form')
        }

        updatePreference(mode) {
          // Update the stored preference for the colorscheme
          localStorage.setItem('colorscheme', mode)
          // Update local reference to the preference
          this.preference = mode
          // Update the radio inputs
          this.form.elements.colorscheme.value = mode
        }

        setLightStyles() {
          this.updatePreference('light')
          lightStyles.forEach(style => {
            const [ property, value ] = style
            root.style.setProperty(property, value)
          })
        }

        setDarkStyles() {
          this.updatePreference('dark')
          darkStyles.forEach(style => {
            const [ property, value ] = style
            root.style.setProperty(property, value)
          })
        }

        handleChange(useDark) {
          useDark
            ? this.setDarkStyles()
            : this.setLightStyles()
        }

        connectedCallback() {
          // Reveal colorscheme toggles
          this.form.classList.remove('hidden')
          this.form.classList.add('flex')

          // Check the user’s OS colorscheme
          const colorscheme = window.matchMedia('(prefers-color-scheme: dark)')
          const prefersDark = this.preference !== null
            ? this.preference === 'dark' // prefer user's stored preference if one has been given
            : colorscheme.matches // fall back to user's OS colorscheme as the initial preference

          // Set initial colorscheme
          prefersDark
            ? this.setDarkStyles()
            : this.setLightStyles()

          // Listen for changes on the colorscheme toggles
          this.form.addEventListener('change', e => {
            this.handleChange(e.target.value === 'dark')
          })
        }
      }

      customElements.define('color-scheme', ColorScheme)
    </script>
    </js-naked-day>
  `
}
