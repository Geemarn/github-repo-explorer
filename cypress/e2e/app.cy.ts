describe('App', () => {
  beforeEach(() => {
    cy.visit('https://github-repo-explorer-htz2vg9kb-geemarns-projects.vercel.app/');
  });
  const GITHUB_URL = 'https://api.github.com/search/users?per_page=5&page=1';
  it('should render the search form', () => {
    cy.get('form').should('exist');
    cy.get('input[type="text"]').should('exist');
    cy.get('button[type="submit"]').should('exist');
  });

  it('should search for users and display results', () => {
    const search = 'test-search';

    cy.intercept('GET', `${GITHUB_URL}&q=${search}`, {
      fixture: 'users.json',
    }).as('getUsers');

    cy.get('input[type="text"]').type(search);
    cy.get('form').submit();

    cy.wait('@getUsers');

    cy.contains(`Showing users for "${search}"`).should('be.visible');
    cy.get('[data-testid="cy_select-list"]').should('have.length.gt', 0);
  });

  it('should show loading state while fetching results', async () => {
    const search = 'test-search-loading';

    cy.intercept('GET', `${GITHUB_URL}&q=${search}`, {
      delay: 1000,
      fixture: 'users.json',
    }).as('getUsers');

    cy.get('input[type="text"]').type(search);
    cy.get('form').submit();

    cy.get('[data-testid="loading"]').should('be.visible');

    //@ts-ignore
    await cy.wait('@getUsers');

    cy.get('[data-testid="loading"]').should('not.exist');
  });

  it('should handle error states', async () => {
    const search = 'test-search-error';

    cy.intercept('GET', `${GITHUB_URL}?per_page=5&page=1&q=${search}`, {
      statusCode: 500,
      body: {
        message: 'Server Error',
      },
    }).as('getError');

    cy.get('input[type="text"]').type(search);
    cy.get('form').submit();

    //@ts-ignore
    await cy.wait('@getError');

    cy.contains('Server Error').should('be.visible');
  });
});
