describe('visual test', () => {

    it('should test snapshot', () => {
        
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // using 'then' func it becomes a jquery object. NOT a cypress object anymore.
        cy.contains('nb-card', 'Using the Grid').then( firstForm => {   
           cy.wrap(firstForm).toMatchImageSnapshot()
           // take snapshot of entire page
           cy.document().toMatchImageSnapshot()
        })
    })
})