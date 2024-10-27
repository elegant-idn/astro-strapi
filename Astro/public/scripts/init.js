import { localStorageName } from '../../app.config.js'
import { createStore } from '../../src/pseudoRedux/createStore.js'
import { Reducer } from '../../src/pseudoRedux/Reducer.js'



let savedLogin = JSON.parse(localStorage.getItem(localStorageName))
let initialState = savedLogin == undefined ? { login: null, token: null } : savedLogin
const linksNoAuth = [
    { src: "/", name: "Главная" },
    { src: "/enter", name: "Вход" },
    { src: "/register", name: "Регистрация" },
];
const linksAuth = [
    { src: "/", name: "Главная" },
    { src: "/cart", name: "Корзина" },
]

window.store = createStore(Reducer, initialState)
var login = document.getElementById("login")

function render() {
    var state = window.store.getState()
    let linksDiv = document.getElementById('links')
    if (state.login) {
        console.log('voshel')
        linksDiv.innerHTML = ''
        linksAuth.forEach(link => { linksDiv.innerHTML = linksDiv.innerHTML + `<a style = " margin: 10px;color: black;text-decoration: none;" href=${link.src}>${link.name}</a>` })
        linksDiv.innerHTML = linksDiv.innerHTML + `<a style = " margin: 10px;color: black;text-decoration: none;" id = 'out'>Выход</a>`
        let out = document.getElementById('out')
        out.addEventListener('click', () => {
            window.store.dispatch({ type: "LOGOUT" })
        })
    } else {
        console.log('ne voshel')
        linksDiv.innerHTML = ''
        linksNoAuth.forEach(link => { linksDiv.innerHTML = linksDiv.innerHTML + `<a style = " margin: 10px;color: black;text-decoration: none;" href=${link.src}>${link.name}</a>` })
    }
    var card = document.getElementById('card')
    if (card) {
        if (state.login) {
            card.innerHTML = card.innerHTML + `<span id='changeButton' style="cursor:pointer;" class="material-symbols-outlined">
    edit
    </span><span id='deleteButton' style="cursor:pointer;" class="material-symbols-outlined">
    delete
    </span>`
            var changeButton = document.getElementById('changeButton')
            changeButton.addEventListener('click', enableChanging)
            var deleteButton = document.getElementById('changeButton')
            deleteButton.addEventListener('click', deleteProduct)
        } else {
            var span = document.getElementById('changeButton')
            if (span) span.parentNode.removeChild(span)
        }
    }
    var addBtn = document.getElementById('addBtn')
    if (addBtn) {
        if (state.login) {
            addBtn.innerHTML = `<span id='addButton' style="cursor:pointer;" class="material-symbols-outlined">
    add
    </span>`
            var changeButton = document.getElementById('addButton')
            changeButton.addEventListener('click', () => window.location.href='/newproduct')
        }else{
            var span = document.getElementById('addButton')
            if (span) span.parentNode.removeChild(span)
        }
    }
    login.textContent = state.login
}
render()
window.store.subscribe(render)


