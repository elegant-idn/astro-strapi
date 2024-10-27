import { serverURL } from "../../app.config.js";



var form = document.getElementById("enter-form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    var data = event.currentTarget.elements;
    fetch(`${serverURL}/auth/local`, {
        method: "POST",
        body: JSON.stringify({
            identifier: data.login.value,
            password: data.password.value,
        }),
        headers: {
            'Content-type': 'application/json'
        }
    }).then((responce) => {
        if (!responce.ok) {
            alert('Неправильный логин или пароль')
            return
        }
        responce.json().then((data) => {
            window.store.dispatch({ type: 'LOGIN' }, {
                token: data.jwt,
                login: data.user.username
            })

            alert('Вход прошел успешно')
            window.location.href='/'
        });
    });
});