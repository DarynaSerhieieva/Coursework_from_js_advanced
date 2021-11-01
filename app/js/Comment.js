class Comment {
    constructor(id, postId, name, date, comment) {
        this.id = id
        this.postId = postId
        this.name = name
        this.date = date
        this.comment = comment
    }

    render() {
        const allCommentBlock = document.createElement('div');
        allCommentBlock.classList.add('comment');

        const commentUser = document.createElement('div');
        commentUser.className = 'comment__user';
        allCommentBlock.appendChild(commentUser);

        const nameAuthorComment = document.createElement('h4');
        nameAuthorComment.className = 'text';
        nameAuthorComment.innerText = `${this.name}`;
        commentUser.appendChild(nameAuthorComment);

        const dateWhenAddComment = document.createElement('span');
        dateWhenAddComment.className = 'text-grey';
        dateWhenAddComment.innerText = `${this.date}`;
        commentUser.appendChild(dateWhenAddComment);

        const textComments = document.createElement('p');
        textComments.className = 'text';
        textComments.innerText = `${this.comment}`;
        allCommentBlock.appendChild(textComments);

        return allCommentBlock;
    }
}

export default Comment;
