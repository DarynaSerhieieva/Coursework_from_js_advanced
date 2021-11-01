import Post from "./Post";
import Comments from "./Comments";
import { getDate } from './helpers';

class Posts {
    constructor() {
        this.clearPosts();
    }

    async fetchPosts() {
        const posts = await fetch('http://localhost:3000/posts');
        const postsJson = await posts.json();

        const comments = new Comments();
        await comments.fetchComments();
        
        this.clearPosts();
        postsJson.forEach(post => {
            this.posts.unshift(
                new Post(post.id, post.name, post.text, post.img, post.date, post.likes, comments.getCommentsByPostId(post.id))
            )
        });
    }

    async addPost({name, text, img, date, likes}) {
        return await fetch("http://localhost:3000/posts", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, text, img, date, likes})
        });
    }

    sendPost = async event => {
        event.preventDefault();
        const formConstructor = document.querySelector('.constructor form');
        const name = formConstructor.name;
        const text = formConstructor.text;
        const imgUrl = formConstructor.imgUrl; 
    
        if(name.value.length >= 2 && text.value.length >= 2 && imgUrl.value) {
            await this.addPost(new Post(null, name.value, text.value, imgUrl.value, getDate(), 0, []));
            await this.fetchPosts();
            this.render();
            formConstructor.reset();
            document.querySelector('.img').innerHTML = '';
            [name, text, imgUrl].forEach(input => input.classList.remove('error'));
        } else {
            validateErrors([name, text, imgUrl]);
        }  
    }

    clearPosts() {
        this.posts = [];
    }

    render() {
        const posts = document.querySelector('.posts');
        posts.innerHTML = `<h2 class="heading">News Feed</h2>`;
        this.posts.forEach(post => posts.appendChild(post.render()));
    }

}

export default Posts;