window.addEventListener('load', function () {
    const signUpBtn = document.getElementById('signUp');
    const logInBtn = document.getElementById('logIn');
    const emailInput = document.getElementById('email-input');
    const passwordInput = document.getElementById('password-input');
    const form = document.querySelector('#sign-up');
    const xhr = XMLHttpRequest();

    signUpBtn.addEventListener('click', function (e) {
        e.preventDefault;
        // grab sign up form div
        const signUpForm = document.querySelector('.sign-up-form');
        // unhide it
        signUpForm.style.display = 'block';
        // hide sign up and log in buttons
        signUpBtn.style.display = 'none';
        logInBtn.style.display = 'none';
        // create a new button
        const button = document.createElement('button');
        button.textContent = 'Create Account';
        button.id = 'create-account';
        button.type = 'submit';
        // grab the form
        form.appendChild(button);
    });

    form.addEventListener('submit', function(e){
        e.preventDefault();
        const userData = {
            email: emailInput.value.trim(),
            password: passwordInput.value.trim()
        };
        signUpUser(userData.email, userData.password);
    });

    xhr.onload = function(){
        if (xhr.status >= 200 && xhr.status < 300){
            console.log('success!', xhr);
        } else {
            console.log('the request Failed!')
        }
    };

    function signUpUser(email, password){
        xhr.open('POST', 'api/singup', true);
        HTMLTextAreaElement.setRequestHeader('application/json')
    }

    function showModal() {
        const modal = document.getElementById('modal');
        modal.style.display = 'block';
    };

    showModal();
})