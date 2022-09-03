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


    it('Lists and dropdowns', () => {

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

    it('web tables', () => {
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()
        
        // example 1
        // find table body first, next find table row contain string 'Larry'
        cy.get('tbody').contains('tr', 'Larry').then( tableRow => {
            // activate the edit row (button)
            cy.wrap(tableRow).find('.nb-edit').click()
            // now able to edit fields. Clear value in field first before typing new value
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('32')
            // slect the checkmark to confirm change
            cy.wrap(tableRow).find('.nb-checkmark').click()
            // verify value is updated. Use index of column as no unique identifier
            cy.wrap(tableRow).find('td').eq(6).should('contain', 32)

        })

        // example 2
        cy.get('thead').find('.nb-plus').click()
        // find the index of the row and find first & last name
        cy.get('thead').find('tr').eq(2).then( tableRow => {
            cy.wrap(tableRow).find('[placeholder="First Name"]').type('Ian')
            cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Hutchinson')
            // click checkmark to confirm changes
            cy.wrap(tableRow).find('.nb-checkmark').click()
            // verify the first/last name fields have been updated correctly
            cy.get('tbody tr').first().find('td').then( tableColumns => {
                cy.wrap(tableColumns).eq(2).should('contain', 'Ian')
                cy.wrap(tableColumns).eq(3).should('contain', 'Hutchinson')
            })
        })

         // example 3 - verify search functionality
         cy.get('thead [placeholder="Age"]').type('20')
         // add delay to give UI time to update the table before next step is started
         cy.wait(500)
         // find all table rows & check last column to verify the value 20 exists
         cy.get('tbody tr').each( tableRow => {
            cy.wrap(tableRow).find('td').eq(6).should('contain', 20)
         })
        
        //  exmaple 4 - view many results in a table
        const age = [20, 30, 40, 200]

        // cy.wrap(age).each( age => {
        //     cy.get('thead [placeholder="Age"]').clear().type(age)
        //     // add delay to give UI time to update the table before next step is started
        //     cy.wait(500)
        //     // find all table rows & check last column to verify the value 20 exists
        //     cy.get('tbody tr').each( tableRow => {
        //         cy.wrap(tableRow).find('td').eq(6).should('contain', age)
        //     })
        // })

        // example 5 - find a persons age that does not exist (no data found)
        cy.wrap(age).each( age => {
            cy.get('thead [placeholder="Age"]').clear().type(age)
            // add delay to give UI time to update the table before next step is started
            cy.wait(500)
            // find all table rows & check last column to verify the value 20 exists
            cy.get('tbody tr').each( tableRow => {
                if(age == 200) { // verify "no data found" message 
                    cy.wrap(tableRow).should('contain', 'No data found')
                } else {
                    cy.wrap(tableRow).find('td').eq(6).should('contain', age)
                }
                
            })
        })

         

    })

    // date picker test
    it.only('assert property', () => {

        function selectDayFromCurrent(day){
            let date = new Date()   // get current system date and time
            date.setDate(date.getDate() + day)    // add no. of days from date
            let futureDay = date.getDate()
            let futureMonth = date.toLocaleString('default', {month: 'short'})
            // format date
            let dateAssert = futureMonth+' '+futureDay+', '+date.getFullYear()
       
            cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then( dateAttribute => {
                // if attr doesn't match month we are looking for click the right arrow button
                if(!dateAttribute.includes(futureMonth)){
                    cy.get('[data-name="chevron-right"]').click()
                    selectDayFromCurrent(day)
                } else {
                    cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click()
                }
        
            })
            return dateAssert
        }

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()

        cy.contains('nb-card', 'Common Datepicker').find('input').then( input => {
            cy.wrap(input).click()
            let dateAssert = selectDayFromCurrent(300)
            cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)
            cy.wrap(input).should('have.value', dateAssert) // will do exactly same thing as line above.


        })

    })

    it('tooltip', () => {
        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Tooltip').click()

        cy.contains('nb-card', 'Colored Tooltips')
            .contains('Default').click()
        cy.get('nb-tooltip').should('contain', 'This is a tooltip')
    })

    // dealing with dial box outside of the DOM (alert popup in chrome browser)
   
    it('dialog box', () => {
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()
         
        // ex 1 - not recommended approach
        // cy.get('tbody tr').first().find('.nb-trash').click()
        // cy.on('window:confirm', (confirm) => {
        //     expect(confirm).to.equal('Are you sure you want to delete?')
        // })

        // ex 2 - better: if the window did not show up, the stub will be empty. 
        // will return an empty object event, will give you the right assertion.
        const stub = cy.stub()
        cy.on('window:confirm', stub) 
        
        
        cy.get('tbody tr').first().find('.nb-trash').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
        })
    })

    // Assertions
    it.only('chai assertions', () => {

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // example 1.
        cy.get('[for="exampleInputEmail1"]')
            .should('contain', 'Email address')
            .should('have.class', 'label')
            .and('have.text', 'Email address')

        // example 2.
        cy.get('[for="exampleInputEmail1"]').then( label => {
            expect(label.text()).to.equal('Email address')
            expect(label).to.have.class('label')
            expect(label).to.have.text('Email address')       
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

    

})

