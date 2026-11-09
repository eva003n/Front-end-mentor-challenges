const commentsArea = document.querySelector(".comments-area");

const commentFrom = document.querySelector(".comment-form");

function renderComments(data) {
  let comments = "";

  data.comments.forEach((comment, index) => {
    comments += `
    <div class="card" data-comment-id=${comment.id} data-timestamp=${comment.timestamp}>
          <div class="rate-comment-area">
            <button class="btn-ghost" type="button" aria-label="Upvote">
              <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z" fill="currentColor"/></svg>
            </button>
            <span class="score">${comment.score}</span>
            <button class="btn-ghost" type="button" aria-label="Downvote">
              <svg width="11" height="3" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z" fill="currentColor"/></svg>
            </button>
          </div>
          <div class="card-content">
            <div class="card-title">
              <div class="left-section">
                <img class="avatar-sm" src=${comment.user.image.webp} alt=${comment.user.username}'s avatar width="32" height="32" />
                <p class="username">${comment.user.username}</p>
                <time datetime=${getDateComponent(comment?.timestamp)}>${timeAgo(comment?.timestamp)}</time>
              </div>
              <div class="right-section">
                <button class="btn-text btn-reply" type="button">
                  <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="currentColor"/></svg>
                  Reply
                </button>
              </div>
            </div>
            <p class="comment-text">${comment.content}</p>
          </div>
        </div>
        ${renderReplies(comment.replies)}
        `;
  });

  commentsArea.innerHTML = comments;
  // console.log(comments)
}

function renderReplies(replies) {
  let replyComments = "";

  if (!replies || replies.length === 0) {
    return ""; // no replies for that comment
  }
  replies.forEach((reply) => {
    replyComments += `<div class="replies" data-comment-id=${reply.id} data-timestamp=${reply?.timestamp}>   
        <div class="card reply">
            <div class="rate-comment-area">
              <button class="btn-ghost" type="button" aria-label="Upvote">
                <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z" fill="currentColor"/></svg>
              </button>
              <span class="score">${reply.score}</span>
              <button class="btn-ghost" type="button" aria-label="Downvote">
                <svg width="11" height="3" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z" fill="currentColor"/></svg>
              </button>
            </div>
            <div class="card-content">
              <div class="card-title">
                <div class="left-section">
                  <img class="avatar-sm" src=${reply.user.image.webp} alt=${reply.user.username}'s avatar" width="32" height="32" />
                  <p class="username">${reply.user.username}</p>
                  <time datetime=${getDateComponent(reply?.timestamp)}>${timeAgo(reply?.timestamp)}</time>
                </div>
                <div class="right-section">
                ${renderReplyActions(reply)}
                </div>
              </div>
              <p class="comment-text">
                <span class="mention">@${reply.replyingTo}</span> ${reply.content}</p>
            </div>
          </div>
        </div>`;
  });

  return replyComments;
}

function renderCommentForm(data) {
  commentFrom.innerHTML = `
  <form action="#">
          <label for="comment-box" class="visually-hidden">Add a comment</label>
          <textarea
            name="textarea"
            id="comment-box"
            autocorrect="on"
            spellcheck="true"
            minlength="5"
            placeholder="Add a comment..."
            class="rounded"
            required
          ></textarea>
          <img
            class="avatar"
            src=${data.currentUser.image.webp}
            alt="${data.currentUser.username}'s avatar"
            width="40"
            height="40"
          />
          <button type="submit" class="btn-filled rounded">Send</button>
        </form>
  `;
}

function renderReplyActions(reply) {
  let actions = "";
  if (reply.user.username !== data.currentUser.username) {
    actions += `
   <button class="btn-text btn-reply" type="button">
                    <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="currentColor"/></svg>
                    Reply
                  </button>
`;
  } else {
    actions += `
   <button class="btn-text btn-delete" type="button">
                    <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" fill="currentColor"/></svg>
                    Delete
                  </button>
                  <button class="btn-text" type="button">
                    <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" fill="currentColor"/></svg>
                    Edit
                  </button>
  `;

  }
  return actions;

}
const parseJson = (json) => {
  if (!json) return;
  return JSON.parse(json);
};
const stringify = JSON.stringify;

function saveData(data) {
  if (!data) return;
  localStorage.setItem("data", stringify(data));
}
async function getData() {
  // get data from local storage
  let data = parseJson(localStorage.getItem("data"));

  // otherwise fetch it
  if (!data) {
    const response = await fetch("./data.json");
    if (response.ok) {
      data = await response.json();

      saveData(data);
      return data;
    } else {
      throw new Error(
        `Status: ${response.status} Couldn't fetch data from server`,
      );
    }
  }
  return data;
}

function getCurrentUser() {}

const data = await getData();
renderCommentForm(data);
renderComments(data);

function autoGenerateCommentId() {
  const ids = data.comments.flatMap((c) => [
    c.id,
    ...c.replies.map((r) => r.id),
  ]);
  return Math.max(0, ...ids) + 1;
}

