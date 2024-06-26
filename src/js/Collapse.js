export class Collapse {
  constructor(parentEl) {
    this.parentEl = parentEl;
  }

  bindToDOM() {
    this.render();
    this.subscribeOnEvent();
  }

  static get markup() {
    return `
   <div class="collapse-box">
    <button type="button" class="btn-collapse">Collapse</button>
    <div class="collapse-text">One of the most striking things about London is its diverse population. People from all over the world have made London their home, and this diversity is reflected in the city’s food, music, and art. There is always something new and interesting to discover in London, whether it’s a hidden street market or a trendy new restaurant.</div>
    <div class="copy">Copy</div>
   </div>
    `;
  }

  render() {
    this.parentEl.insertAdjacentHTML("afterbegin", Collapse.markup);
  }

  subscribeOnEvent() {
    const btn = this.parentEl.querySelector(".btn-collapse");
    const text = this.parentEl.querySelector(".collapse-text");
    btn.addEventListener("click", () => this.click(btn, text));
  }

  click(btn, element) {
    if (btn.classList.contains("pressed")) {
      btn.classList.remove("pressed");
      element.style.height = "130px";
      element.style.borderColor = "black";
      element.style.padding = "10px";
    } else {
      btn.classList.add("pressed");
      element.style.height = "0";
      element.style.borderColor = "transparent";
      element.style.padding = "0";
    }
  }
}
