const { onDatePickerPage } = require("../support/page_objects/datePickerPage")
const { onFormLayoutsPage } = require("../support/page_objects/formLayoutsPage")
const { onNavigationPage, navigateTo } = require("../support/page_objects/navigationPage")
const { onSmartTablePage } = require("../support/smartTablePage")

describe('Test with Page Objects', () => {
    
    // create 'beforeEach' hook to repeat site visit to avoid repeating code
    beforeEach('open application', () => {
        cy.openHomePage()
    })
    
    it('verify navigation across the pages', () => {
        navigateTo.formLayoutsPage()
        navigateTo.datePickerPage()
        navigateTo.dialogPage()
        navigateTo.toasterPage()
        navigateTo.tooltipPage()
        navigateTo.smartTablePage()
    })
    
    it(' should submitInline and Basic form and select tomorrow\'s date in the calendar', {browser: ['electron', '!edge']}, () => {
        navigateTo.formLayoutsPage()
        onFormLayoutsPage.submitInlineFormWithNameandEmail('Iano', 'ian@test.com')
        onFormLayoutsPage.submitBasicFormWithEmailAndPassword('ian@test.com', 'secret')
        
        navigateTo.datePickerPage()
        onDatePickerPage.selectCommonDatePickerDateFromToday(2)
        onDatePickerPage.selectDatePickerWtihRangeFromToday(7, 14)

        navigateTo.smartTablePage()
        onSmartTablePage.addNewRecordWithFirstAndLastName('Ian', 'Hutchinson')
        onSmartTablePage.updateAgeByFirstName('Ian', 29)
        onSmartTablePage.deleteRowByIndex(1)
    })
})
