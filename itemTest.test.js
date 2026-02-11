const Item = require("./item");

describe("Item.isValid()", () => {
  test("true = item valide", () => {
    const item = new Item("Test", "Test", new Date());
    expect(item.isValid()).toBe(true);
  });
});

describe("Item.isExpired()", () => {
  test("true = item expiré", () => {
    const item = new Item("Test", "Test", new Date(Date.now() - 1000));
    expect(item.isExpired()).toBe(true);
  });
});

describe("Item.isTooLong()", () => {
  test("true = item trop long", () => {
    const item = new Item("Test", "Test".repeat(1000), new Date());
    expect(item.isTooLong()).toBe(true);
  });
});

describe("Item.isTooShort()", () => {
  test("true = item trop court", () => {
    const item = new Item("Test", "Test", new Date());
    expect(item.isTooShort()).toBe(true);
  });
});