import { NameList } from "./NameList";
import ws from "./api";

export class Chat {
  constructor(parentEl) {
    this.parentEl = parentEl;
    this.messageWindow = null;
    this.textarea = null;
  }

  bindToDOM() {
    this.addMessageWindow();
  }

  renderNameList(users) {
    const list = new NameList(this.messageWindow);
    list.render();
    users.forEach((user) => list.showUser(user.name));
  }

  render() {
    this.messageWindow = document.createElement("div");
    this.messageWindow.classList.add("message-window");
    this.parentEl.insertAdjacentElement("afterbegin", this.messageWindow);

    this.textarea = document.createElement("textarea");
    this.textarea.classList.add("textarea");
    this.textarea.setAttribute("placeholder", "Type your message here");
    this.messageWindow.insertAdjacentElement("beforeend", this.textarea);

    this.textarea.addEventListener("keydown", (event) =>
      this.handleSendMessage(event),
    );

    this.setupWebSocketListeners();
  }

  setupWebSocketListeners() {
    ws.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
      console.log("Message from server:", data);

      // Обновляем список пользователей
      if (Array.isArray(data)) {
        this.renderNameList(data);
      }

      // Отображаем сообщения
      if (data.text) {
        this.showMessage(data);
      }
    });
  }

  showMessage(message) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");

    messageElement.textContent = message.text;

    const info = document.createElement("div");
    info.classList.add("date-and-name");

    messageElement.appendChild(info);
    this.textarea.insertAdjacentElement("afterend", messageElement);

    if (message.name === this.getName()) {
      messageElement.classList.add("my-message");
      message.name = "You";
      const myMessageInfo = messageElement.querySelector(".date-and-name ");
      if (myMessageInfo) {
        myMessageInfo.classList.add("my-message-info");
      }
    }
    info.textContent = `${message.name},  ${this.getCurrentFormattedDate()}`;
  }

  getCurrentFormattedDate() {
    const date = new Date();

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const formattedDate = `${hours}.${minutes} ${day}.${month}.${year}`;

    return formattedDate;
  }

  handleSendMessage(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      const messageText = this.textarea.value.trim();
      if (messageText) {
        const message = {
          type: "send",
          text: messageText,
          name: this.getName(),
        };
        ws.send(JSON.stringify(message));
        this.textarea.value = "";
      }
    }
  }

  getName() {
    return JSON.parse(localStorage.getItem("myname"));
  }
}
