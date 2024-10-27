import { localStorageName,serverURL } from '../../app.config.js'
async function render() {
    var storage = localStorage.getItem(localStorageName)
    if (storage == null) {
        window.location.href = '/enter'
    }
    var auth = JSON.parse(storage)
    var responce = await fetch("http://localhost:1337/api/cart", {
        headers: {
            Authorization: `Bearer ${auth.token}`,
        },
    });
    var products = (await responce.json())
    var cartDiv = document.getElementById('cartProducts')
    while (cartDiv.firstChild) {
        cartDiv.removeChild(cartDiv.firstChild);
    }
    products.forEach(element => {
        var topDiv = document.createElement('div')
        topDiv.classList.add('link-card')
        var a = document.createElement('a')
        a.classList.add('card')
        var idDiv = document.createElement('div')
        idDiv.innerHTML = element.id
        var titleDiv = document.createElement('a')
        titleDiv.href = `/product/${element.id}`
        titleDiv.innerHTML = element.Title
        var priceDiv = document.createElement('div')
        priceDiv.innerHTML = element.Price
        var deleteSpan = document.createElement('span')
        deleteSpan.classList.add('material-symbols-outlined')
        deleteSpan.innerHTML = 'delete'
        deleteSpan.onclick = setDelete(element.id,auth.token)
        a.appendChild(idDiv)
        a.appendChild(titleDiv)
        a.appendChild(priceDiv)
        a.appendChild(deleteSpan)
        topDiv.appendChild(a)
        cartDiv.appendChild(topDiv)
    });
    window.store.subscribe(render)

}
render()
function setDelete(id,token) {
    return function deleteItem() {
        fetch(`${serverURL}/cart/${id}`,{
            method:"DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(responce=>{
            alert('Элемент удален')
            render()
            // responce.json().then(data=>{
                
            // })
        })
    }
}