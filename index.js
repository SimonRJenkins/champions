import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://champions-25567-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsInDB = ref(database, "endorsements")

const inputFieldEl = document.getElementById("input-field")
const publishButtonEl = document.getElementById("publish-btn")

publishButtonEl.addEventListener("click", function () {
    let inputValue = inputFieldEl.value

    push(endorsementsInDB, inputValue)

    clearInputFieldEl()
})

function clearInputFieldEl() {
    inputFieldEl.value = ""
}