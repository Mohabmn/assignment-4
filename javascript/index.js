var nameSignup = document.querySelector('#nameSignup');
var emailSignup = document.querySelector('#emailSignup');
var passwordSignup = document.querySelector('#passwordSignup');
var email = document.querySelector('#email');
var password = document.querySelector('#password');
var loginBTN = document.querySelector('#loginBTN');
var signupBTN = document.querySelector('#signupBTN');
var Signin = document.querySelector('#Signin');
var SignUp = document.querySelector('#SignUp');
var welcome = document.querySelector('.welcome');
var success = document.querySelector('.success');
var FAILD = document.querySelector('.FAILD');
var FAILDLogin = document.querySelector('.FAILD-login');
var successLogin = document.querySelector('.success-login');
var logout = document.querySelector('#logout');
var users = [];
if (localStorage.getItem('allUsers')) {
    users = JSON.parse(localStorage.getItem('allUsers'));
}


// ------------------regex------------------
var nameReg = /^[a-zA-Z].{3,30}$/;
var passwordReg = /^[A-Z][a-z]{2,4}[1-9]{2,4}$/;
var emailReg = /^[a-zA-Z]{4,20}.{1,10}(@).{4,10}(.com)$/;


// ------------------events------------------ 
signupBTN.addEventListener('click', function (e) {
    addUserSignup();
   
});

loginBTN.addEventListener('click', function (e) {
    if(loginValidation()==false || loginUser()==false){
        FAILDLogin.classList.remove('d-none');
        successLogin.classList.add('d-none')
    }
    else{
        FAILDLogin.classList.add('d-none');
        successLogin.classList.remove('d-none');
        welcomeDisplayLogin();
        document.querySelector('.loginform').classList.add('d-none');
        document.querySelector('.welcomeDiv').classList.remove('d-none');
    }
 
});
SignUp.addEventListener('click', function (e) {
    document.querySelector('.loginform').classList.add('d-none');
    document.querySelector('.signform').classList.replace('d-none', 'd-block');
});

Signin.addEventListener('click', function (e) {
    document.querySelector('.loginform').classList.replace('d-none', 'd-block');
    document.querySelector('.signform').classList.add('d-none');
});

logout.addEventListener('click', function (e) {
    logoutUser();
});
// -----------------functions----------------
function addUserSignup() {
    if (validation() == true && haveAccount() == true) {
        var user = {
            userName: nameSignup.value,
            userEmail: emailSignup.value,
            userPassword: passwordSignup.value
        }
        users.push(user);
        localStorage.setItem("allUsers", JSON.stringify(users));
        clearInputs();
        welcomeDisplaySignin();
        document.querySelector('.signform').classList.add('d-none');
        document.querySelector('.welcomeDiv').classList.remove('d-none');
    }

}

function clearInputs() {
    nameSignup.value = null;
    emailSignup.value = null;
    passwordSignup.value = null;
}


function validation() {
    
    if (emailReg.test(emailSignup.value) && nameReg.test(nameSignup.value) && passwordReg.test(passwordSignup.value)) {
        success.classList.remove('d-none');
        FAILD.classList.add('d-none');
        document.querySelector('.FAILD-text').innerHTML = `Wrong format `;
        return true;
    }
    else if (emailSignup.value == "" || nameSignup.value == "" || passwordSignup.value == "") {
        FAILD.classList.remove('d-none');
        success.classList.add('d-none');
        document.querySelector('.FAILD-text').innerHTML = `Please fill the inputs `;
        return false;
    }
    
}

function haveAccount() {
    for (var i = 0; i < users.length; i++) {
        if (users[i].userEmail == emailSignup.value) {
            FAILD.classList.remove('d-none');
            success.classList.add('d-none');
            document.querySelector('.FAILD-text').innerHTML = `Email already exists.`;
            return false;
        }
    }
    success.classList.remove('d-none');
    FAILD.classList.add('d-none');
    
    return true;
}

function loginUser() {
    for (var i = 0; i < users.length; i++) {
        if ((users[i].userEmail == email.value) && (users[i].userPassword == password.value)) {
            console.log("l2etooo");
            return true;
        }
    }
    console.log("msh la2eha");
    return false;
}

function loginValidation(){
    if(email.value == "" || password.value == ""){
        document.querySelector('.FAILD-text-login').innerHTML = `Please fill the inputs `;
        return false;
    }else{
        return true;
    }
  
}


function welcomeDisplayLogin(){
    var welcomText = document.createElement('h1');
    for(var i = 0 ; i < users.length ; i++){      
        if(users[i].userEmail == email.value){        
            welcome.append( welcomText.textContent = `Welcome ${users[i].userName}`);
            break;
        }
    }
}
function welcomeDisplaySignin(){
    var welcomText = document.createElement('h2');
    for(var i = 0 ; i < users.length ; i++){      
        if(users[i].userEmail == emailSignup.value){           
            welcome.append( welcomText.textContent = `Welcome ${users[i].userName}`);          
            break;
        }
        else{
            welcome.textContent = `Welcome ${users[i].userName}`;
        }
    }
}


function logoutUser() {
    document.querySelector('.welcomeDiv').classList.add('d-none');
    document.querySelector('.loginform').classList.remove('d-none');

    // Clear all inputs
    clearInputs();
    email.value = '';
    password.value = '';
    // Hide success message
    document.querySelector('.success-login').classList.add('d-none');
}
