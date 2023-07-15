// Empêcher le formulaire de se soumettre normalement

document.querySelector("form").addEventListener("submit", async (e) => {
    e.preventDefault(); // Empêcher le formulaire de se soumettre normalement

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Envoyer les informations d'authentification à l'API
    const authentificationInfos = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });

    if (authentificationInfos.ok) {
        // L'authentification a réussi, effectuer les actions nécessaires (redirection, etc.)
        // Par exemple, vous pouvez rediriger l'utilisateur vers la page d'accueil après la connexion
        window.location.href = "index.html";
        localStorage.setItem("isLoggedIn", "true");   // logout

    } else {
        // Afficher un message d'erreur si l'authentification a échoué
        const errorNotification = document.querySelector(".wrong-user-notification");
        errorNotification.textContent = "Identifiants incorrects. Veuillez réessayer.";
    }
});
