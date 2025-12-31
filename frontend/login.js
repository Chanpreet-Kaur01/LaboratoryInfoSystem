const loginButton= document.getElementById('Login');

loginButton.addEventListener('click',(e)=>{
    e.preventDefault();

    const LoginForm=document.getElementById('loginForm');
    const loginCredentials=new FormData(LoginForm);
    const dataObject=Object.fromEntries(loginCredentials);
    fetch('http://localhost:8000/OurLIS/login',{
        method:'POST',
        headers:{
            'content-type':'application/json',
        },
        body:JSON.stringify(dataObject)
    }).then((response)=>{
        console.log('response received');
        return response.json();
    }).then((data)=>{
        console.log(data);
        alert('(' + data.status + ')' + data.message);
        if(data.message=='User is not registered with us, Kindly signUp first.'){
            window.location.href='http://127.0.0.1:5500/frontend/signUp.html';
        }
        if(data.message=='Login Successful!'){
            window.location.href='http://127.0.0.1:5500/frontend/Dashboard.html';
        }
    }).catch((error)=>{
        console.error(error);
    });
});