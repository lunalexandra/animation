import { registerUser } from "./api";
import { Chat } from "./Chat";

export class RegistrationForm {
  constructor(parentEl) {
    this.parentEl = parentEl;
    this.form = null;
    this.state = this.getState() || false;
  }

  markup() {
    return `
      <form class="form-registration">
        <label for="user-name-input" class="label">Выберите псевдоним</label>
        <input type="text" name="user-name-input" class="user-name-input">
        <button type="submit" class="continue-btn">Продолжить</button>
      </form>
    `;
  }

  render() {
    if (!this.state) {
      this.parentEl.insertAdjacentHTML("afterbegin", this.markup());
      this.subscribeOnEvent();
    } else this.enterChat();
  }

  subscribeOnEvent() {
    this.form = this.parentEl.querySelector(".form-registration");
    const input = this.parentEl.querySelector(".user-name-input");
    this.form.addEventListener("submit", (event) => this.addUser(event));
    input.addEventListener("focus", () => this.resetInputColor(input));
  }

  async addUser(event) {
    event.preventDefault();
    const input = this.parentEl.querySelector(".user-name-input");
    const username = input.value;
    const { status, message } = await registerUser(username);

    if (status === "error") {
      input.value = message;
      input.style.color = "red";
      return;
    }

    if (status === "ok") {
      this.state = true;
      this.saveState();
      this.saveName(username);
      this.enterChat();
    }
  }

  saveState() {
    localStorage.setItem("state", JSON.stringify(this.state));
  }

  getState() {
    return JSON.parse(localStorage.getItem("state"));
  }

  saveName(name) {
    localStorage.setItem("myname", JSON.stringify(name));
  }

  resetInputColor(input) {
    input.value = "";
    input.style.color = "black";
  }

  enterChat() {
    const chat = new Chat(this.parentEl);
    chat.render();
    this.close();
  }

  close() {
    if (this.form) {
      this.form.remove();
    }
  }
}
