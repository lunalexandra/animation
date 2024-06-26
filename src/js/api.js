export async function registerUser(username) {
  const response = await fetch("http://localhost:3000/new-user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: username }),
  });

  const result = await response.json();
  return result;
}

const ws = new WebSocket("ws://localhost:3000/ws");

ws.addEventListener("open", (e) => {
  console.log(e);
  console.log("ws onen");
});

ws.addEventListener("close", (e) => {
  console.log(e);
  console.log("ws close");
});

ws.addEventListener("message", (event) => {
  const data = JSON.parse(event.data);
  console.log("Message from server:", data);
});

export default ws;
