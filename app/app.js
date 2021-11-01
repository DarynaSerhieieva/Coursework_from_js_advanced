/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./app/js/Comment.js":
/*!***************************!*\
  !*** ./app/js/Comment.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Comment {\n    constructor(id, postId, name, date, comment) {\n        this.id = id\n        this.postId = postId\n        this.name = name\n        this.date = date\n        this.comment = comment\n    }\n\n    render() {\n        const allCommentBlock = document.createElement('div');\n        allCommentBlock.classList.add('comment');\n\n        const commentUser = document.createElement('div');\n        commentUser.className = 'comment__user';\n        allCommentBlock.appendChild(commentUser);\n\n        const nameAuthorComment = document.createElement('h4');\n        nameAuthorComment.className = 'text';\n        nameAuthorComment.innerText = `${this.name}`;\n        commentUser.appendChild(nameAuthorComment);\n\n        const dateWhenAddComment = document.createElement('span');\n        dateWhenAddComment.className = 'text-grey';\n        dateWhenAddComment.innerText = `${this.date}`;\n        commentUser.appendChild(dateWhenAddComment);\n\n        const textComments = document.createElement('p');\n        textComments.className = 'text';\n        textComments.innerText = `${this.comment}`;\n        allCommentBlock.appendChild(textComments);\n\n        return allCommentBlock;\n    }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Comment);\n\n\n//# sourceURL=webpack://prodject/./app/js/Comment.js?");

/***/ }),

/***/ "./app/js/Comments.js":
/*!****************************!*\
  !*** ./app/js/Comments.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Comment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Comment */ \"./app/js/Comment.js\");\n\n\nclass Comments {\n    constructor() {\n        this.clearComments()\n    }\n\n    fetchComments = async () => {\n        const comments = await fetch(`http://localhost:3000/comments`);\n        const commentsJson = await comments.json();\n        this.clearComments();\n        commentsJson.forEach(comment => {\n            this.comments.unshift(\n                new _Comment__WEBPACK_IMPORTED_MODULE_0__[\"default\"](comment.id, comment.postId, comment.name, comment.date, comment.comment)\n            )\n        });\n    }\n\n    getCommentsByPostId(postId) {\n        return this.comments.filter(comment => comment.postId === postId);\n    }\n    \n    clearComments() {\n        this.comments = [];\n    }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Comments);\n\n//# sourceURL=webpack://prodject/./app/js/Comments.js?");

/***/ }),

