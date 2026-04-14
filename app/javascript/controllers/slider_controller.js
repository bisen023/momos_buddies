import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["track", "item", "prev", "next", "dots", "dot"]

  connect() {
    this.index = 0
    this.updateSlider()
    window.addEventListener("resize", this.handleResize.bind(this))
  }

  next() {
    this.index = Math.min(this.index + 1, this.maxIndex)
    this.updateSlider()
  }

  prev() {
    this.index = Math.max(this.index - 1, 0)
    this.updateSlider()
  }

  goTo(event) {
    this.index = parseInt(event.target.dataset.index)
    this.updateSlider()
  }

  updateSlider() {
    const translateX = -this.index * 100
    this.trackTarget.style.transform = `translateX(${translateX}%)`
    
    if (this.hasDotsTarget) {
      this.dotTargets.forEach((dot, i) => {
        dot.classList.toggle("bg-orange-500", i === this.index)
        dot.classList.toggle("bg-gray-300", i !== this.index)
      })
    }
    
    if (this.hasPrevTarget) this.prevTarget.disabled = this.index === 0
    if (this.hasNextTarget) this.nextTarget.disabled = this.index === this.maxIndex
  }

  get maxIndex() {
    return this.itemTargets.length - this.visibleItems
  }

  get visibleItems() {
    const width = this.trackTarget.offsetWidth
    const itemWidth = this.itemTargets[0]?.offsetWidth || 0
    return Math.round(width / itemWidth)
  }

  handleResize() {
    this.updateSlider()
  }
}

