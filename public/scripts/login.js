window.addEventListener("DOMContentLoaded", async () => {
    async function postData(url = "", data = {}) {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return response.json();
    }

    function saveProfileInformationDetails() {
        const userData = {
            username: document.getElementById("name").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
        };
        postData("http://localhost:2000/create", { userData })
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    document.getElementById("save_button").addEventListener("click", () => {
        saveProfileInformationDetails();
    });

    function authenticateUser() {
        const userData = {
            email: document.getElementById("emailOne").value,
            password: document.getElementById("passwordOne").value,
        };
        postData("http://localhost:2000/login", { userData })
            .then((data) => {
                localStorage.setItem("userID", data);
                if (localStorage.getItem("userID") !== "false") {
                    alert("Du er nu logget ind");
                } else {
                    alert("Forkert password");
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    document.getElementById("log_button").addEventListener("click", () => {
        authenticateUser();
    });

    function logout() {
        localStorage.setItem("userID", false);
    }

    document.getElementById("logout_button").addEventListener("click", () => {
        logout();
    });

    async function deleteUserFromDB() {
        const userID = localStorage.getItem("userID");
        const response = await fetch("http://localhost:2000/login/delete", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userData: { client_id: userID } }),
        });
        const result = await response.json();
        return result;
    }

    document.getElementById("delete_button").addEventListener("click", () => {
        deleteUserFromDB()
            .then(() => {
                localStorage.setItem("userID", false);
            })
            .catch((error) => {
                console.error(error);
            });
    });
});