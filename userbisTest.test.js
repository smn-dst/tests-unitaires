const UserBis = require("./userbis");

describe("UserBis.isValid()", () => {
  test("true pour un utilisateur valide (email OK, noms non vides, 13 ans ou plus)", () => {
    const externalAPI = {
      isValid: jest.fn().mockReturnValue(true),
    };

    const user = new UserBis(
      "Simon",
      "Dousset",
      "2000-01-01",
      "simon@test.com",
      externalAPI
    );

    expect(user.isValid()).toBe(true);
    expect(externalAPI.isValid).toHaveBeenCalledWith("simon@test.com");
  });

  test("false quand le prénom est vide", () => {
    const externalAPI = {
      isValid: jest.fn().mockReturnValue(true),
    };

    const user = new UserBis(
      "   ",
      "Dousset",
      "2000-01-01",
      "simon@test.com",
      externalAPI
    );

    expect(user.isValid()).toBe(false);
  });

  test("false quand le nom est vide", () => {
    const externalAPI = {
      isValid: jest.fn().mockReturnValue(true),
    };

    const user = new UserBis(
      "Simon",
      "",
      "2000-01-01",
      "simon@test.com",
      externalAPI
    );

    expect(user.isValid()).toBe(false);
  });

  test("false quand l'utilisateur a moins de 13 ans", () => {
    const today = new Date();
    const birth = new Date(
      today.getFullYear() - 12,
      today.getMonth(),
      today.getDate()
    );

    const externalAPI = {
      isValid: jest.fn().mockReturnValue(true),
    };

    const user = new UserBis(
      "Simon",
      "Dousset",
      birth,
      "simon@test.com",
      externalAPI
    );

    expect(user.isValid()).toBe(false);
  });
});
