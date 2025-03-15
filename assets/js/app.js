'use strict';

class Users {
    #id;
    #name;
    #userName;
    #email;

    constructor(id, name, userName, email) {
        this.#id = id;
        this.#name = name;
        this.#userName = userName;
        this.#email = email;
    }
 
    get id() {
        return this.#id;
    }

    get name() {
        return this.#name;
    }


    get userName() {
        return this.#userName;
    }


    get email() {
        return this.#email;
    }

    getInfo() {
        return `ID: ${this.#id}
         Name: ${this.#name}
         Username: ${this.#userName}
         Email: ${this.#email}`;
    }
}

const postForm = document.getElementById('postForm');
const postText = document.getElementById('postText');
const postImage = document.getElementById('postImage');
const postsSection = document.getElementById('postsSection');
const userImage = "../fakebook/assets/media/image-01.jpg";
const userInfoBtn = document.getElementById('userInfoBtn');
const pop = document.getElementById('pop');
const submit = document.getElementById('submit');
const fileNameSpan = document.getElementById('fileName');
const close = document.getElementById('close');

class Subscriber extends Users {
    #pages;
    #groups;
    #canMonetize;

    constructor(id, name, userName, email, pages, groups, canMonetize) {
        super(id, name, userName, email);
        this.#pages = pages;
        this.#groups = groups;
        this.#canMonetize = canMonetize;
    }

    get pages() { return this.pages; }
    get groups() { return this.group; }
    get canMonetize() { return this.canMonetize; }
    
    getInfo() {
        return [
            super.getInfo(),
            `Pages: ${this.#pages}
             Groups: ${this.#groups}
             canMonetize: ${this.#canMonetize}`
        ]
    }
}

const userName = new Subscriber(1, "Taylor", "Swift", "123456@.com", ['Fackbook'], ['singer'], "true");

function checkInput() {
    if (postText.value.trim().length > 0) {
      return true;
    }
    
    if (postImage.files && postImage.files.length > 0) {
      return true;
    }

    return false;
  }
  

function createPost() {
    checkInput();
    const postUserName = userName.userName;
    const date = new Date();
    const text = postText.value.trim();
    let picture = '';
    if (postImage.files.length > 0) {
       picture = URL.createObjectURL(postImage.files[0]);
    } 
    const postHTML = `
      <div class="post">
        <div class="post-header">
          <div class="post-user">
            <figure><img src="${userImage}" alt="Avatar"></figure>
            <span class="username">${postUserName}</span>
          </div>
          <span class="date">${date.toDateString()}</span>
        </div>
        <div class="post-content">
          <p>${text}</p>
          ${ picture ? `<img src="${picture}" alt="Post Image">` : '' }
        </div>
      </div>
    `;
    const div = document.createElement('div');
    div.innerHTML = postHTML;
    postsSection.append(div);
}

function popup() {
    userInfoBtn.addEventListener('click', function(event) {
        event.preventDefault();
        const popupEl = document.getElementById('popup');
        popupEl.classList.add('active');
        const userInfoContent = document.getElementById('userInfoContent');
        userInfoContent.innerHTML = userName.getInfo();
    });
}

submit.addEventListener('click', function(event) {
    event.preventDefault();
    if (!checkInput()) {
        errorMsg.textContent = "Please enter";
        return;
      }
    createPost();

    postText.value = '';
    postImage.value = '';
});

postImage.addEventListener('change', function () {
    if (this.files && this.files.length > 0) {
      fileNameSpan.textContent = this.files[0].name;
    } else {
      fileNameSpan.textContent = '';
    }
  });

  close.addEventListener('click', function() {
    const popupEl = document.getElementById('popup');
    popupEl.classList.remove('active');
  });

  popup();
