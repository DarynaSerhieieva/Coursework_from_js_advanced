import Comment from './Comment';
import { getDate, validateErrors } from './helpers';

class Post {
    constructor(id, name, text, img, date, likes, comments) {
        this.id = id
        this.name = name
        this.text = text
        this.img = img
        this.date = date
        this.likes = likes
        this.comments = comments
        this.state = {
            showText: false,
            buttonAllComment: true,
            buttonWriteComment: true
        }
    }

    render() {
        const article = document.createElement('article');
        article.className = "post";

        const userNameDiv = document.createElement('div');
        userNameDiv.className = 'user';
        article.appendChild(userNameDiv);

        const textUserNameWhoAddPost = document.createElement('span');
        textUserNameWhoAddPost.className = 'user';
        textUserNameWhoAddPost.innerText = `${this.name}`;
        userNameDiv.appendChild(textUserNameWhoAddPost);

        const greyDateWhenAddPost = document.createElement('span');
        greyDateWhenAddPost.className = 'text-grey';
        greyDateWhenAddPost.innerText = `${this.date}`;
        userNameDiv.appendChild(greyDateWhenAddPost);

        const imgPost = document.createElement('img');
        imgPost.className = 'post__img';
        imgPost.setAttribute('alt', 'img post');
        imgPost.src = `${this.img}`;
        article.appendChild(imgPost);

        const textContentPost = document.createElement('p');
        textContentPost.className = 'text';
        textContentPost.innerText =`${this.getText()}`;

        if (this.text.length >= 500) {
            const showMore = document.createElement('button');
            showMore.className = 'show-more';
            showMore.innerText = 'Show more';

            if (this.state.showText) {
                showMore.innerText = 'Show less';
            }
            
            showMore.addEventListener('click', event => {
                this.state.showText = !this.state.showText;
                this.rerender(event);
            });

            textContentPost.appendChild(showMore);
        }

        article.appendChild(textContentPost);

        const interaction = document.createElement('div');
        interaction.className = 'interaction';
        article.appendChild(interaction);

        const buttonAddLike = document.createElement('button');
        buttonAddLike.className = 'interaction__likes';
        buttonAddLike.setAttribute('type', 'button');
        interaction.appendChild(buttonAddLike);

        buttonAddLike.addEventListener('click', event => {
            event.preventDefault();
            this.addLike();
            this.rerender(event);
        });
        
        const imgFromButtonLike = document.createElement('img');
        imgFromButtonLike.src = 'img/like.svg';
        imgFromButtonLike.setAttribute('alt', 'like');
        imgFromButtonLike.setAttribute('width', '50');
        imgFromButtonLike.setAttribute('height', '50');
        buttonAddLike.appendChild(imgFromButtonLike);

        const counterLike = document.createElement('span');
        counterLike.innerText =`Likes: ${this.likes}`;
        buttonAddLike.appendChild(counterLike);

        const commentBlock = document.createElement('div');
        commentBlock.className = 'interaction__comment';
        interaction.appendChild(commentBlock);
        const buttonAllComment = document.createElement('button');
        buttonAllComment.className = 'interaction__allComment text-grey';
        buttonAllComment.innerText =`Comments(${this.getCommentsCount()})`;
        buttonAllComment.setAttribute('type', 'button');
        commentBlock.appendChild(buttonAllComment);

        const buttonWriteComment = document.createElement('button');
        buttonWriteComment.className = 'button-radius';
        buttonWriteComment.innerText = 'Write Comment';
        buttonWriteComment.setAttribute('type', 'button');
        commentBlock.appendChild(buttonWriteComment);

        const commentsBlock = document.createElement('div');
        commentsBlock.className = 'comments comments-hidden';

        if (!this.state.buttonAllComment) {
            commentsBlock.classList.remove('comments-hidden');
            buttonAllComment.innerText = 'Hide all comment';
        }

        this.comments.forEach(comment => {
            const allCommentBlock = comment.render();
            commentsBlock.appendChild(allCommentBlock);
        });

        buttonAllComment.addEventListener('click', event => {
            event.preventDefault();
            this.allComment(commentsBlock, buttonAllComment);
        });

        article.appendChild(commentsBlock);
        article.appendChild(this.renderWriteComment(buttonWriteComment));

        return article
    }

    rerender(event) {
        const article = event.target.closest('article');
        article.parentNode.replaceChild(this.render(), article);
    }

    getCommentsCount() {
        return this.comments.length;
    }

    async addLike() {
        this.likes++

        return await fetch(`http://localhost:3000/posts/${this.id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: this.id,
                name: this.name,
                text: this.text,
                img: this.img,
                date: this.date,
                likes: this.likes
            })
        })
    }

    async addComment(comment) {
        this.comments.unshift(comment);

        return await fetch(`http://localhost:3000/comments`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(comment)
        })
    }

    async sendComment(event) {
        const form = event.target.closest('form');
        const author = form.author;
        const comment = form.comment;

        if(author.value.length >= 2 && comment.value.length >= 2) {
            await this.addComment(
                new Comment(null, this.id, author.value, getDate(), comment.value)
            );
            this.rerender(event);
        } else {
            validateErrors([author, comment]);
        }
    }

    renderWriteComment(buttonWriteComment) {
        const formWriteComment = document.createElement('form');
        formWriteComment.className = 'form visually-hidden';

        const label = document.createElement('label');
        formWriteComment.appendChild(label);

        const inputWriteName = document.createElement('input');
        inputWriteName.className = 'form__input';
        inputWriteName.setAttribute('name', 'author');
        inputWriteName.setAttribute('type', 'text');
        inputWriteName.setAttribute('placeholder', 'Author');
        label.appendChild(inputWriteName);

        const textarea = document.createElement('textarea');
        textarea.className = 'form__textarea';
        textarea.setAttribute('name', 'comment');
        textarea.setAttribute('cols', '30');
        textarea.setAttribute('rows', '10');
        textarea.setAttribute('placeholder', 'Comment');
        formWriteComment.appendChild(textarea);

        const buttonSendComment = document.createElement('button');
        buttonSendComment.className = 'comment__button button';
        buttonSendComment.setAttribute('type', 'submit');
        buttonSendComment.innerText ='Send Comment';
        formWriteComment.appendChild(buttonSendComment);

        if (!this.state.buttonWriteComment) {
            formWriteComment.classList.remove('visually-hidden');
            buttonWriteComment.innerText = 'Hide form';
        }

        buttonWriteComment.addEventListener('click', event => {
            event.preventDefault();
            this.writeComment(formWriteComment, buttonWriteComment);
        });

        buttonSendComment.addEventListener('click', event => {
            event.preventDefault();
            this.sendComment(event);
        });

        return formWriteComment
    }

    getText(text) {
        if (!this.state.showText && this.text.length >= 500) {
            return this.text.substring(0, 500) + '...';
        }

        return this.text;
    }
    
    writeComment(block, button) {
        if (this.state.buttonWriteComment) {
            this.state.buttonWriteComment = false;
            block.classList.remove('visually-hidden');
            button.innerText = 'Hide form';
        } else {
            this.state.buttonWriteComment = true;
            block.classList.add('visually-hidden');
            button.innerText = 'Write Comment';
        }
    }

    allComment(block, button) {
        if (this.state.buttonAllComment) {
            this.state.buttonAllComment = false;
            block.classList.remove('comments-hidden');
            button.innerText = 'Hide all comment';
        } else {
            this.state.buttonAllComment = true;
            block.classList.add('comments-hidden');
            button.innerText = `Comments(${this.getCommentsCount()})`;
        }
    }
}

export default Post;
