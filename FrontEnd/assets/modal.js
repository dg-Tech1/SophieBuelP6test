var modal = document.getElementById("myModal");
var btn = document.getElementsByClassName("open-modal-button")[0];
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Récupération des données depuis le fichier JSON
fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then((data) => {
    // Appel de la fonction pour générer les tableaux
    generateTables(data);
  })
  .catch((error) => {
    console.error("Erreur lors de la récupération des données:", error);
  });

function generateTables(data) {
  const modalContent = document.querySelector(".modal-content");

  data.forEach((work) => {
    // Créer les éléments HTML pour chaque tableau
    const div = document.createElement("div");
    const img = document.createElement("img");
    const h3 = document.createElement("h3");
    const editButton = document.createElement("button");

    div.classList.add("table-wrapper");
    img.src = work.imageUrl;
    img.alt = work.title;
    h3.textContent = work.title;
    editButton.textContent = "Éditer";
    editButton.classList.add("edit-button");

    // Ajouter un gestionnaire d'événement pour le bouton "Éditer"
    editButton.addEventListener("click", () => {
      showEditForm(work, (updatedData) => {
        // Mettre à jour les informations de l'élément avec les données modifiées
        work.title = updatedData.title;
        work.imageUrl = updatedData.imageUrl;
        work.categoryId = updatedData.categoryId;

        // Mettre à jour l'affichage de l'élément modifié
        h3.textContent = work.title;
        img.src = work.imageUrl;
      });
    });

    // Ajouter les éléments au wrapper
    div.appendChild(img);
    div.appendChild(h3);
    div.appendChild(editButton);

    // Ajouter le wrapper au contenu du modal
    modalContent.appendChild(div);
  });
}

function showEditForm(work, callback) {
  const editFormHTML = `
    <h3>Modifier l'élément</h3>
    <form id="editForm">
      <label for="title">Titre :</label>
      <input type="text" id="title" value="${work.title}" required>

      <label for="imageUrl">URL de l'image :</label>
      <input type="text" id="imageUrl" value="${work.imageUrl}" required>

      <label for="categoryId">Catégorie :</label>
      <select id="categoryId">
        <option value="1" ${work.categoryId === 1 ? 'selected' : ''}>Objet</option>
        <option value="2" ${work.categoryId === 2 ? 'selected' : ''}>Appartement</option>
        <option value="3" ${work.categoryId === 3 ? 'selected' : ''}>Hôtel & restaurant</option>
      </select>

      <input type="submit" value="Enregistrer">
    </form>
  `;

  const modalContent = document.querySelector(".modal-content");
  modalContent.innerHTML = editFormHTML;

  const editForm = document.getElementById("editForm");
  editForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const updatedData = {
      title: document.getElementById("title").value,
      imageUrl: document.getElementById("imageUrl").value,
      categoryId: parseInt(document.getElementById("categoryId").value)
    };

    callback(updatedData);

    // Redirection vers la page du modal après avoir enregistré les modifications
    window.location.href = "#myModal";
  });
}
