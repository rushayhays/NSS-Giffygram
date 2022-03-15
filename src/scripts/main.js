/**
 * Main logic module for what should happen on initial page load for Giffygram
 */

/*
This function performs one, specific task.

1. Can you explain what that task is?
2. Are you defining the function here or invoking it?
*/

// import { getLoggedInUser } from "./Data/dataManager.js"
import { getUsers } from "./data/dataManager.js"
import { getLoggedInUser }  from "./data/dataManager.js"
import { getPosts } from "./data/dataManager.js"

console.log("It works, Yay")
// console.log(getLoggedInUser())

const startGiffyGram = () => {
    const postElement = document.querySelector(".postList");
	postElement.innerHTML = "Hello Cohort 55"
}
// Are you defining the function here or invoking it?
startGiffyGram();

console.log(getUsers())
console.log(getLoggedInUser())
console.log(getPosts())