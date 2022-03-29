
//This area was updated, logged in user is no longer hard-coded
//it is now an empty object
let loggedInUser = {}


export const logoutUser = () => {
    loggedInUser = {}
}


export const getLoggedInUser = () => {
    return loggedInUser;
}

//This function was added later on, it will allow someone to log on
export const setLoggedInUser = (userObj) => {
    loggedInUser = userObj;
}

export const getUsers = () => {

    return fetch("http://localhost:8088/users")
    .then(response => response.json())
    .then(parsedResponse => {
        // do something with response here
        return parsedResponse;
    })
}

// ("http://localhost:8088/posts?_sort=id&_order=desc")


// export const getPosts = () => {

//     return fetch("http://localhost:8088/posts?_expand=user")
    
//     .then(response => response.json())
//     .then(parsedResponse => {
//         // do something with response here
//         return parsedResponse;
//     })
// }

export const createPost = postObj => {
    return fetch("http://localhost:8088/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postObj)
  
    })
        .then(response => response.json())
}


let postCollection = [];

export const usePostCollection = () => {
  //Best practice: we don't want to alter the original state, so
  //make a copy of it and then return it
  //The spread operator makes this quick work
  return [...postCollection];
}
export const getPosts = () => {
  return fetch("http://localhost:8088/posts")
    .then(response => response.json())
    .then(parsedResponse => {
      postCollection = parsedResponse
      return parsedResponse;
    })
}

export const deletePost = postId => {
    return fetch(`http://localhost:8088/posts/${postId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
  
    })
        .then(response => response.json())
        
}

export const getSinglePost = (postId) => {
    return fetch(`http://localhost:8088/posts/${postId}`)
      .then(response => response.json())
}

export const updatePost = postObj => {
    return fetch(`http://localhost:8088/posts/${postObj.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postObj)
  
    })
        .then(response => response.json())
        
}


//This functions takes in an object and compares it against the database
//of users to look for a match

export const loginUser = (userObj) => {
    return fetch(`http://localhost:8088/users?name=${userObj.name}&email=${userObj.email}`)
    .then(response => response.json())
    .then(parsedUser => {
      //is there a user?
      console.log("parsedUser", parsedUser) //data is returned as an array
      if (parsedUser.length > 0){
        setLoggedInUser(parsedUser[0]);
        return getLoggedInUser();
      }else {
        //no user
        return false;
      }
    })
}

//This function will POST an object containing a new users info to the user database
export const registerUser = (userObj) => {
    return fetch(`http://localhost:8088/users`, {
      method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userObj)
    })
    .then(response => response.json())
    .then(parsedUser => {
      setLoggedInUser(parsedUser);
      return getLoggedInUser();
    })
  }