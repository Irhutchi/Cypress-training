
function selectDayFromCurrent(day){
    let date = new Date()   // get current system date and time
    date.setDate(date.getDate() + day)    // add no. of days to current date
    let futureDay = date.getDate() // use this var to store the date we want to select in the calendar
    let futureMonth = date.toLocaleString('en-us', {month: 'short'})
    console.log("future month format: "+futureMonth)
    // format date
    let dateAssert = futureMonth+' '+futureDay+', '+date.getFullYear()

    cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then( dateAttribute => {
        // if attr doesn't match month we are looking for click the right arrow button
        if(!dateAttribute.includes(futureMonth)){
            cy.get('[data-name="chevron-right"]').click()
            // func. can call itself, creating a while loop effectively, if month does
            // not have future month, it will click right and run this func, again.
            selectDayFromCurrent(day)
        } else {
            cy.get('.day-cell').not('.bounding-month').contains(futureDay).click()
        }

    })
    return dateAssert
}


export class DatepickerPage{

    selectCommonDatePickerDateFromToday(dayFromToday){
        cy.contains('nb-card', 'Common Datepicker').find('input').then( input => {
            cy.wrap(input).click()
            let dateAssert = selectDayFromCurrent(dayFromToday)
            // cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)
            cy.wrap(input).should('have.value', dateAssert) // will do exactly same thing as line above.
        })
    }

    selectDatePickerWtihRangeFromToday(firstDay, secondDay){
        cy.contains('nb-card', 'Datepicker With Range').find('input').then( input => {
            cy.wrap(input).click()
            let dateAssertFirst = selectDayFromCurrent(firstDay)
            let dateAssertSecond = selectDayFromCurrent(secondDay)
            const finalDate = dateAssertFirst+' - '+dateAssertSecond
            cy.wrap(input).invoke('prop', 'value').should('contain', finalDate)
            cy.wrap(input).should('have.value', finalDate) // will do exactly same thing as line above.
        })
    }



}

export const onDatePickerPage = new DatepickerPage()
