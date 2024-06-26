import { Collapse } from "./Collapse";
import { Chat } from "./Chat";

const container = document.querySelector(".container");
const collapse = new Collapse(container);
const chat = new Chat(container);

collapse.bindToDOM();
chat.bindToDOM();
