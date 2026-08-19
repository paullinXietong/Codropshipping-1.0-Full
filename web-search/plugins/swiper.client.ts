import 'swiper/css/bundle'

let registered = false

export default defineNuxtPlugin(async (nuxtApp) => {
  async function registerHomepageCarousel() {
    if (registered || window.location.pathname !== '/') return
    const { register } = await import('swiper/element')
    register()
    registered = true
  }

  await registerHomepageCarousel()
  nuxtApp.hook('page:start', registerHomepageCarousel)
})
