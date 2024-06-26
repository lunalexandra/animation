/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/Collapse.js
class Collapse {
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
;// CONCATENATED MODULE: ./src/js/Chat.js
class Chat {
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
    cross.addEventListener("click", e => this.close(e, form, circle));
    circle.addEventListener("click", e => this.open(e, form, circle));
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
;// CONCATENATED MODULE: ./src/js/app.js


const container = document.querySelector(".container");
const collapse = new Collapse(container);
const chat = new Chat(container);
collapse.bindToDOM();
chat.bindToDOM();
;// CONCATENATED MODULE: ./src/index.js


/******/ })()
;