if (window.location.href.match("gallery")) {
  function openNewPage(imagePath) {
    window.open(`image.html?name=${imagePath}`);
  }
}

if (window.location.href.match("image")) {
  const submit = document.querySelector(".comment-submit");
  const commentList = document.querySelector(".comments");
  const commentInput = document.querySelector(".comment-input");
  const commentAuthor = document.querySelector(".comment-author-input");

  function template(data) {
    return `<div class="comment flex items-start justify-start">
           <div class="flex-1">
             <h3 class="comment-author">${data.author}</h3>
             <p class="comment-body">${data.comment}</p>
           </div>
          </div>`;
  }

  function appendComment(event, image) {
    event.preventDefault();

    const commentData = {
      comment: commentInput.value,
      author: commentAuthor.value,
    };

    var templateString = template(commentData);
    commentList.insertAdjacentHTML("beforeend", templateString, false);

    commentInput.value = "";
    commentAuthor.value = "";
    localStorage.setItem(image, commentList.innerHTML);
  }

  window.onload = () => {
    const queryString = window.location.search;
    var index = queryString.indexOf("=");

    var imagePath = queryString.substr(index + 1);

    var imageElement = document.getElementById("image");
    imageElement.src = `Images/${imagePath}`;

    const saved = localStorage.getItem(imagePath);
    if (saved) {
      commentList.innerHTML = saved;
    }

    submit.addEventListener(
      "click",
      (e) => {
        appendComment(e, imagePath);
      },
      false
    );
  };
}
