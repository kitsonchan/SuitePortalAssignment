describe('Admin Home Page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200/admin/login')
        cy.get('#email').type('admin')
        cy.get('#password').type('Admin1234!')
        cy.get('form').submit()
    })

    it('Loaded the Page', () => {
        cy.visit('http://localhost:4200/admin/home')
    })

    it('should display records in table when initial api call is successful', () => {
        cy.server()
        cy.route('GET', 'http://localhost:3333/api/maintenance-requests/').its('status').should('eq', 200)
    })

    it('Should display no records in table when initial api call fails', () => {
        cy.get('.mat-cell').contains('No Records Found.')
    })

    it('Should close open request successfully.', () => {
        cy.get('.mat-cell.mat-column-actions').contains('button', 'Close')
        cy.get('.mat-cell.mat-column-actions').eq(0).find('button').click()
        cy.get('.mat-simple-snackbar').contains('span', 'Request Closed Successfully!')
    })
})