// method to determine the state of the main menu. 
// checking is it opened or collapsed?
function selectGroupMenuItem(groupName){
    cy.contains('a', groupName).then( menu => {
        cy.wrap(menu).find('.expand-state g g').invoke('attr', 'data-name').then( attr => {
            if( attr.includes('left'))
                cy.wrap(menu).click()
        })
    })
}


export class NavigationPage{

    formLayoutsPage(){
        // cy.contains('Forms').click()
        selectGroupMenuItem('Forms')
        cy.contains('Form Layouts').click()
    }

    datePickerPage(){
        // cy.contains('Forms').click()
        selectGroupMenuItem('Forms')
        cy.contains('Datepicker').click()
    }

    dialogPage(){
        selectGroupMenuItem('Modal & Overlays')
        cy.contains('Dialog').click()
    }

    toasterPage(){
        selectGroupMenuItem('Modal & Overlays')
        cy.contains('Toastr').click()
    }

    tooltipPage(){
        selectGroupMenuItem('Modal & Overlays')
        cy.contains('Tooltip').click()
    }

    smartTablePage(){
        selectGroupMenuItem('Tables & Data')
        cy.contains('Smart Table').click()
    }

    




}

export const navigateTo = new NavigationPage()