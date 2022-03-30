/**
 * Main logic module for what should happen on initial page load for Giffygram
 */

/*
This function performs one, specific task.

1. Can you explain what that task is?
2. Are you defining the function here or invoking it?
*/

import { getUsers } from "./data/dataManager.js"
import { getLoggedInUser, logoutUser, loginUser, setLoggedInUser, registerUser }  from "./data/dataManager.js"
import { getPosts } from "./data/dataManager.js"
import { PostEntry } from "./feed/postEntry.js"


import { PostList, yourPostList } from "./feed/postlist.js"
import { usePostCollection } from "./data/dataManager.js"
import { NavBar } from "./nav/NavBar.js"
import { Footer } from "./footer/footer.js"
import { createPost } from "./data/dataManager.js"
import { deletePost, getSinglePost, updatePost } from "./data/dataManager.js"
import { PostEdit } from "./feed/PostEdit.js"
import { LoginForm } from "./auth/LoginForm.js"
import { RegisterForm } from "./auth/RegisterForm.js"


console.log("It works, Yay")




const showNavBar = () => {
    //Get a reference to the location on the DOM where the nav will display
    const navElement = document.querySelector("nav");
	navElement.innerHTML = NavBar();
}



const showPostEntry = () => { 
	//Get a reference to the location on the DOM where the nav will display
	const entryElement = document.querySelector(".entryForm");
	entryElement.innerHTML = PostEntry();
}

//This will show the user's posts
const showUserPostList = () => {
	//Get a reference to the location on the DOM where the list will display
	const postElement = document.querySelector(".userPostList");
	let user = JSON.parse(sessionStorage.getItem("user"))
	getPosts().then((allPosts) => {
		let userCollection = [];
		console.log(allPosts.length)
		for(let x=0; x<allPosts.length; x++){
		  if(allPosts[x].userId === user.id){
			userCollection.push(allPosts[x])
		  }
		}

		postElement.innerHTML = yourPostList(userCollection);
		console.log(userCollection)
	})
}


//THis will show everyone else's posts
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
	showPostEntry();
	showUserPostList();
	showPostList();
	showFooter();
}

// startGiffyGram();


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
  
//This creates a post
applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id === "newPost__submit") {
	//collect the input values into an object to post to the DB
	  console.log("I was clicked")
	  const title = document.querySelector("input[name='postTitle']").value
	  const url = document.querySelector("input[name='postURL']").value
	  const description = document.querySelector("textarea[name='postDescription']").value
	  //we have not created a user yet - for now, we will hard code `1`.
	  const user = JSON.parse(sessionStorage.getItem("user"));
	  const userId = user.id;
	  //we can add the current time as well
	  const postObject = {
		  title: title,
		  imageURL: url,
		  description: description,
		  userId: userId,
		  timestamp: Date.now()
	  }
  
	// be sure to import from the DataManager

		createPost(postObject).then(showPostList)
		clearEntryForm();
	}
})

//This allows you to delete a post
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

// showEdit, invoked within the edit button listener will GET the post object from the data base and insert it into an edit field 
const showEdit = (postObj) => {
	const entryElement = document.querySelector(".entryForm");
	entryElement.innerHTML = PostEdit(postObj);
}
applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id.startsWith("edit")) {
	  const postId = event.target.id.split("__")[1];
	  getSinglePost(postId)
		.then(response => {
		  showEdit(response);
		})
	}
})

//After clicking update Post, the info is stored into an object and used to update the post, the
// entryform is also cleared
applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id.startsWith("updatePost")) {
	  const postId = event.target.id.split("__")[1];
	  //collect all the details into an object
	  const title = document.querySelector("input[name='postTitle']").value
	  const url = document.querySelector("input[name='postURL']").value
	  const description = document.querySelector("textarea[name='postDescription']").value
	  const timestamp = document.querySelector("input[name='postTime']").value
	  
	  const postObject = {
		title: title,
		imageURL: url,
		description: description,
		userId: getLoggedInUser().id,
		timestamp: parseInt(timestamp),
		id: parseInt(postId)
	  }
	  
	  updatePost(postObject)
		.then(response => {
		  showPostList();
		})
		clearEntryForm();
	}
})


//This area handles login/registering and checking for a user

//This will let us know if someone hit "logout"
applicationElement.addEventListener("click", event => {
	if (event.target.id === "logout") {
	  logoutUser();
	  console.log(getLoggedInUser());
	  sessionStorage.clear();
	  checkForUser();
	}
})


//when showLoginRegister is invoked, the page will be re-written to display 
// a LoginForm and a RegisterForm
const showLoginRegister = () => {
	showNavBar();
	const entryElement = document.querySelector(".entryForm");
	//template strings can be used here too
	entryElement.innerHTML = `${LoginForm()} <hr/> <hr/> ${RegisterForm()}`;
	//make sure the post list is cleared out too
	const postElement = document.querySelector(".postList");
	postElement.innerHTML = "";
	//also clear out userPostList
	const userPostElement = document.querySelector(".userPostList");
	userPostElement.innerHTML = "";
}

const checkForUser = () => {
	if (sessionStorage.getItem("user")){
		setLoggedInUser(JSON.parse(sessionStorage.getItem("user")));
	  startGiffyGram();
	}else {
		 showLoginRegister();
	}
}

//commented out line 77, so that this takes over loading sequence
checkForUser()

// const checkForUser = () => {
// 	if (sessionStorage.getItem("user")){
// 	  setLoggedInUser(JSON.parse(sessionStorage.getItem("user")));
// 	  startGiffyGram();
// 	}else {
// 	  //show login/register
// 	  console.log("showLogin")
// 	}
//   }

//This function invokes checkForUser and works the main magic of determining whether
//to load the posts or to load the loginRegister page
applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id === "login__submit") {
	  //collect all the details into an object
	  const userObject = {
		name: document.querySelector("input[name='name']").value,
		email: document.querySelector("input[name='email']").value
	  }
	  loginUser(userObject)
	  .then(dbUserObj => {
		if(dbUserObj){
		  sessionStorage.setItem("user", JSON.stringify(dbUserObj));
		  startGiffyGram();
		}else {
		  //got a false value - no user
		  const entryElement = document.querySelector(".entryForm");
		  entryElement.innerHTML = `<p class="center">That user does not exist. Please try again or register for your free account.</p> ${LoginForm()} <hr/> <hr/> ${RegisterForm()}`;
		}
	  })
	}
})

//This function allows a user to register, adds them to the database and starts a giffygram session for them all in one go.
applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id === "register__submit") {
	  //collect all the details into an object
	  const userObject = {
		name: document.querySelector("input[name='registerName']").value,
		email: document.querySelector("input[name='registerEmail']").value
	  }
	  registerUser(userObject)
	  .then(dbUserObj => {
		sessionStorage.setItem("user", JSON.stringify(dbUserObj));
		startGiffyGram();
	  })
	}
  })