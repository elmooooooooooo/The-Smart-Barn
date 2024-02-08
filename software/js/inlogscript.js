
const LoginInfo = {
    "email" : "boer@mosa-rt.be",
    "password" : "boer123KSG"
} 

// Function to handle login
function login() {


    const emailinput = document.getElementById("email").value
    const passwordinput = document.getElementById("password").value

    
    
    // Check if the provided email and password match the stored loginInfo
    if (emailinput == LoginInfo.email && passwordinput == LoginInfo.password) {
        window.location.href = "/pages/Data.html"; 

        
        // If it works forward the user to the next page

    } else {
        document.getElementById("wrong").innerHTML = "The email and/or password is incorrect! please try again!"
        
        
    }
    
}

function forgot() {
    alert("Er is een email verstuurd met de nieuwe wachtwoord!")

}



// script is gefixt, groetjes sem
// U+1FAE1