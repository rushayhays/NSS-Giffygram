

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
  

