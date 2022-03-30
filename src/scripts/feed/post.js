

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
    <div class="new__description">
      <blockquote>${postObject.description}</blockquote>
      <p>Posted by: ${postObject.user.name}</p>
      <p>${theDate}</p>
    </div>
  </section>
  `
}
  //will need to fix it to get the name
  export const yourPost = (postObject) => {
    console.log(postObject.user.name)
    const theDate = new Date(postObject.timestamp)
    return `
    <section class="post">
      <div>
        <header>
        <h2 class="post__title">${postObject.title}</h2>
        </header>
        <img class="post__image" src="${postObject.imageURL}" />
      </div>
      <button id="edit__${postObject.id}">Edit</button>
      <button id="delete__${postObject.id}">Delete</button>
      <div class="new__description">
        <blockquote>${postObject.description}</blockquote>
        <p>Posted by: ${postObject.user.name}</p>
        <p>${theDate}</p>
      </div>
    </section>
    `
  }