/***/ "./app/js/Post.js":
/*!************************!*\
  !*** ./app/js/Post.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Comment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Comment */ \"./app/js/Comment.js\");\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers */ \"./app/js/helpers.js\");\n\n\n\nclass Post {\n    constructor(id, name, text, img, date, likes, comments) {\n        this.id = id\n        this.name = name\n        this.text = text\n        this.img = img\n        this.date = date\n        this.likes = likes\n        this.comments = comments\n        this.state = {\n            showText: false,\n            buttonAllComment: true,\n            buttonWriteComment: true\n        }\n    }\n\n    render() {\n        const article = document.createElement('article');\n        article.className = \"post\";\n\n        const userNameDiv = document.createElement('div');\n        userNameDiv.className = 'user';\n        article.appendChild(userNameDiv);\n\n        const textUserNameWhoAddPost = document.createElement('span');\n        textUserNameWhoAddPost.className = 'user';\n        textUserNameWhoAddPost.innerText = `${this.name}`;\n        userNameDiv.appendChild(textUserNameWhoAddPost);\n\n        const greyDateWhenAddPost = document.createElement('span');\n        greyDateWhenAddPost.className = 'text-grey';\n        greyDateWhenAddPost.innerText = `${this.date}`;\n        userNameDiv.appendChild(greyDateWhenAddPost);\n\n        const imgPost = document.createElement('img');\n        imgPost.className = 'post__img';\n        imgPost.setAttribute('alt', 'img post');\n        imgPost.src = `${this.img}`;\n        article.appendChild(imgPost);\n\n        const textContentPost = document.createElement('p');\n        textContentPost.className = 'text';\n        textContentPost.innerText =`${this.getText()}`;\n\n        if (this.text.length >= 500) {\n            const showMore = document.createElement('button');\n            showMore.className = 'show-more';\n            showMore.innerText = 'Show more';\n\n            if (this.state.showText) {\n                showMore.innerText = 'Show less';\n            }\n            \n            showMore.addEventListener('click', event => {\n                this.state.showText = !this.state.showText;\n                this.rerender(event);\n            });\n\n            textContentPost.appendChild(showMore);\n        }\n\n        article.appendChild(textContentPost);\n\n        const interaction = document.createElement('div');\n        interaction.className = 'interaction';\n        article.appendChild(interaction);\n\n        const buttonAddLike = document.createElement('button');\n        buttonAddLike.className = 'interaction__likes';\n        buttonAddLike.setAttribute('type', 'button');\n        interaction.appendChild(buttonAddLike);\n\n        buttonAddLike.addEventListener('click', event => {\n            event.preventDefault();\n            this.addLike();\n            this.rerender(event);\n        });\n        \n        const imgFromButtonLike = document.createElement('img');\n        imgFromButtonLike.src = 'img/like.svg';\n        imgFromButtonLike.setAttribute('alt', 'like');\n        imgFromButtonLike.setAttribute('width', '50');\n        imgFromButtonLike.setAttribute('height', '50');\n        buttonAddLike.appendChild(imgFromButtonLike);\n\n        const counterLike = document.createElement('span');\n        counterLike.innerText =`Likes: ${this.likes}`;\n        buttonAddLike.appendChild(counterLike);\n\n        const commentBlock = document.createElement('div');\n        commentBlock.className = 'interaction__comment';\n        interaction.appendChild(commentBlock);\n        const buttonAllComment = document.createElement('button');\n        buttonAllComment.className = 'interaction__allComment text-grey';\n        buttonAllComment.innerText =`Comments(${this.getCommentsCount()})`;\n        buttonAllComment.setAttribute('type', 'button');\n        commentBlock.appendChild(buttonAllComment);\n\n        const buttonWriteComment = document.createElement('button');\n        buttonWriteComment.className = 'button-radius';\n        buttonWriteComment.innerText = 'Write Comment';\n        buttonWriteComment.setAttribute('type', 'button');\n        commentBlock.appendChild(buttonWriteComment);\n\n        const commentsBlock = document.createElement('div');\n        commentsBlock.className = 'comments comments-hidden';\n\n        if (!this.state.buttonAllComment) {\n            commentsBlock.classList.remove('comments-hidden');\n            buttonAllComment.innerText = 'Hide all comment';\n        }\n\n        this.comments.forEach(comment => {\n            const allCommentBlock = comment.render();\n            commentsBlock.appendChild(allCommentBlock);\n        });\n\n        buttonAllComment.addEventListener('click', event => {\n            event.preventDefault();\n            this.allComment(commentsBlock, buttonAllComment);\n        });\n\n        article.appendChild(commentsBlock);\n        article.appendChild(this.renderWriteComment(buttonWriteComment));\n\n        return article\n    }\n\n    rerender(event) {\n        const article = event.target.closest('article');\n        article.parentNode.replaceChild(this.render(), article);\n    }\n\n    getCommentsCount() {\n        return this.comments.length;\n    }\n\n    async addLike() {\n        this.likes++\n\n        return await fetch(`http://localhost:3000/posts/${this.id}`, {\n            method: \"PUT\",\n            headers: {\n                'Content-Type': 'application/json'\n            },\n            body: JSON.stringify({\n                id: this.id,\n                name: this.name,\n                text: this.text,\n                img: this.img,\n                date: this.date,\n                likes: this.likes\n            })\n        })\n    }\n\n    async addComment(comment) {\n        this.comments.unshift(comment);\n\n        return await fetch(`http://localhost:3000/comments`, {\n            method: \"POST\",\n            headers: {\n                'Content-Type': 'application/json'\n            },\n            body: JSON.stringify(comment)\n        })\n    }\n\n    async sendComment(event) {\n        const form = event.target.closest('form');\n        const author = form.author;\n        const comment = form.comment;\n\n        if(author.value.length >= 2 && comment.value.length >= 2) {\n            await this.addComment(\n                new _Comment__WEBPACK_IMPORTED_MODULE_0__[\"default\"](null, this.id, author.value, (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.getDate)(), comment.value)\n            );\n            this.rerender(event);\n        } else {\n            (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.validateErrors)([author, comment]);\n        }\n    }\n\n    renderWriteComment(buttonWriteComment) {\n        const formWriteComment = document.createElement('form');\n        formWriteComment.className = 'form visually-hidden';\n\n        const label = document.createElement('label');\n        formWriteComment.appendChild(label);\n\n        const inputWriteName = document.createElement('input');\n        inputWriteName.className = 'form__input';\n        inputWriteName.setAttribute('name', 'author');\n        inputWriteName.setAttribute('type', 'text');\n        inputWriteName.setAttribute('placeholder', 'Author');\n        label.appendChild(inputWriteName);\n\n        const textarea = document.createElement('textarea');\n        textarea.className = 'form__textarea';\n        textarea.setAttribute('name', 'comment');\n        textarea.setAttribute('cols', '30');\n        textarea.setAttribute('rows', '10');\n        textarea.setAttribute('placeholder', 'Comment');\n        formWriteComment.appendChild(textarea);\n\n        const buttonSendComment = document.createElement('button');\n        buttonSendComment.className = 'comment__button button';\n        buttonSendComment.setAttribute('type', 'submit');\n        buttonSendComment.innerText ='Send Comment';\n        formWriteComment.appendChild(buttonSendComment);\n\n        if (!this.state.buttonWriteComment) {\n            formWriteComment.classList.remove('visually-hidden');\n            buttonWriteComment.innerText = 'Hide form';\n        }\n\n        buttonWriteComment.addEventListener('click', event => {\n            event.preventDefault();\n            this.writeComment(formWriteComment, buttonWriteComment);\n        });\n\n        buttonSendComment.addEventListener('click', event => {\n            event.preventDefault();\n            this.sendComment(event);\n        });\n\n        return formWriteComment\n    }\n\n    getText(text) {\n        if (!this.state.showText && this.text.length >= 500) {\n            return this.text.substring(0, 500) + '...';\n        }\n\n        return this.text;\n    }\n    \n    writeComment(block, button) {\n        if (this.state.buttonWriteComment) {\n            this.state.buttonWriteComment = false;\n            block.classList.remove('visually-hidden');\n            button.innerText = 'Hide form';\n        } else {\n            this.state.buttonWriteComment = true;\n            block.classList.add('visually-hidden');\n            button.innerText = 'Write Comment';\n        }\n    }\n\n    allComment(block, button) {\n        if (this.state.buttonAllComment) {\n            this.state.buttonAllComment = false;\n            block.classList.remove('comments-hidden');\n            button.innerText = 'Hide all comment';\n        } else {\n            this.state.buttonAllComment = true;\n            block.classList.add('comments-hidden');\n            button.innerText = `Comments(${this.getCommentsCount()})`;\n        }\n    }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Post);\n\n\n//# sourceURL=webpack://prodject/./app/js/Post.js?");

