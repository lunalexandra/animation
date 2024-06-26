export class NameList {
  constructor(element) {
    this.element = element;
    this.list = null;
  }

  render() {
    this.list = document.createElement("div");
    this.list.classList.add("name-list");
    this.element.appendChild(this.list);
  }

  markupActiveUser(user) {
    return `
        <div class="wrp-contact">
          <div class="circle"></div>
          <div class="user-name">${user}</div>
        </div>
      `;
  }

  showUser(user) {
    this.list.insertAdjacentHTML("afterbegin", this.markupActiveUser(user));
  }
}
