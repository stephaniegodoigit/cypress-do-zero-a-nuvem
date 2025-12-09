Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {
    //data é argumento da função, e a informação abaixo é o valor padrão caso nenhum argumento seja passado
    firstName: 'Ana',
    lastName: 'Maria',
    email: 'anamaria@email.com',
    text: 'teste usando data com valores padrao'
}) => {
    //opcao usando data como objeto e enviando dados
    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#open-text-area').type(data.text)
//  cy.get('button[type="submit"]').click() 
    cy.contains('button', 'Enviar').click()             
}) 