import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";
const SERVER_URL = "http://localhost:1337";
const socket = io(SERVER_URL);
const id = document.getElementById('id')
//  wait until socket connects before adding event listeners
socket.on("connect", () => {
    console.log('connect')
    socket.on("product:update", (json) => {
        console.log('changed')
        if(json.id == id){
            document.getElementById('title').value = json.data.attributes.Title
            document.getElementById('price').value = json.data.attributes.Price
            document.getElementById('uid').value = json.data.attributes.UID
        }

    });
});