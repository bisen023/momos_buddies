import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["label", "text"]

  connect() {
    this.descriptions = ['', 'Poor 😞', 'Fair 😐', 'Good 😊', 'Great 😄', 'Excellent 🤩']
    this.refresh()
  }

  refresh() {
    const checked = this.element.querySelector('input[type="radio"]:checked')
    const value = checked ? parseInt(checked.value) : 0
    this.updateLabels(value)
    this.updateText(value)
  }

  updateLabels(value) {
    this.labelTargets.forEach((label, index) => {
      const v = parseInt(label.dataset.value)
      if (v <= value) {
        label.textContent = '★'
        label.classList.add('text-yellow-400', 'drop-shadow-sm')
      } else {
        label.textContent = '☆'
        label.classList.remove('text-yellow-400', 'drop-shadow-sm')
        label.classList.add('text-gray-300')
      }
    })
  }

  updateText(value) {
    this.textTarget.textContent = value ? this.descriptions[value] : 'Click to rate'
  }
}

