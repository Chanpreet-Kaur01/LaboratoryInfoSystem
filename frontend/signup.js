const getPassword=document.getElementById('passWord');
getPassword.addEventListener('input',()=>{
    const password=getPassword.value;
    const heading=document.getElementById('listHeading');
    const getCapLetter=document.getElementById('capLetter');
    const getSmallLetter=document.getElementById('smallLetter');
    const getSplChar=document.getElementById('splChar');
    const getDigit=document.getElementById('digit');
    const minLength=document.getElementById('length');

    if (/[A-Z]/.test(password)){
        getCapLetter.style.visibility='hidden';
    }else{
        getCapLetter.style.visibility='visible';
    }
    if (/[a-z]/.test(password)){
        getSmallLetter.style.visibility='hidden';
    }else{
        getSmallLetter.style.visibility='visible';
    }
    if (/\d/.test(password)){
        getDigit.style.visibility='hidden';
    }else{
        getDigit.style.visibility='visible';
    }
    if (/[^a-zA-Z0-9]/.test(password)){
        getSplChar.style.visibility='hidden';
    }else{
        getSplChar.style.visibility='visible';
    }
    if(password.length>=8){
        minLength.style.visibility='hidden';
    }else{
        minLength.style.visibility='visible';
    }
    if(/[A-Z]/.test(password)&&/[a-z]/.test(password)&&/\d/.test(password)&&/[^a-zA-Z0-9]/.test(password)&&password.length>=8){
        heading.style.visibility='hidden';
    }else heading.style.visibility='visible';
});

const confirmPwd=document.getElementById('pwdConfirm');
const confirmPwdAlert=document.getElementById('ConfirmpwdMatching');
const passWordField = document.getElementById('passWord');
confirmPwd.addEventListener('input',()=>{
    if(confirmPwd.value!==passWordField.value){
        confirmPwdAlert.style.visibility='visible';
    } else {
        confirmPwdAlert.style.visibility='hidden';
    }
});

const signUpForm=document.getElementById('SignUpForm');
const signUpButton=document.getElementById('signup');

signUpButton.addEventListener('click',(e)=>{
    e.preventDefault();
    console.log('form submitted');
    const formData=new FormData(signUpForm);
    const dataObject=Object.fromEntries(formData);
    fetch('http://localhost:8000/OurLIS/signup' ,{
        method:'POST',
        headers:{
        'content-type':'application/json',
        },
        body:JSON.stringify(dataObject)
    }).then((response)=>{
        console.log('response recieved');
        return response.json()
    }).then((data)=>{
        console.log('response saved:');
        alert('(' + data.status + ') ' + data.message);
        if (data.message==='User Signed up successfully!'||data.message==='User already exists.')
        window.location.href='http://127.0.0.1:5500/frontend/login.html';
    })
    .catch((error)=>console.error(error));
    
});
