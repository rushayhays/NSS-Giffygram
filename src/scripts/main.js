/**
 * Main logic module for what should happen on initial page load for Giffygram
 */

/*
This function performs one, specific task.

1. Can you explain what that task is?
2. Are you defining the function here or invoking it?
*/

import { getUsers } from "./data/dataManager.js"
import { getLoggedInUser }  from "./data/dataManager.js"
import { getPosts } from "./data/dataManager.js"
import { PostEntry } from "./feed/postEntry.js"


import { PostList } from "./feed/postlist.js"
import { usePostCollection } from "./data/dataManager.js"
import { NavBar } from "./nav/NavBar.js"
import { Footer } from "./footer/footer.js"
import { createPost } from "./data/dataManager.js"
import { deletePost } from "./data/dataManager.js"


console.log("It works, Yay")




const showNavBar = () => {
    //Get a reference to the location on the DOM where the nav will display
    const navElement = document.querySelector("nav");
	navElement.innerHTML = NavBar();
}

//how I wrote it
// const showPostEntry = () => {
// 	//Get a reference to the location on the DOM where the list will display
// 	const postElement = document.querySelector(".entryForm");
// 	postElement.innerHTML = PostEntry();
// }

//how she wrote it
const showPostEntry = () => { 
	//Get a reference to the location on the DOM where the nav will display
	const entryElement = document.querySelector(".entryForm");
	entryElement.innerHTML = PostEntry();
  }

const showPostList = () => {
	//Get a reference to the location on the DOM where the list will display
	const postElement = document.querySelector(".postList");
	getPosts().then((allPosts) => {
		postElement.innerHTML = PostList(allPosts);
		console.log(usePostCollection())
	})
}

const showFooter = () => {
    //Get a reference to the location on the DOM where the nav will display
    const navElement = document.querySelector("footer");
	navElement.innerHTML = Footer();
}


const startGiffyGram = () => {
    showNavBar();
	showPostEntry();
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


//here's a filter for the year
applicationElement.addEventListener("change", event => {
	if (event.target.id === "yearSelection") {
	  const yearAsNumber = parseInt(event.target.value)
	  console.log(`User wants to see posts since ${yearAsNumber}`)
	  //invoke a filter function passing the year as an argument
	  showFilteredPosts(yearAsNumber);
	}
})
  
const showFilteredPosts = (year) => {
//get a copy of the post collection
const epoch = Date.parse(`01/01/${year}`);
//filter the data
const filteredData = usePostCollection().filter(singlePost => {
	if (singlePost.timestamp >= epoch) {
	return singlePost
	}
})
const postElement = document.querySelector(".postList");
postElement.innerHTML = PostList(filteredData);
}


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

// cancel and submit buttons for gif entry/postEntry
const clearEntryForm = () => {
	document.querySelector("input[name='postTitle']").value = "";	
	document.querySelector("input[name='postURL']").value = "";
	document.querySelector("textarea[name='postDescription']").value = "";

}


applicationElement.addEventListener("click", event => {
	if (event.target.id === "newPost__cancel") {
		//clear the input fields
	}
  })
  
  applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id === "newPost__submit") {
	//collect the input values into an object to post to the DB
	  console.log("I was clicked")
	  const title = document.querySelector("input[name='postTitle']").value
	  const url = document.querySelector("input[name='postURL']").value
	  const description = document.querySelector("textarea[name='postDescription']").value
	  //we have not created a user yet - for now, we will hard code `1`.
	  //we can add the current time as well
	  const postObject = {
		  title: title,
		  imageURL: url,
		  description: description,
		  userId: 1,
		  timestamp: Date.now()
	  }
  
	// be sure to import from the DataManager

		createPost(postObject).then(showPostList)
		clearEntryForm();
	}
  })

  applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id.startsWith("delete")) {
	  const postId = event.target.id.split("__")[1];
	  deletePost(postId)
		.then(response => {
		  showPostList();
		})
	}
  })
