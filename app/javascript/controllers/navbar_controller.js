import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["menu", "hamburger", "darkToggle"]

  connect() {
    this.updateDarkMode()
    this.updateHamburger()
  }

  toggleMobileMenu() {
    this.menuTarget.classList.toggle("hidden")
    this.hamburgerTarget.classList.toggle("border-orange-400")
    this.hamburgerTarget.querySelectorAll("path").forEach(path => path.style.stroke = this.menuTarget.classList.contains("hidden") ? "#9CA3AF" : "#F97316")
  }

  toggleDarkMode(event) {
    document.documentElement.classList.toggle("dark")
    localStorage.setItem("darkMode", document.documentElement.classList.contains("dark"))
    if (this.hasDarkToggleTarget) {
      this.darkToggleTarget.querySelector("svg").classList.toggle("rotate-180")
    }
  }

  updateDarkMode() {
    const isDark = localStorage.getItem("darkMode") === "true"
    if (isDark) {
      document.documentElement.classList.add("dark")
    }
  }

  updateHamburger() {
    if (this.hasHamburgerTarget) {
      this.hamburgerTarget.addEventListener("click", this.toggleMobileMenu.bind(this))
    }
    if (this.hasDarkToggleTarget) {
      this.darkToggleTarget.addEventListener("click", this.toggleDarkMode.bind(this))
    }
  }
}

