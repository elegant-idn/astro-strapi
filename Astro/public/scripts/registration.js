import { serverURL } from "../../app.config.js";



var form = document.getElementById("reg-form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    var data = event.currentTarget.elements;
    if(data.password.length<8){
        alert('Пароль должен быть больше 8 знаков')
        return
    }
    fetch(`${serverURL}/auth/local/register`, {
        method: "POST",
        body: JSON.stringify({
            username: data.login.value,
            email: data.email.value,
            password: data.password.value,
        }),
        headers: {
            'Content-type': 'application/json'
        }
    }).then((responce) => {
        if (!responce.ok) {
            alert('Ошибка при регистрации')
            return
        }
        responce.json().then((data) => {
            window.store.dispatch({ type: 'LOGIN' }, {
                token: data.jwt,
                login: data.user.username
            })

            alert('Вы зарегистированы')
            window.location.href='/'
        });
    });
});