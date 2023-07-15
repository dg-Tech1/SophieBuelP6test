// Récupération des données depuis le fichier JSON
fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then((data) => {
    // Appel de la fonction pour générer les fiches de pièces
    generatePieceCards(data);
  })
  .catch((error) => {
    console.error("Erreur lors de la récupération des données:", error);
  });

function generatePieceCards(data) {
  const galleryDiv = document.querySelector(".gallery");

  // Fonction pour afficher les tableaux filtrés
  function displayFilteredWorks(filterId) {
    const filteredWorks = data.filter((work) => work.categoryId === filterId);

    // Générer la chaîne de caractères pour afficher les tableaux filtrés
    let worksHTML = "";
    filteredWorks.forEach((work) => {
      worksHTML += `<div>
                      <img src="${work.imageUrl}" alt="${work.title}">
                      <h3>${work.title}</h3>
                   </div>`;
    });

    // Mettre à jour le contenu de la galerie
    galleryDiv.innerHTML = worksHTML;
  }

  // Récupérer la référence des boutons
  const objetsButton = document.getElementById("btn2");
  const appartementsButton = document.getElementById("btn3");
  const hotelsRestaurantsButton = document.getElementById("btn4");
  const tousButton = document.getElementById("btn1");

  // Ajouter des écouteurs d'événements aux boutons
  objetsButton.addEventListener("click", () => {
    displayFilteredWorks(1);
  });

  appartementsButton.addEventListener("click", () => {
    displayFilteredWorks(2);
  });

  hotelsRestaurantsButton.addEventListener("click", () => {
    displayFilteredWorks(3);
  });

  tousButton.addEventListener("click", () => {
    location.reload(); // Rafraîchir la page
  });

  // Boucle sur les données pour générer les fiches de pièces
  data.forEach((piece) => {
    // Création de la fiche de pièce
    const pieceCard = document.createElement("div");
    pieceCard.classList.add("piece-card");

    // Ajout de l'image
    const image = document.createElement("img");
    image.src = piece.imageUrl;
    image.alt = piece.title;
    pieceCard.appendChild(image);

    // Ajout du titre
    const title = document.createElement("h3");
    title.textContent = piece.title;
    pieceCard.appendChild(title);

    // Ajout de la fiche de pièce à la galerie
    galleryDiv.appendChild(pieceCard);
  });
}



