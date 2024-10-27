var UID = document.getElementById('uid')
var title = document.getElementById('title')
var price = document.getElementById('price')
var id = document.getElementById('id').value


const save = () => {
    var state = window.store.getState()
    if (!state.token) {
        return
    }
    // console.log(state.token)
    fetch(`http://localhost:1337/api/products/${id}`, {
        method: "PUT",
        body: JSON.stringify({
            data: {
                UID: UID.value,
                Title: title.value,
                price: title.price,
            }
        }),
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${state.token}`
        }
    }).then(responce => {
        responce.json().then(data => {
            alert('Изменения сохранены')
        })
    })
}

const addToCart = () => {
    var state = window.store.getState()
    if (!state.token) {
        return
    }
    // console.log(state.token)
    fetch(`http://localhost:1337/api/cart/${id}`, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${state.token}`
        }
    }).then(responce => {
        responce.json().then(data => {
            alert('Товар добавлен в корзину')
        })
    })
}

function enableChanging() {
    UID = document.getElementById('uid')
    title = document.getElementById('title')
    price = document.getElementById('price')
    saveBtn = document.getElementById('saveButton')
    saveBtn.classList.toggle('hide')
    UID.disabled = !UID.disabled
    title.disabled = !title.disabled
    price.disabled = !price.disabled
}


function deleteProduct() {
    var state = window.store.getState()
    fetch(`http://localhost:1337/api/products/${id}`, {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${state.token}`
        }
    }).then(responce => {
        responce.json().then(data => {
            window.location.href = '/'
        })
    })
}
