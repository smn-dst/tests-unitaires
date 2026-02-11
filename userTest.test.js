// const {
//   sum,
//   soustract,
//   multiply,
//   divide,
//   average
// } = require('./calculatrice');

// describe('Calculatrice - opérations simples', () => {

//   test('additionner 2 + 3 = 5', () => {
//       expect(sum(2, 3)).toBe(24);
//   });

//   test('soustraire 5 - 3 = 2', () => {
//       expect(soustract(5, 3)).toBe(2);
//   });

//   test('multiplier 4 * 2 = 8', () => {
//       expect(multiply(4, 2)).toBe(8);
//   });

//   test('diviser 10 / 2 = 5', () => {
//       expect(divide(10, 2)).toBe(5);
//   });

// });

// describe('Calculatrice - moyenne', () => {

//   test('moyenne de [10, 20, 30] = 20', () => {
//       expect(average([10, 20, 30])).toBe(20);
//   });

//   test('moyenne de [5] = 5', () => {
//       expect(average([5])).toBe(5);
//   });
// });


const User = require("./user");

describe("User.isValid()", () => {

  test("true = utilisateur valide (13 ans ou plus)", () => {
    const user = new User(
      "Simon",
      "Dousset",
      "2000-01-01",
      "simon@test.com"
    );

    expect(user.isValid()).toBe(true);
  });

  test("false = email manquant", () => {
    const user = new User(
      "Simon",
      "Dousset",
      "2000-01-01",
      ""
    );

    expect(user.isValid()).toBe(false);
  });

  // Maintenant, la classe vérifie seulement que l'email contient "@"
  test("false = email invalide (ne contient pas @)", () => {
    const user = new User(
      "Simon",
      "Dousset",
      "2000-01-01",
      "simon.test.com" // pas de "@"
    );

    expect(user.isValid()).toBe(false);
  });

  test("false = prénom manquant", () => {
    const user = new User(
      "",
      "Dousset",
      "2000-01-01",
      "simon@test.com"
    );

    expect(user.isValid()).toBe(false);
  });

  test("false = utilisateur a moins de 13 ans", () => {
    const today = new Date();
    const birth = new Date(
      today.getFullYear() - 12,
      today.getMonth(),
      today.getDate()
    );

    const user = new User(
      "Simon",
      "Dousset",
      birth,
      "simon@test.com"
    );

    expect(user.isValid()).toBe(false);
  });

  test("false = date de naissance invalide", () => {
    const user = new User(
      "Simon",
      "Dousset",
      "date-invalide",
      "simon@test.com"
    );

    expect(user.isValid()).toBe(false);
  });

});
