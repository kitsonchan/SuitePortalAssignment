describe('Admin Login Page', () => {
    it('Loaded the Page', () => {
        cy.visit('http://localhost:4200/admin/login')
    })

    it('filled the form and logged in successfully', () => {
        cy.visit('http://localhost:4200/admin/login')
        cy.get('#email').type('admin')
        cy.get('#password').type('Admin1234!')
        cy.get('form').submit()
    })

    it('filled the form and logged in failed with wrong credentials', () => {
        cy.visit('http://localhost:4200/admin/login')
        cy.get('#email').type('aaa')
        cy.get('#password').type('bbb')
        cy.get('form').submit()
    })
})