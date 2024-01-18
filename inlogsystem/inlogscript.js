const loginInfo = {
    "email": "boer@mosa-rt.be",
    "password": "boer123KSG"
};

// Function to handle login
function login() {
    const emailinput = document.getElementById("email")
    const passwordinput = document.getElementById("password")
    const email = emailinput
    const password = passwordinput
    console.log(email,password)

    // Check if the provided email and password match the stored loginInfo
    if (email == loginInfo.email && password == loginInfo.password) {
        console.log("Login successful!");
        window.location.replace("http://www.google.com");

    } else {
        console.log("Login failed. Please check your credentials.");
    }
}

// Example usage
login();