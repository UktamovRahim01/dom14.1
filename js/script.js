import { getData, postData, deleteData, updateData } from "./http.js"
const box1 = document.querySelector('#twenty-five')
const box2 = document.querySelector('#fifty')
const box3 = document.querySelector('#others')
const form = document.forms.form
const change_form = document.forms.change_form
const modal = document.querySelector("#modal")
const close = document.querySelector(".close")
const firstName = document.querySelector("#change_name")
const age = document.querySelector("#change_age")
let globalId;

getData("/users")
    .then(data => reload(data))


form.onsubmit = (event) => {
    event.preventDefault()

    let user = {
        id: Math.random()
    }

    let fm = new FormData(event.target)

    fm.forEach((value, key) => {
        user[key] = value
    })

    postData("/users", user)
        .then(() => {
            getData("/users")
                .then(res => reload(res))
        })
    event.target.reset()
}

change_form.onsubmit = (e) => {
    e.preventDefault()

    let user = {

    }
    let fm = new FormData(e.target)

    fm.forEach((value, key) => {
        user[key] = value
    })
    console.log(user);
    updateData("/users/" + globalId, user)
        .then(() => {
            getData("/users")
                .then(res => reload(res))
        })

    modal.style.display = "none";
    globalId = ''
    e.target.reset()
}



function reload(arr) {
    box1.innerHTML = ''
    box2.innerHTML = ''
    box3.innerHTML = ''

    for (let item of arr) {
        let div = document.createElement('div')
        let top = document.createElement("div")
        let h3 = document.createElement('h3')
        let p = document.createElement("p")
        let edit = document.createElement("span")

        edit.classList.add("edit")
        top.classList.add("top")
        div.classList.add('box-item')

        edit.innerHTML = "&times;"
        h3.innerHTML = `${item.firstName}`
        p.innerHTML = `Age: ${item.age}`
        top.append(h3, edit)
        div.append(top, p)

        div.ondblclick = () => {
            firstName.value = item.firstName
            age.value = item.age
            globalId = item.id
            openModal()
        }

        edit.onclick = () => {
            deleteData("/users/", item.id)
                .then(() => {
                    getData("/users")
                        .then(res => reload(res))
                })
        }
        item.age < 25 ? box1.append(div)
            : item.age > 25 && item.age <= 50 ? box2.append(div)
                : box3.append(div)
    }
}

function openModal() {
    modal.style.display = "block";

}

close.onclick = () => {
    modal.style.display = "none";
}

