const { onNavigationPage, navigateTo } = require("../support/page_objects/navigationPage")

describe('Test with Page Objects', () => {
    
    // create 'beforeEach' hook to repeat site visit to avoid repeating code
    beforeEach('open application', () => {
        cy.visit('/')
    })
    
    it('verify navigation across the pages', () => {
        navigateTo.formLayoutsPage()
        navigateTo.datePickerPage()
        navigateTo.dialogPage()
        navigateTo.toasterPage()
        navigateTo.tooltipPage()
        navigateTo.smartTablePage()
    })
    
})