/***/ }),

/***/ "./app/js/Posts.js":
/*!*************************!*\
  !*** ./app/js/Posts.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Post__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Post */ \"./app/js/Post.js\");\n/* harmony import */ var _Comments__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Comments */ \"./app/js/Comments.js\");\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers */ \"./app/js/helpers.js\");\n\n\n\n\nclass Posts {\n    constructor() {\n        this.clearPosts();\n    }\n\n    async fetchPosts() {\n        const posts = await fetch('http://localhost:3000/posts');\n        const postsJson = await posts.json();\n\n        const comments = new _Comments__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n        await comments.fetchComments();\n        \n        this.clearPosts();\n        postsJson.forEach(post => {\n            this.posts.unshift(\n                new _Post__WEBPACK_IMPORTED_MODULE_0__[\"default\"](post.id, post.name, post.text, post.img, post.date, post.likes, comments.getCommentsByPostId(post.id))\n            )\n        });\n    }\n\n    async addPost({name, text, img, date, likes}) {\n        return await fetch(\"http://localhost:3000/posts\", {\n            method: \"POST\",\n            headers: {\n                'Content-Type': 'application/json'\n            },\n            body: JSON.stringify({name, text, img, date, likes})\n        });\n    }\n\n    sendPost = async event => {\n        event.preventDefault();\n        const formConstructor = document.querySelector('.constructor form');\n        const name = formConstructor.name;\n        const text = formConstructor.text;\n        const imgUrl = formConstructor.imgUrl; \n    \n        if(name.value.length >= 2 && text.value.length >= 2 && imgUrl.value) {\n            await this.addPost(new _Post__WEBPACK_IMPORTED_MODULE_0__[\"default\"](null, name.value, text.value, imgUrl.value, (0,_helpers__WEBPACK_IMPORTED_MODULE_2__.getDate)(), 0, []));\n            await this.fetchPosts();\n            this.render();\n            formConstructor.reset();\n            document.querySelector('.img').innerHTML = '';\n            [name, text, imgUrl].forEach(input => input.classList.remove('error'));\n        } else {\n            validateErrors([name, text, imgUrl]);\n        }  \n    }\n\n    clearPosts() {\n        this.posts = [];\n    }\n\n    render() {\n        const posts = document.querySelector('.posts');\n        posts.innerHTML = `<h2 class=\"heading\">News Feed</h2>`;\n        this.posts.forEach(post => posts.appendChild(post.render()));\n    }\n\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Posts);\n\n//# sourceURL=webpack://prodject/./app/js/Posts.js?");

