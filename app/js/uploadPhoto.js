
const uploadPhoto = event => {
    event.preventDefault();
    const formConstructor = document.querySelector('.constructor form');
    const imgUrl = formConstructor.imgUrl;
    const imgBlock = document.querySelector('.img');
    console.log(imgUrl.value)
    if (imgUrl.value) {
        imgBlock.innerHTML = '';
        const img = document.createElement('img');
        img.className = 'constructor__img';
        img.src = `${imgUrl.value}`;
        img.setAttribute('alt', 'Your photo');
        imgBlock.appendChild(img);
        imgUrl.classList.remove('error');
    } else {
        imgBlock.innerText = 'You don`t give link from photo'
        imgBlock.style.color = 'red';
        imgUrl.classList.add('error');
    }
}

export default uploadPhoto;