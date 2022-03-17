

const loggedInUser = {
    id: 1,
    name: "Bryan",
    email: "bryan@bn.com"
}

export const getLoggedInUser = () => {
    return loggedInUser;
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


export const getPosts = () => {

    return fetch("http://localhost:8088/posts?_expand=user")
    
    .then(response => response.json())
    .then(parsedResponse => {
        // do something with response here
        return parsedResponse;
    })
}

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