/***/ }),

/***/ "./app/js/helpers.js":
/*!***************************!*\
  !*** ./app/js/helpers.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getDate\": () => (/* binding */ getDate),\n/* harmony export */   \"validateErrors\": () => (/* binding */ validateErrors)\n/* harmony export */ });\nfunction getCorrectDate(date) {\n    return `${(date<10?'0':'') + date}`;\n}\n\nfunction getDate() {\n    return `${getCorrectDate(new Date().getDate())}/${getCorrectDate(new Date().getMonth()+1)}/${new Date().getFullYear()} ${new Date().getHours()}:${getCorrectDate(new Date().getMinutes())}`;\n};\n\nfunction validateErrors(arr, len = 2) {\n    arr.forEach(input => {\n        input.classList.remove('error');\n        if (input.value.length < len ) {\n            input.classList.add('error');\n        }\n    });\n}\n\n//# sourceURL=webpack://prodject/./app/js/helpers.js?");

/***/ }),

/***/ "./app/js/index.js":
/*!*************************!*\
  !*** ./app/js/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Posts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Posts */ \"./app/js/Posts.js\");\n/* harmony import */ var _uploadPhoto__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./uploadPhoto */ \"./app/js/uploadPhoto.js\");\n\n\n\nwindow.addEventListener('load', async () => {\n    const posts = new _Posts__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n    await posts.fetchPosts();\n    posts.render();\n\n    document.getElementById('sendPost').addEventListener('click', posts.sendPost);\n    document.getElementById('uploadPhoto').addEventListener('click', _uploadPhoto__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n})\n\n//# sourceURL=webpack://prodject/./app/js/index.js?");

/***/ }),

/***/ "./app/js/uploadPhoto.js":
/*!*******************************!*\
  !*** ./app/js/uploadPhoto.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n\nconst uploadPhoto = event => {\n    event.preventDefault();\n    const formConstructor = document.querySelector('.constructor form');\n    const imgUrl = formConstructor.imgUrl;\n    const imgBlock = document.querySelector('.img');\n    console.log(imgUrl.value)\n    if (imgUrl.value) {\n        imgBlock.innerHTML = '';\n        const img = document.createElement('img');\n        img.className = 'constructor__img';\n        img.src = `${imgUrl.value}`;\n        img.setAttribute('alt', 'Your photo');\n        imgBlock.appendChild(img);\n        imgUrl.classList.remove('error');\n    } else {\n        imgBlock.innerText = 'You don`t give link from photo'\n        imgBlock.style.color = 'red';\n        imgUrl.classList.add('error');\n    }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (uploadPhoto);\n\n//# sourceURL=webpack://prodject/./app/js/uploadPhoto.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./app/js/index.js");
/******/ 	
/******/ })()
;