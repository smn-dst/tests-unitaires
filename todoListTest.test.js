const TodoList = require("./todoList");
const User = require("./user");
const Item = require("./item");

// Petite fonction utilitaire pour créer un User valide
function createValidUser() {
  return new User(
    "John",
    "Doe",
    "1990-01-01",
    "john.doe@example.com",
    "Password123"
  );
}

// Crée des mocks très simples pour les services externes
function createServicesMocks() {
  return {
    emailSenderService: {
      sendAlmostFull: jest.fn(),
    },
    itemRepository: {
      save: jest.fn(),
    },
  };
}

describe("TodoList.add()", () => {
  test("ajoute un item si le user est valide et appelle save", () => {
    const user = createValidUser();
    const { emailSenderService, itemRepository } = createServicesMocks();
    const todoList = new TodoList(user, emailSenderService, itemRepository);

    const item = new Item("Test", "Test", new Date());

    todoList.add(item);

    expect(todoList.items.length).toBe(1);
    expect(itemRepository.save).toHaveBeenCalledWith(item);
    expect(emailSenderService.sendAlmostFull).not.toHaveBeenCalled();
  });

  test("lève une erreur si le user est invalide", () => {
    // mot de passe invalide en locurrence
    const invalidUser = new User(
      "John",
      "Doe",
      "2015-01-01",
      "john.doe@example.com",
      "pass"
    );
    const { emailSenderService, itemRepository } = createServicesMocks();
    const todoList = new TodoList(
      invalidUser,
      emailSenderService,
      itemRepository
    );

    const item = new Item("Test", "Test", new Date());

    expect(() => todoList.add(item)).toThrow(
      "User invalide, impossible d'ajouter un item."
    );
    expect(itemRepository.save).not.toHaveBeenCalled();
    expect(emailSenderService.sendAlmostFull).not.toHaveBeenCalled();
  });

  test("ne peut pas contenir plus de 10 items", () => {
    const user = createValidUser();
    const { emailSenderService, itemRepository } = createServicesMocks();
    const todoList = new TodoList(user, emailSenderService, itemRepository);

    const baseDate = new Date();

    // On ajoute 10 items espacés de plus de 30 minutes
    for (let i = 0; i < 10; i++) {
      const createdAt = new Date(
        baseDate.getTime() + i * 31 * 60 * 1000 // +31 minutes à chaque fois
      );
      const item = new Item(`Item-${i}`, "Test", createdAt);
      todoList.add(item);
    }

    expect(todoList.items.length).toBe(10);

    // 11e item -> doit lever une erreur
    const createdAt = new Date(
      baseDate.getTime() + 11 * 31 * 60 * 1000
    );
    const item11 = new Item("Item-11", "Test", createdAt);

    expect(() => todoList.add(item11)).toThrow(
      "La ToDoList ne peut pas contenir plus de 10 items."
    );
  });

  test("envoie un email au 8e item", () => {
    const user = createValidUser();
    const { emailSenderService, itemRepository } = createServicesMocks();
    const todoList = new TodoList(user, emailSenderService, itemRepository);

    const baseDate = new Date();

    // On ajoute 7 items d'abord
    for (let i = 0; i < 7; i++) {
      const createdAt = new Date(
        baseDate.getTime() + i * 31 * 60 * 1000
      );
      const item = new Item(`Item-${i}`, "Test", createdAt);
      todoList.add(item);
    }

    expect(todoList.items.length).toBe(7);
    expect(emailSenderService.sendAlmostFull).not.toHaveBeenCalled();

    // 8e item -> envoi mail
    const createdAt8 = new Date(
      baseDate.getTime() + 7 * 31 * 60 * 1000
    );
    const item8 = new Item("Item-8", "Test", createdAt8);
    todoList.add(item8);

    expect(todoList.items.length).toBe(8);
    expect(emailSenderService.sendAlmostFull).toHaveBeenCalledTimes(1);
    expect(emailSenderService.sendAlmostFull).toHaveBeenCalledWith(
      user,
      todoList
    );
  });

  test("refuse un item créé à moins de 30 minutes du précédent", () => {
    const user = createValidUser();
    const { emailSenderService, itemRepository } = createServicesMocks();
    const todoList = new TodoList(user, emailSenderService, itemRepository);

    const baseDate = new Date();
    const item1 = new Item("Item-1", "Test", baseDate);
    todoList.add(item1);

    // 2e item seulement +10 minutes -> doit être refusé
    const tenMinutesLater = new Date(baseDate.getTime() + 10 * 60 * 1000);
    const item2 = new Item("Item-2", "Test", tenMinutesLater);

    expect(() => todoList.add(item2)).toThrow(
      "Il doit y avoir au moins 30 minutes entre deux items."
    );
  });
});