const request = require("supertest");
const buildApp = require("./app");

let app;

beforeEach(() => {
  app = buildApp();
});


// Test de l'API TodoList
describe("API TodoList", () => {
  // Test de la page d'accueil
  test("GET / renvoie la page d'accueil (HTML)", async () => {
    const response = await request(app).get("/");

    console.log(response.text);
    expect(response.statusCode).toBe(200);
    // Vérifie que le contenu est du HTML
    expect(response.headers["content-type"]).toMatch(/html/);
    // Vérifie que le contenu contient le titre de la page
    expect(response.text).toContain("Ma TodoList");
  });

  test("GET /todos renvoie une liste vide au départ", async () => {
    const response = await request(app).get("/todos");

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ items: [] });
  });

  test("POST /todos/items crée un item valide dans la TodoList", async () => {
    const response = await request(app).post("/todos/items").send({
      name: "Faire les courses",
      content: "Acheter du lait et du pain",
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("name", "Faire les courses");
    expect(response.body).toHaveProperty("content", "Acheter du lait et du pain");
    expect(response.body).toHaveProperty("createdAt");
  });

  test("POST /todos/items renvoie 400 pour un item invalide", async () => {
    const response = await request(app).post("/todos/items").send({
      name: "",
      content: "",
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("error", "Item invalide.");
  });

  test("ne peut pas contenir plus de 10 items", async () => {
    const baseDate = new Date();

    // On ajoute 10 items espacés de plus de 30 minutes
    for (let i = 0; i < 10; i++) {
      const createdAt = new Date(
        baseDate.getTime() + i * 31 * 60 * 1000
      ).toISOString();

      const response = await request(app).post("/todos/items").send({
        name: `Item-${i}`,
        content: "Test",
        createdAt,
      });

      expect(response.statusCode).toBe(201);
    }

    // 11e item -> doit lever une erreur
    const createdAt11 = new Date(
      baseDate.getTime() + 11 * 31 * 60 * 1000
    ).toISOString();

    const response11 = await request(app).post("/todos/items").send({
      name: "Item-11",
      content: "Test",
      createdAt: createdAt11,
    });

    expect(response11.statusCode).toBe(400);
    expect(response11.body).toHaveProperty(
      "error",
      "La ToDoList ne peut pas contenir plus de 10 items."
    );
  });

  test("refuse un item créé à moins de 30 minutes du précédent", async () => {
    const baseDate = new Date();

    const createdAt1 = baseDate.toISOString();
    const response1 = await request(app).post("/todos/items").send({
      name: "Item-1",
      content: "Test",
      createdAt: createdAt1,
    });

    expect(response1.statusCode).toBe(201);

    const tenMinutesLater = new Date(
      baseDate.getTime() + 10 * 60 * 1000
    ).toISOString();

    const response2 = await request(app).post("/todos/items").send({
      name: "Item-2",
      content: "Test",
      createdAt: tenMinutesLater,
    });

    expect(response2.statusCode).toBe(400);
    expect(response2.body).toHaveProperty(
      "error",
      "Il doit y avoir au moins 30 minutes entre deux items."
    );
  });
});

