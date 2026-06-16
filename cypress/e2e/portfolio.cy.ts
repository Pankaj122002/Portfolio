describe('Portfolio E2E Tests', () => {
  it('should load the portfolio and display all sections correctly', () => {
    // 1. Visit page and wait for intro to finish
    cy.visit('/Portfolio/');
    cy.get('#hero', { timeout: 15000 }).should('be.visible');
    
    // 2. Check Hero Section
    // Since the text 'Pankaj Pal' is split into span elements for animation, we check for the first few letters or the main role text
    cy.get('#hero').contains('build systems').should('be.visible');
    cy.get('a[href*="github.com"]').should('exist');
    cy.get('a[href*="linkedin.com"]').should('exist');
    
    // 3. Check About Section
    cy.get('#about').scrollIntoView();
    cy.get('#about').contains('Behind the Code').should('be.visible');
    cy.get('#about a').contains('View Detailed Resume').should('have.attr', 'href', 'https://pankaj122002.github.io/');

    // 4. Check Skills Section
    cy.get('#skills').scrollIntoView();
    cy.get('#skills').contains('Technical').should('be.visible');
    cy.get('#skills').contains('Frontend').should('be.visible');
    cy.get('#skills').contains('React.js').should('be.visible');

    // 5. Check Experience Section
    cy.get('#experience').scrollIntoView();
    cy.get('#experience').contains('Professional').should('be.visible');
    cy.get('#experience').contains('Rossarah Services').should('be.visible');

    // 6. Check Projects Section
    cy.get('#projects').scrollIntoView();
    cy.get('#projects').contains('Featured').should('be.visible');
    cy.get('#projects .group').should('have.length.greaterThan', 0);

    // 7. Check Contact Section
    cy.get('#contact').scrollIntoView();
    cy.get('#contact').contains("Let's Build").should('be.visible');
    cy.get('#contact input[name="name"]').type('Test User');
    cy.get('#contact input[name="email"]').type('test@example.com');
    cy.get('#contact textarea[name="message"]').type('Hello, this is a test message!');
    cy.get('#contact button').contains('WhatsApp').should('be.visible');
    cy.get('#contact button').contains('Email').should('be.visible');
  });
});