function createComment(content, comments, replyingTo) {
  if (!content) return;

  const now = new Date().toISOString();
  const comment = {
    id: autoGenerateCommentId(),
    content,
    createdAt: timeAgo(now),
    timestamp: now,
    score: 0,
    user: data.currentUser,
    replies: [],
  };
  if (replyingTo) {
    comment.replyingTo = replyingTo;
    delete comment.replies;
  }

  comments.push(comment);
  saveData(data);
  return comment;
}

function addReplyToComment(commentId, content, replyingTo) {
  if (!commentId) return;

  const comment = data.comments.find((comment) => comment.id === commentId);

  if (!content) return;

  createComment(content, comment.replies, replyingTo);
}

function updateComment(commentId, content) {
  let comment = data.comments.find((comment) => comment.id === commentId);
}

function deleteComment() {

}

function getDateComponent(dateString) {
  return dateString ? dateString.split("T")[0] : ""; // 2026-11-03
}

function timeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  let interval = seconds / 31536000; // years
  if (interval > 1) return Math.floor(interval) + " years ago";

  interval = seconds / 2592000; // months (approx. 30 days)
  if (interval > 1)
    return (
      Math.floor(interval) +
      " month" +
      (Math.floor(interval) === 1 ? "" : "s") +
      " ago"
    );

  interval = seconds / 86400; // days
  if (interval > 1) return Math.floor(interval) + " days ago";

  interval = seconds / 3600; // hours
  if (interval > 1) return Math.floor(interval) + " hours ago";

  interval = seconds / 60; // minutes
  if (interval > 1) return Math.floor(interval) + " minutes ago";

  return "Just now";
}

const form = document.querySelector("form");
const commentBox = document.getElementById("comment-box");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  form.setAttribute("disabled", true);

  createComment(commentBox.value, data.comments);
  commentBox.value = "";
  renderComments(data);
});

function renderReplyForm(replyingTo) {
  return `
  <div class="replies reply-form-wrap">
    <div class="card reply-form-card">
      <form class="reply-form" data-replying-to="${replyingTo}">
        <label for="reply-box" class="visually-hidden">Reply to ${replyingTo}</label>
        <textarea
          name="reply"
          id="reply-box"
          spellcheck="true"
          placeholder="Reply to @${replyingTo}..."
          required
        ></textarea>
        <img class="avatar" src=${data.currentUser.image.webp} alt="${data.currentUser.username}'s avatar" width="40" height="40" />
        <button type="submit" class="btn-filled rounded">Reply</button>
      </form>
    </div>
  </div>`;
}

// Find the top-level comment that owns a comment/reply id
function findThread(id) {
  return (
    data.comments.find((c) => c.id === id) ||
    data.comments.find((c) => c.replies.some((r) => r.id === id))
  );
}

commentsArea.addEventListener("click", (e) => {
  const btnDelete = e.target.closest(".btn-delete");
  if (btnDelete) {
    document.getElementById("customModal").showModal();

    
    return;
  }

  const btn = e.target.closest(".btn-reply");
  if (!btn) return;

  const card = btn.closest(".card");
  const anchor = card.closest(".replies") || card;

  // Toggle: close any open reply box; stop if it was the one under this card
  const existing = commentsArea.querySelector(".reply-form-wrap");
  const wasOpenHere = existing && existing.previousElementSibling === anchor;
  existing?.remove();
  if (wasOpenHere) return;

  const id = Number(card.closest("[data-comment-id]").dataset.commentId);
  const thread = findThread(id);
  const target = thread.id === id ? thread : thread.replies.find((r) => r.id === id);

  anchor.insertAdjacentHTML("afterend", renderReplyForm(target.user.username));
  anchpr.in
  commentsArea.querySelector("#reply-box").focus();
});

commentsArea.addEventListener("submit", (e) => {
  const replyForm = e.target.closest(".reply-form");
  if (!replyForm) return;
  e.preventDefault();

  const content = replyForm.querySelector("textarea").value.trim();
  if (!content) return;

  const wrap = replyForm.closest(".reply-form-wrap");
  const anchor = wrap.previousElementSibling;
  const id = Number(anchor.dataset.commentId);

  addReplyToComment(findThread(id).id, content, replyForm.dataset.replyingTo);
  renderComments(data);
});

function editComment(node) {
  const textArea = document.createElement("textarea")

  const form = `
   <form class="reply-form" data-replying-to="${replyingTo}">
        <label for="reply-box" class="visually-hidden">Reply to ${replyingTo}</label>
        <textarea
          name="reply"
          id="reply-box"
          spellcheck="true"
          value${node.textContent}
          focus
        ></textarea>
       
        <button type="submit" class="btn-filled rounded">UPDATE</button>
      </form>
  `;
  node.replaceWith(form);

}


const deleteConfirmBtn = document.querySelector(".btn-confirm");
deleteConfirmBtn.addEventListener("click", () => {

})

