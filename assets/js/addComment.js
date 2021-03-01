import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");
const deleteBtnArray = document.querySelectorAll("button");

const increaseNumber = () => {
    commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

const decreaseNumber = () => {
    commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
};

const addComment = (comment) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.innerHTML = comment;
    li.appendChild(span);
    li.setAttribute("class", "video-commentor");
    commentList.prepend(li);
    increaseNumber();
};

const sendComment = async (comment) => {
    const videoId = window.location.href.split("/videos/")[1];
    const response = await axios({
        url: `/api/${videoId}/comment`,
        method: "POST",
        data: {
            comment,
        },
    });
    if (response.status === 200) {
        addComment(comment);
    }
};

const handleSubmit = (e) => {
    e.preventDefault();
    const commentInput = addCommentForm.querySelector("input");
    const comment = commentInput.value;
    sendComment(comment);
    commentInput.value = "";
};

const handleDelete = async (event) => {
    const target = event.currentTarget;
    const targetLi = target.parentNode;
    const targetSpan = targetLi.querySelector("span");
    const targetComment = targetSpan.innerText;
    const videoId = window.location.href.split("/videos/")[1];
    const response = await axios({
        url: `/api/${videoId}/comment/delete`,
        method: "POST",
        data: {
            targetComment,
        },
    });
    if (response.status === 200) {
        commentList.removeChild(targetLi);
        decreaseNumber();
    }
};

function init() {
    addCommentForm.addEventListener("submit", handleSubmit);
    deleteBtnArray.forEach((element) => {
        element.addEventListener("click", handleDelete);
    });
}

if (addCommentForm) {
    init();
}
