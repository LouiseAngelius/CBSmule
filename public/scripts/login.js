function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    return '';
}

function clearCookie(name) {
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
}

function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const username = document.getElementById('login-username').value;

    const userData = {
        email: email,
        password: password,
        username: username
    };

    // Use AJAX to send authentication request to the server
    fetch('/authenticate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userData: userData })
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            const displayName = username || email;
            document.getElementById('user-display').innerText = displayName;
            showUserActions();

            // Set a cookie upon successful login
            setCookie('user', displayName, 1); // Expires in 1 day
        } else {
            alert('Authentication failed. Please check your credentials.');
        }
    })
    .catch(error => console.error('Error:', error));
}
    
    function signup() {
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const username = document.getElementById('signup-username').value;
    
        const userData = {
            email: email,
            password: password,
            username: username
        };
    
        // Use AJAX to send user creation request to the server
        fetch('/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userData: userData })
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                document.getElementById('user-display').innerText = username || email;
                showUserActions();
            } else {
                alert('User creation failed. Please try again.');
            }
        })
        .catch(error => console.error('Error:', error));
    }
    
    function logout() {
        // Clear the user cookie
        clearCookie('user');
        // Implement other logout logic here (e.g., clear session data)
        hideUserActions();
    }
    
    function deleteAccount() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const username = document.getElementById('username').value;
    
        const userData = {
            email: email,
            password: password,
            username: username
        };
    
        // Use AJAX to send user deletion request to the server
        fetch('/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userData: userData })
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                alert('Account deleted!');
                hideUserActions();
            } else {
                alert('Account deletion failed. Please try again.');
            }
        })
        .catch(error => console.error('Error:', error));
    };