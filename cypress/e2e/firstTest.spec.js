/// <reference types="cypress" />

const { DARK_THEME } = require("@nebular/theme")
const { verify } = require("crypto")


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


    it('then and wrap methods', () => {

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

    it('invoke command', () => {

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // example 1.
        cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')

        // example 2.
        cy.get('[for="exampleInputEmail1"]').then( label => {
            expect(label.text()).to.equal('Email address')
        })

        // example 3.
        cy.get('[for="exampleInputEmail1"]').invoke('text').then( text => {
            expect(text).to.equal('Email address')
        })

        // locating and testing checkbox status
        cy.contains('nb-card', 'Basic form')
            .find('nb-checkbox') // locate the checkbox area
            .click()   // verify if checkbox is checked
            .find('.custom-checkbox')      // find exact locator for checkbox using unique value
            .invoke('attr', 'class')
            // .should('contain', 'checked') // alrtnative option next line 
            .then(classValue => {
                expect(classValue).to.contain('checked')
            })
    })

    it('assert property', () => {

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()

        cy.contains('nb-card', 'Common Datepicker').find('input').then( input => {
            cy.wrap(input).click()
            cy.get('nb-calendar-day-picker').contains('23').click()
            cy.wrap(input).invoke('prop', 'value').should('contain', 'Jul 23, 2022')

        })

    })

    // testing checkboxboxes and radio buttons
    it('radio button', () => {

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //find locator
        cy.contains('nb-card', 'Using the Grid')
            .find('[type="radio"]').then(radioButtons => {
                // check first radio button then verify
                cy.wrap(radioButtons)
                    .first()
                    .check({force: true})
                    // assertion to check the radio btn is checked
                    .should('be.checked')
                
                // next check the second radio button
                cy.wrap(radioButtons)
                    .eq(1) // get index equal to 1
                    .check({force: true})

                // verify the first is now unchecked
                cy.wrap(radioButtons)
                    .first() // can also use eq(0)
                    .should('not.be.checked')

                // verfiy the third radio button is disabled
                cy.wrap(radioButtons)
                    .eq(2) // can also use eq(0)
                    .should('be.disabled')
            })
    })


    it('check-box', () => {

        // When to use check:
            // check method is only used to work with elements of type= check & radio btns 
            // will only work with input types, they should checkboxes or radio btns
            // will not work on any other web element types
            // can only check your checkbox but CANNOT uncheck a checkbox
        // when to use click:
            // can also work with checkboxes and radio btns - not recommended


        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Toastr').click()

        // cy.get('[type="checkbox"]').check({force: true})
        cy.get('[type="checkbox"]').eq(0).click({force: true})
        cy.get('[type="checkbox"]').eq(1).check({force: true})



    })


    it.only('Lists and dropdowns', () => {

        // verfiy values of dropdown menu
        cy.visit('/')
        
        // ex.1
        // cy.get('nav nb-select').click()
        // cy.get('.options-list').contains('Dark').click()
        // cy.get('nav nb-select').should('contain', 'Dark')
        // // verify dark theme by checking the background colour attribute
        // cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)')

        // ex. 2  loop through an entire list of elements
        // save 'nav var as an object
        cy.get('nav nb-select').then( dropdown => {
            // click on dropdown
            cy.wrap(dropdown).click()
            // get all available list options & iterate through list of elements
            cy.get('.options-list nb-option').each( (listItem, index) => {
                const itemText = listItem.text().trim() // remove leading space and save text only

                const colors = {
                    "Light": "rgb(255, 255, 255)",
                    "Dark": "rgb(34, 43, 69)",
                    "Cosmic": "rgb(50, 50, 89)",
                    "Corporate": "rgb(255, 255, 255)"
                }

                cy.wrap(listItem).click()
                cy.wrap(dropdown).should('contain', itemText) // verify input field we have selected contains the text in the dropdown

                cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText])
                if( index < 3) {
                    cy.wrap(dropdown).click()
                }
                
            })

        })
    })



})

