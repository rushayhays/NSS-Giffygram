

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
    <button id="delete__${postObject.id}">Delete</button>
    <div class="new__description">
      <blockquote>${postObject.description}</blockquote>
      <p>Posted by: Bryan</p>
      <p>${theDate}</p>
    </div>
  </section>
  `
}
  //will need to fix it to get the name

