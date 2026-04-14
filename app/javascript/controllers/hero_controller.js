import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["bg", "content"]

  connect() {
    this.rafId = null
    this.lastScrollY = 0
    this.initParallax()
  }

  disconnect() {
    if (this.rafId) cancelAnimationFrame(this.rafId)
  }

  initParallax() {
    window.addEventListener("scroll", this.updateParallax.bind(this), { passive: true })
    this.updateParallax()
  }

  updateParallax() {
    const scrolled = window.scrollY
    const rate = scrolled * -0.5
    const rate2 = scrolled * -0.3

    if (this.hasBgTarget) {
      this.bgTarget.style.transform = `translateY(${rate}px)`
    }
    if (this.hasContentTarget) {
      this.contentTarget.style.transform = `translateY(${rate2}px)`
    }

    this.rafId = requestAnimationFrame(this.updateParallax.bind(this))
    this.lastScrollY = scrolled
  }
}

