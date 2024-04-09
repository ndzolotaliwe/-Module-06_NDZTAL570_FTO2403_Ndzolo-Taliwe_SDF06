import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://mobile-app-65cfe-default-rtdb.europe-west1.firebasedatabase.app/"
}


const app = initializeApp(appSettings)
const database =getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEL = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingList =document.getElementById("shopping-list")

addButtonEl.addEventListener("click",function() {
    let inputValue = inputFieldEL.value
    push(shoppingListInDB,inputValue)
   
    clearInputFieldEl()
})

onValue(shoppingListInDB, function(snapshot)  {    
    if (snapshot.exists()) {
    let itemsArray = Object.entries(snapshot.val())

    clearshoppingListEl()

    for (let i = 0; i < itemsArray.length; i++) {
        let currentItem = itemsArray[i]
        let currentItemID = currentItem[0]
        let currentItemValue = currentItem[1]

        appendItemToShoppingListEl(currentItem)
    }
    } else {
        shoppingList.innerHTML = "No items here...yet" 
    
       }
})
function clearshoppingListEl() {
    shoppingList.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEL.value = ""
}

function appendItemToShoppingListEl(item){
        let itemID = item[0]
        let itemValue = item[1]
   
        let newEl = document.createElement("li") 
   
        newEl.textContent = itemValue
   
          newEl.addEventListener("click", function() {
            let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
   
         remove(exactLocationOfItemInDB)
   })
   
         shoppingList.append(newEl)
     }