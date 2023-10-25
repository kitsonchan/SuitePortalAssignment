describe('App Home Page', () => {
    it('Loaded the Page', () => {
        cy.visit('http://localhost:4200/home')
    })

    it('filled the form and submitted successfully', () => {
        cy.visit('http://localhost:4200/home')
        cy.get('#unit_number').type('1122')
        cy.get('#name').type('ben')
        cy.get('#email').type('ben@hot.com')
        cy.get('mat-select[formControlName=serviceType]').click().get('mat-option').contains('general').click();
        cy.get('#summary').type('test summary')
        cy.get('#details').type('test detail')
        cy.get('form').submit()
    })
})