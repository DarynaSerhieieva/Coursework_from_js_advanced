import Comment from "./Comment";

class Comments {
    constructor() {
        this.clearComments()
    }

    fetchComments = async () => {
        const comments = await fetch(`http://localhost:3000/comments`);
        const commentsJson = await comments.json();
        this.clearComments();
        commentsJson.forEach(comment => {
            this.comments.unshift(
                new Comment(comment.id, comment.postId, comment.name, comment.date, comment.comment)
            )
        });
    }

    getCommentsByPostId(postId) {
        return this.comments.filter(comment => comment.postId === postId);
    }
    
    clearComments() {
        this.comments = [];
    }
}

export default Comments;