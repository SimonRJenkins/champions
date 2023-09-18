import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://champions-25567-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsInDB = ref(database, "endorsements")

const inputFieldEl = document.getElementById("input-field")
const inputFromEl = document.getElementById("input-from")
const inputToEl = document.getElementById("input-to")
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
    inputFromEl.value = "From"
    inputToEl.value = "To"
}

function appendItemToEndorsementEl(item) {
    let itemID = item[0]
    let itemValue = item[1]

    let inputTo = inputToEl.value
    let inputFrom = inputFromEl.value

    let newBox = document.createElement("div")
    let newEl = document.createElement("p")
    let newFrom = document.createElement("p")
    let newTo = document.createElement("p")

    newEl.textContent = itemValue
    newFrom.textContent = "From: " + inputFrom
    newTo.textContent = "To: " + inputTo


    newBox.setAttribute("class", "endorsements")
    newEl.setAttribute("id", "endorsement")

    newTo.style.fontSize = "13px";
    newTo.style.fontWeight = "bold";
    newFrom.style.fontSize = "13px";
    newFrom.style.fontWeight = "bold";

    newBox.appendChild(newTo)
    newBox.appendChild(newEl)
    newBox.appendChild(newFrom)

    newEl.addEventListener("click", function () {
        let exactLocationOfItemInDB = ref(database, `endorsements/${itemID}`)
        remove(exactLocationOfItemInDB)
    })

    endorsementEl.appendChild(newBox)
}


// Add styling for to and from on the endorsement
// Add a like button and styling
// Prevent the publish button being pressed when input field, to and from is empty
// sort text alignment for no current endorsements and new endorsements
// sort out space between endorsements, should be a black gap between each one

