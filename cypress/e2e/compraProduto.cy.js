/// <reference types="Cypress"/>

describe('Teste funcional de login', () => {
    it('Deve realizar o login com sucesso', () => {
        cy.visit("https://www.saucedemo.com/")
        cy.get('[data-test="username"]').type("standard_user")
        cy.get('[data-test="password"]').type("secret_sauce")
        cy.get('[data-test="login-button"]').click()
        cy.get('.title').should('contain','Products')  
        
        //ordenação de produtos do menor para o maior valor
        cy.get('[data-test="product_sort_container"]').select('Price (low to high)')
        // validação da ordem dos 3 primeiros produtos ordenados por valor
        cy.get(':nth-child(1) > .inventory_item_description').should('contain','Sauce Labs Onesie')
        cy.get(':nth-child(2) > .inventory_item_description').should('contain','Sauce Labs Bike Light')
        cy.get(':nth-child(3) > .inventory_item_description').should('contain','Sauce Labs Bolt T-Shirt')
        
        //abrindo a single do produto
        cy.contains('Sauce Labs Onesie').click()
        //adicionando produto ao carrinho
        cy.get('.btn_primary').click()
        //voltar a tela produtos
        cy.get('[data-test="back-to-products"]').click()

        cy.contains('Sauce Labs Bike Light').click()
        //adicionando produto ao carrinho
        cy.get('.btn_primary').click()
        //voltar a tela produtos
        cy.get('[data-test="back-to-products"]').click()

        cy.contains('Sauce Labs Bolt T-Shirt').click()
        //adicionando produto ao carrinho
        cy.get('.btn_primary').click()
        //voltar a tela produtos
        cy.get('[data-test="back-to-products"]').click()

        //checagem de itens adicionados ao carrinho
        cy.get('.shopping_cart_link').should('have.text','3')
        cy.get('.shopping_cart_link').click()
        cy.get('.cart_list > :nth-child(3)').should('contain','Sauce Labs Onesie')
        cy.get('.cart_list > :nth-child(4)').should('contain','Sauce Labs Bike Light')
        cy.get('.cart_list > :nth-child(5)').should('contain','Sauce Labs Bolt T-Shirt')

        //checkout
        cy.get('[data-test="checkout"]').click()
        cy.get('[data-test="firstName"]').type('Test first name')
        cy.get('[data-test="lastName"]').type('Test last name')
        cy.get('[data-test="postalCode"]').type('123456789')
        cy.get('[data-test="continue"]').click()

        //checagem do valor total da compra
        cy.get('.summary_total_label').should('have.text','Total: $36.69')
        //finalizar compra
        cy.get('[data-test="finish"]').click()
        cy.get('.complete-header').should('have.text','Thank you for your order!')
        cy.get('[data-test="back-to-products"]').click()
        cy.get('.app_logo').should('have.text','Swag Labs')
        


    });
});