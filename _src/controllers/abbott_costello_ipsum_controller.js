import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [
    "text",
    "notification",
    "ipsum1", "ipsum2", "ipsum3", "ipsum4", "ipsum5",
    "ipsum6", "ipsum7", "ipsum8", "ipsum9", "ipsum10",
    "ipsum11", "ipsum12", "ipsum13"
  ]

  ipsums() {
    return [
      this.ipsum1Target.innerText,
      this.ipsum2Target.innerText,
      this.ipsum3Target.innerText,
      this.ipsum4Target.innerText,
      this.ipsum5Target.innerText,
      this.ipsum6Target.innerText,
      this.ipsum7Target.innerText,
      this.ipsum8Target.innerText,
      this.ipsum9Target.innerText,
      this.ipsum10Target.innerText,
      this.ipsum11Target.innerText,
      this.ipsum12Target.innerText,
      this.ipsum13Target.innerText
    ]
  }

  copy() {
    this.textTarget.select()
    document.execCommand("copy")
    this.notificationTarget.classList.remove("hidden")
    setTimeout(() => {
      this.notificationTarget.classList.add("hidden")
    }, 2000)
  }

  generate() {
    this.textTarget.innerText =
      this.ipsums()[this.random_int(this.ipsums().length)]
  }

  random_int(max) {
    return Math.floor(Math.random() * Math.floor(max))
  }
}
