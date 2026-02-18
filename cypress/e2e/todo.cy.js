describe("Interface TodoList", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("affiche la page d'accueil avec un h1 et un bouton", () => {
    cy.get("h1").should("contain", "Ma TodoList");
    cy.get("#btn-voir-liste").should("be.visible").and("contain", "Voir la liste");
  });

  it("change de page au clic sur « Voir la liste »", () => {
    cy.get("#page-accueil").should("have.class", "active");
    cy.get("#btn-voir-liste").click();
    cy.get("#page-liste").should("have.class", "active");
    cy.get("#page-accueil").should("not.have.class", "active");
    cy.get("h1").should("contain", "Liste des items");
  });

  it("revient à l'accueil au clic sur « Retour à l'accueil »", () => {
    cy.get("#btn-voir-liste").click();
    cy.get("#page-liste").should("have.class", "active");
    cy.get("#btn-retour").click();
    cy.get("#page-accueil").should("have.class", "active");
    cy.get("h1").should("contain", "Ma TodoList");
  });
});
