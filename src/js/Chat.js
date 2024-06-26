export class Chat {
  constructor(parentEl) {
    this.parentEl = parentEl;
  }

  bindToDOM() {
    this.render();
    this.subscribeOnEvent();
  }

  static get markup() {
    return `
    <div class="chat">
        <form class="hidden">
            <button class="cross">✖</button>
            <label class="title" for="textarea-window">Напишите нам</label>
            <textarea name="textarea-window" class="textarea"></textarea>
            <button class="btn-send">Отправить</button>
        </form>
     <button type="button" class="btn-circle"></button>
    </div>
      `;
  }

  render() {
    this.parentEl.insertAdjacentHTML("beforeend", Chat.markup);
  }

  subscribeOnEvent() {
    const cross = this.parentEl.querySelector(".cross");
    const circle = this.parentEl.querySelector(".btn-circle");
    const form = this.parentEl.querySelector("form");
    cross.addEventListener("click", (e) => this.close(e, form, circle));
    circle.addEventListener("click", (e) => this.open(e, form, circle));
  }
  close(e, el, btn) {
    e.preventDefault();
    el.style.animation = "form-hide 0.1s forwards";
    btn.style.animation = "circle-show 0.1s forwards";
  }

  open(e, el, btn) {
    e.preventDefault();
    el.classList.remove("hidden");
    el.style.animation = "form-show 0.1s forwards";
    btn.style.animation = "circle-hide 0.1s forwards";
  }
}
