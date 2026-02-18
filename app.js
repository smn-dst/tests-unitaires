const express = require("express");
const TodoList = require("./todoList");
const Item = require("./item");
const User = require("./user");

// Petites implémentations "réelles" mais simples pour l'API
class InMemoryItemRepository {
  constructor() {
    this.items = [];
  }

  save(item) {
    this.items.push(item);
  }
}

class ConsoleEmailSenderService {
  sendAlmostFull(user, todoList) {
    // Ici on pourrait envoyer un vrai email.
    // Pour l'exercice, on se contente de logguer dans la console.
    console.log(
      `Email: la TodoList de ${user.firstName} est presque pleine (${todoList.items.length} items).`
    );
  }
}

function buildApp() {
  const app = express();
  app.use(express.json());

  // Fichiers statiques (interface : public/index.html)
  app.use(express.static("public"));

  // On crée ici un "user" valide pour toute l'API
  const user = new User(
    "John",
    "Doe",
    "1990-01-01",
    "john.doe@example.com",
    "Password123"
  );

  const emailSenderService = new ConsoleEmailSenderService();
  const itemRepository = new InMemoryItemRepository();
  const todoList = new TodoList(user, emailSenderService, itemRepository);

  // Récupérer tous les items de la TodoList
  app.get("/todos", (req, res) => {
    res.json({ items: todoList.items });
  });

  // Créer un item dans la TodoList
  app.post("/todos/items", (req, res) => {
    const { name, content, createdAt } = req.body;

    const createdAtDate = createdAt ? new Date(createdAt) : new Date();
    if (isNaN(createdAtDate.getTime())) {
      return res
        .status(400)
        .json({ error: "Le champ 'createdAt' doit être une date valide." });
    }

    const item = new Item(name, content, createdAtDate);

    // Validation de base de l'Item
    if (!item.isValid()) {
      return res.status(400).json({ error: "Item invalide." });
    }

    try {
      const savedItem = todoList.add(item);
      return res.status(201).json(savedItem);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  });

  return app;
}

// Export de la fonction pour les tests
module.exports = buildApp;

// Lancement du serveur uniquement si le fichier est exécuté
if (require.main === module) {
  const app = buildApp();
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Serveur TodoList lancé sur le port ${PORT}`);
  });
}

