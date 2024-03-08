// Add event listeners for the following things.
document.addEventListener('DOMContentLoaded', function () {
    const loginBtn = document.getElementById('loginButton');
    // const protectedPage = document.getElementById('protectedPage');

    // if login btn is pressed, launch netlify login modal.
    loginBtn.addEventListener('click', function () {
        if (netlifyIdentity) {
            netlifyIdentity.open(); // Important! Change the config in Netlify to make it so signing up is disabled.
        }
    });

    // if logout btn is pressed, launch netlify logout function.
    // logoutBtn.addEventListener('click', function () {
    //     if (netlifyIdentity) {
    //         netlifyIdentity.logout();
    //     }
    // });

    // if protected page btn is pressed, only change page if user is logged in.
    // protectedPage.addEventListener('click', function () {
    //     const user = netlifyIdentity.currentUser();
    //     if (user) {
    //         window.location.href = '/Pages/Data.html';
    //     }

    // });

    // if user logs in: print msg in log & change which button is visible.
    netlifyIdentity.on('login', function (user) {
        console.log('Welcome,', user);
        window.location.href = '/Pages/Data.html';

    });

    // if user logs out: print msg in log & change which button is visible.
    netlifyIdentity.on('logout', function () {
        console.log('Logged out');

    });
});


 // Upon page load in: check if user is logged. Print msg & change visible button depending on situation.
 function CheckLogin(){
    window.href = "https://www.google.com"
    console.log('start functie');
    var button = document.getElementById('data');
    button.innerHTML = "Data";
    button.href = "/pages/Data.html";
    console.log('heyfyuehfuzhfuhzuhf');
    // const user = netlifyIdentity.currentUser();
    // if (user) {
    //     document.getElementById('Login').innerHTML = "Data"
    //     document.getElementById('Login').href = "/pages/Data.html"
    //     console.log('User logged in:', user);
    // } else {
    //     console.log('User not logged in');

    // }
}