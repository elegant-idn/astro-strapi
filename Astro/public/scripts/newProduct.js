import { serverURL, picURL, localStorageName } from '../../app.config.js'
var auth = localStorage.getItem(localStorageName)
var token = JSON.parse(auth).token
const createBtn = document.getElementById('new-button')
createBtn.addEventListener('click',create)
function showPics() {
    fetch(`${serverURL}/upload/files`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(responce => {
        responce.json().then(data => {
            var picDiv = document.getElementById('pictures')
            data.forEach(element => {
                var div = document.createElement('div')
                div.classList.add('picture')
                div.id = element.id
                var img = document.createElement('img')
                img.src = picURL + element.url
                // img.height = "200px";
                // img.width = "200px";
                var checkbox = document.createElement('input')
                checkbox.type = "checkbox";
                div.appendChild(img)
                div.appendChild(checkbox)
                picDiv.appendChild(div)
            });
        })
    })
}
showPics()

function create() {
    var picID = null
    var pictures = document.getElementsByClassName("picture")
    pictures.forEach(pic => {
        var checkbox = pic.getElementsByTagName('input')[0]
        if (checkbox.checked == true) {
            picID = pic.id
        }
    })
    if (picID == null) {
        alert("Выберите картинку для товара")
        return
    }
    var Title = document.getElementById('title').value
    var UID = document.getElementById('uid').value
    var Price = document.getElementById('price').value
    console.log(JSON.stringify({
        data:{
            UID,
            Title,
            Price,
            Image:picID
        }
    }))
    fetch(`${serverURL}/products`, {
        method: "POST",
        headers: {
            'Authorization':`Bearer ${token}`,
            'Content-type':'application/json'
        },
        body:JSON.stringify({
            data:{
                UID,
                Title,
                Price,
                Image:picID
            }
        })
    }).then(responce=>{
        responce.json().then(data=>{
            if(data.data){
                alert("Продукт создан")
                window.location.href='/'
            }else{
                alert('Ошибка')
            }
        })
    })
}