/// <reference types="cypress" />


describe('Our first suite', () => {


    it('first test', () => {

        cy.visit('/')  // execute path to the application
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()
        
        // search element by tag name
        cy.get('input')

        // find element by ID
        cy.get('#inputEmail1')

        // find by class name
        cy.get('.input-full-width')

        // by attribute name
        cy.get('[placeholder]')

        // by Attribute name and value
        cy.get('[placeholder="Email"]')

        // by Class value
        cy.get('[class="input-full-width size-medium shape-rectangle"]')

        // by Tag name and Attribute with value
        cy.get('[placeholder="Email"]')


        // by Two different attributes
        cy.get('[placeholder="Email"][fullwidth][type="email"]')

        // by Tag name, attribute with value, ID and Class name
        cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')

        // recommended way to find web elements using Cypress
        cy.get('[data-cy="imputEmail1"]')
    })

})

