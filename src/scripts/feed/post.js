

export const Post = (postObject) => {
  const theDate = new Date(postObject.timestamp)
  return `
  <section class="post">
    <div>
      <header>
      <h2 class="post__title">${postObject.title}</h2>
      </header>
      <img class="post__image" src="${postObject.imageURL}" />
    </div>
    <div><button id="edit--${postObject.id}">Edit</button></div>
    <div class="new__description">
      <blockquote>${postObject.description}</blockquote>
      <p>Posted by: ${postObject.user.name}</p>
      <p>${theDate}</p>
    </div>
  </section>
  `
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
