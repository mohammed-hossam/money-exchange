describe('functionality', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  context('desktop resolution', () => {
    before(() => {
      cy.viewport(1025, 900);
    });

    it('input amount', () => {
      cy.get('input[name="amount"]').type('5');
    });

    it('get results', () => {
      cy.get('label[for="from"]').parent().find('button').click();
      cy.get('ul').within(function () {
        cy.get('li').eq(0).click();
      });
      cy.get('label[for="to"]').parent().find('button').click();
      cy.get('ul').within(function () {
        cy.get('li').eq(1).click();
      });
      cy.get('input[name="amount"]').parent().type('5');
      cy.get('[data-cy="resultText"]', { timeout: 7000 });
      cy.contains('Reset');
    });

    it('swap', function () {
      let txt1;
      let txt2;
      // select from
      cy.get('label[for="from"]').parent().find('button').click();
      cy.get('ul').within(function () {
        cy.get('li')
          .eq(0)
          .then(($el) => {
            txt1 = $el.text();
            cy.wrap(txt1).as('val1');
          });
        cy.get('li').eq(0).click();
      });

      // select to
      cy.get('label[for="to"]').parent().find('button').click();
      cy.get('ul').within(function () {
        cy.get('li')
          .eq(1)
          .then(($el) => {
            txt2 = $el.text();
            cy.wrap(txt2).as('val2');
          });
        cy.get('li').eq(1).click();
      });

      //swap
      console.log(txt1);
      cy.get('[data-cy="swap"]').click();
      cy.get('@val2').then((txt2) => {
        cy.get('label[for="from"]')
          .parent()
          .find('button')
          .should('contain.text', txt2);
      });
      cy.get('@val1').then((txt1) => {
        cy.get('label[for="to"]')
          .parent()
          .find('button')
          .should('contain.text', txt1);
      });
    });

    it('reset', function () {
      cy.get('label[for="from"]').parent().find('button').click();
      cy.get('ul').within(function () {
        cy.get('li').eq(0).click();
      });
      cy.get('label[for="to"]').parent().find('button').click();
      cy.get('ul').within(function () {
        cy.get('li').eq(1).click();
      });
      cy.get('[data-cy="resultText"]', { timeout: 7000 });
      cy.contains('Reset').click();
      cy.contains('Reset').should('not.exist');
    });
  });
});

export {};
