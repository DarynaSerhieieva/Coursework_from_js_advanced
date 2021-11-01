import Posts from './Posts';
import uploadPhoto from './uploadPhoto';

window.addEventListener('load', async () => {
    const posts = new Posts();
    await posts.fetchPosts();
    posts.render();

    document.getElementById('sendPost').addEventListener('click', posts.sendPost);
    document.getElementById('uploadPhoto').addEventListener('click', uploadPhoto);
})