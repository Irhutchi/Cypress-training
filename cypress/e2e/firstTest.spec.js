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

    it('Second  test', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.get('[data-cy="signInButton"]')

        cy.contains('Sign in')

        cy.contains('[status="warning"]','Sign in')

        cy.get('#inputEmail3')
        .parents('form') // used to locate the parent element based on the key element above
        .find('button')  //can only be used to find the child elements inside of the parent element
        .should('contain', 'Sign in')
        .parents('form')
        .find('nb-checkbox')
        .click()

        // find email field that doesn't have any uniquie identifiers
        cy.contains('nb-card','Horizontal form').find('[type="email"]')

    })


    it.only('then and wrap methods', () => {

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // verify label text for email and password 
        // cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')
        // cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password')
        // cy.contains('nb-card', 'Basic form').find('[for="exampleInputEmail1"]').should('contain', 'Email address')
        // cy.contains('nb-card', 'Basic form').find('[for="exampleInputPassword1"]').should('contain', 'Password')


        cy.contains('nb-card', 'Using the Grid').then( firstForm => {   // using 'then' func it becomes a jquery object. NOT a cypress object anymore.
            const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text()
            const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text()
            expect(emailLabelFirst).to.equal('Email') // known as an assertion
            expect(passwordLabelFirst).to.equal('Password')

            // make an assertion that the label for password for both Using the Grid form & Basic form 

            /** 1. Get the label for the 1st form - save it
             *  2. get the label for the 2nd form - save it
             *  3. Make assertion the first label is equal to the second label */
            cy.contains('nb-card', 'Basic form').then( secondForm => {
                const passwordLabelSecond = secondForm.find('[for="exampleInputPassword1"]').text()
                expect(passwordLabelSecond).to.equal(passwordLabelFirst)

                // change the context from JQuery back to Cypress context using wrap function
                // wrap jquery method allows you to run Cypress assertions against it.
                cy.wrap(secondForm).find('[for="exampleInputPassword1"]')
            })
        })

    })

})

