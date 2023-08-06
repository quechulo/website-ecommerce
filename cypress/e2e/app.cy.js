describe('Navigation', () => {
    it('should navigate to the about page', () => {
      // Start from the index page
      cy.visit('http://localhost:3000/')
   
      // Find a link with an href attribute containing "about" and click it
      cy.get('a[href*="/onas"]').click()
   
      // The new url should include "/about"
      cy.url().should('include', '/onas')
   
      // The new page should contain an h1 with "About page"
      cy.get('h1').contains('O Nas')
    })

    it('should not navigate to koszyk page', () => {
        // Start from the index page
        cy.visit('http://localhost:3000/')
     
        // Find a link with an href attribute containing "about" and click it
        cy.get('a[href*="/koszyk"]').click()
     
        // The new url should include "/about"
        cy.url().should('not.include', '/koszyk')
      })

    it('should navigate to nikes price tag', () => {
        cy.visit('http://localhost:3000/')
        cy.contains('Produkty').click();

        // Click the element with href="/produkty/buty"
        cy.get('a[href="/produkty/buty"]').click();

        // Click the first div with an image
        cy.get('div > img').first().click();
        // Check if the 'dodaj do koszyka' button is present
        cy.contains('Dodaj do koszyka').should('be.visible');
    })
  })