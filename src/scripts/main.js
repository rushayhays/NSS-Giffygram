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


import { PostList } from "./feed/postlist.js"
import { NavBar } from "./nav/NavBar.js"
import { Footer } from "./footer/footer.js"

console.log("It works, Yay")




const showNavBar = () => {
    //Get a reference to the location on the DOM where the nav will display
    const navElement = document.querySelector("nav");
	navElement.innerHTML = NavBar();
}

const showPostList = () => {
	//Get a reference to the location on the DOM where the list will display
	const postElement = document.querySelector(".postList");
	getPosts().then((allPosts) => {
		postElement.innerHTML = PostList(allPosts);
	})
}

const showFooter = () => {
    //Get a reference to the location on the DOM where the nav will display
    const navElement = document.querySelector("footer");
	navElement.innerHTML = Footer();
}


const startGiffyGram = () => {
    showNavBar();
	showPostList();
	showFooter();
}

startGiffyGram();


//somehow this will be used later to update timestamps
// const currentDate = new Date();
// const timestamp = currentDate;
// const numberstamp = Date.now();
// console.log(timestamp)
// console.log(numberstamp)

const applicationElement = document.querySelector(".giffygram");

applicationElement.addEventListener("click", event => {
	if (event.target.id === "logout"){
		console.log("You clicked on logout")
	}
})

applicationElement.addEventListener("change", event => {
	if (event.target.id === "yearSelection") {
	  const yearAsNumber = parseInt(event.target.value)
  
	  console.log(`User wants to see posts since ${yearAsNumber}`)
	}
  })

//   Display an alert message of your choosing when the direct message icon 
// (i.e. the fountain pen in the navbar) is clicked. Remember that you are using 
// event bubbling and that the event should be captured on the <main> element. That
//  means you need to check what the id property of the event target is.
// fountain pen id="directMessageIcon"
applicationElement.addEventListener("click", event => {
	if (event.target.id === "directMessageIcon") {
		console.log("Make new Posts! -Feature coming soon!")
	}
  })



// The peanut butter jar icon in the nav bar is how the user will, eventually, be able
// to go back to the default state of the application. Think of it as "going home".
// When that icon is clicked, display an alert message of your choosing. Currently
// there is not an id attribute on that image, so you will need to add one.

applicationElement.addEventListener("click", event => {
	if (event.target.id === "goHomeIcon") {
		console.log("Head back home! -Feature coming soon!")
	}
  })

  //add an event listener for the edit button
  applicationElement.addEventListener("click", (event) => {
	
	if (event.target.id.startsWith("edit")){
		console.log("post clicked", event.target.id.split("--"))
		console.log("the id is", event.target.id.split("--")[1])
	}
})
