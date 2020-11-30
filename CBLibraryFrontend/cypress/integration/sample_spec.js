/* eslint-disable no-undef */
beforeEach(() => {
  cy.wait(2000)
})

describe('Frontend e2e Homepage test sample', () => {
  it('Visit the app root url', () => {
    cy.visit('http://localhost:8080')
    cy.contains('Book List')
    cy.get('button.is-info.ml-1').should('be.visible')
  })
});

describe('Get to Add Book page', () => {
  it('should bring you to form book page', () => {
    cy.get('button.is-info.ml-1').trigger('click')
    
    cy.on('url:changed', url => {
      expect(url).to.contains('add-new-book')
    });
  })
})

 describe('Add a new Book', () => {
  it ('Should insert a new book and return to the homepage and see the new book', () => {
    const newTitle = 'Lorem Ipsum';
    const newAuthor = 'Carpe Diem';

    cy.visit('http://localhost:8080/#/add-new-book')
    cy.wait(2000)
    cy.get('.input[name=title]').type(newTitle)
    cy.get('.input[name=author]').type(newAuthor)
    cy.get('button.is-info').trigger('click')
    cy.on('url:changed', () => {
      cy.wait(5000)
      cy.contains('Book List')
      expect(cy.get('.card-header-title')).to.contains(newTitle)
    });
  })
 });

 describe('Book edit', () => {
  it ('should go to the edit page correctly', async () => {
    await cy.visit('http://localhost:8080')
    cy.get('.card').eq(-1).find('.card-footer-item').eq(0).trigger('click')
    const newTitle = 'NEW Lorem Ipsum';
    const newAuthor = 'NEW Carpe Diem';
    cy.wait(2000);
    cy.get('.input[name=title]').clear().type(newTitle)
    cy.get('.input[name=author]').clear().type(newAuthor)
    cy.get('button.is-info').trigger('click')
    
    cy.on('url:changed', () => {
      cy.wait(5000)
      cy.contains('Book List')
      expect(cy.get('.card-header-title')).to.contains(newTitle)
    });
  });
});

 describe('Book delete', () => {
  it ('should delete one item correctly', () => {
    cy.visit('http://localhost:8080')
    cy.get('.card').eq(-1).find('.card-footer-item').eq(1).trigger('click')
  })
})