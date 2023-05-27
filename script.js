
let but_sign_in = document.querySelector('.sign-in-but')
let check_box = document.querySelector('.show-password')
const users = {
    "id":"3",
    "email":"pannet.v@ku.th",
    "username":"kao",
    "password":"32108",
    "role":"admin"
}
const data = JSON.stringify(users)

async function getUser(){
    const url = 'user.json'
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

function showPassword(){
    if (check_box.checked == true){
        // text.style.display = "block";
        document.querySelector('.password-input').type = 'text'
      } else {
        // text.style.display = "none";
        document.querySelector('.password-input').type = 'password'
      }
}

async function check(emailUser,passwordUser){
    emailUser = `"${emailUser}"`
    passwordUser = `"${passwordUser}"`
    let result = false
    let user = await getUser()
    console.log(emailUser , passwordUser)
    user.forEach(element => {
        let dataEmail = String(JSON.stringify(element.email))
        let dataPass = String(JSON.stringify(element.password))
        console.log(dataEmail , dataPass)
        if(dataEmail===emailUser&&dataPass===passwordUser){
            result = true
        }
    });
    console.log(result)
    return result
}
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }
  

async function checkUser(){
    let emailUser = document.querySelector('.email-input').value
    let passwordUser = document.querySelector('.password-input').value
    let image = document.querySelector('.image-message')
    let message = document.querySelector('.message')
    let text = document.querySelector('.text-message')
    let login_page = document.querySelector('.login-page')
    if(await check(emailUser,passwordUser)){
        text.textContent = 'Login Complete'
        message.style.display = 'flex'
        image.src = './image/accpet.png'
        delay(500).then(() => {message.style.display = 'none'; login_page.style.display = 'none';} );
    }
    else{
        text.textContent = 'Account Incorrect'
        message.style.display = 'flex'
        image.src = "./image/cancel.png"
        delay(500).then(() => {message.style.display = 'none'} );
    }
    // console.log(check(emailUser,passwordUser))
}
let page = document.querySelector('.login-page')
let login_page = document.querySelector('.content-login')
let register_page = document.querySelector('.content-register')
document.querySelector('.close-window').addEventListener('click',()=>{page.style.display = 'none';register_page.style.display = 'none';login_page.style.display = 'none'})
document.querySelector('.login-but').addEventListener('click',()=>{page.style.display = 'grid';login_page.style.display='grid'})
document.querySelector('.register-but').addEventListener('click',()=>{page.style.display = 'grid';register_page.style.display='grid'})
check_box.addEventListener('click',showPassword)
but_sign_in.addEventListener('click',checkUser)