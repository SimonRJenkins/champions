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
const endorsementEl = document.getElementById("endorsements")

publishButtonEl.addEventListener("click", function () {
    let inputValue = inputFieldEl.value

    push(endorsementsInDB, inputValue)

    clearInputFieldEl()
})


onValue(endorsementsInDB, function (snapshot) {

    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())

        clearEndorsementsEl()

        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemId = currentItem[0]
            let currentItemValue = currentItem[1]

            appendItemToEndorsementEl(currentItem)

        }
    }
    else {
        endorsementEl.setAttribute("id", "endorsement")
        endorsementEl.textContent = "No current endorsements"
    }

})

function clearEndorsementsEl() {
    endorsementEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToEndorsementEl(item) {
    let itemID = item[0]
    let itemValue = item[1]

    let newBox = document.createElement("div")
    let newEl = document.createElement("p")

    newEl.textContent = itemValue

    newBox.setAttribute("class", "endorsements")
    newEl.setAttribute("id", "endorsement")

    newBox.appendChild(newEl)

    newEl.addEventListener("click", function () {
        let exactLocationOfItemInDB = ref(database, `endorsements/${itemID}`)
        remove(exactLocationOfItemInDB)
    })

    endorsementEl.appendChild(newBox)
}
