

export class SmartTable{

    // modify age based on the date 
    updateAgeByFirstName(name, age){
        // find table body first, next find table row contain string 'Larry'
        cy.get('tbody').contains('tr', name).then( tableRow => {
            // activate the edit row (button)
            cy.wrap(tableRow).find('.nb-edit').click()
            // now able to edit fields. Clear value in field first before typing new value
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type(age)
            // slect the checkmark to confirm change
            cy.wrap(tableRow).find('.nb-checkmark').click()
            // verify value is updated. Use index of column as no unique identifier
            cy.wrap(tableRow).find('td').eq(6).should('contain', age)

        })

    }

    addNewRecordWithFirstAndLastName(){
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
    }

    deleteRowByIndex(index){
        const stub = cy.stub()
        cy.on('window:confirm', stub) 
        cy.get('tbody tr').eq(index).find('.nb-trash').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
        })
    }

}

export const onSmartTablePage = new SmartTable()