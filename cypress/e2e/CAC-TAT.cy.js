describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  } )

  it('preenche os campos obrigatórios e envia o formulário', () => {
    const longText = Cypress._.repeat('Teste', 20)
    cy.get('#firstName').type('Stephanie')
    cy.get('#lastName').type('Godoi')
    cy.get('#email').type('stephaniegodoi@email.com')
    cy.get('#open-text-area').type(longText, { delay: 0 })
//  cy.get('button[type="submit"]').click() 
    cy.contains('button', 'Enviar').click()        
    
    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Stephanie')
    cy.get('#lastName').type('Godoi')
    cy.get('#email').type('stephaniegodoi@email,com') //email com formatação inválida
    cy.get('#open-text-area').type('Teste')
//  cy.get('button[type="submit"]').click() 
    cy.contains('button', 'Enviar').click()     

    cy.get('.error').should('be.visible')
  } ) 

  it('campo telefone continua vazio quando preenchido com valor não numérico', () => {
    cy.get('#phone')
      .type('abcdefghij')
      .should('have.value', '')
  })  
  
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Stephanie')
    cy.get('#lastName').type('Godoi')
    cy.get('#email').type('stephaniegodoi@email.com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('Teste')
//  cy.get('button[type="submit"]').click() 
    cy.contains('button', 'Enviar').click()     
    
    cy.get('.error').should('be.visible')
  } )

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('Stephanie')
      .should('have.value', 'Stephanie')
      .clear()
      .should('have.value', '') 
    cy.get('#lastName')     
      .type('Godoi')
      .should('have.value', 'Godoi')
      .clear()
      .should('have.value', '') 
    cy.get('#email')     
      .type('stephaniegodoi@email.com')
      .should('have.value', 'stephaniegodoi@email.com')         
      .clear()
      .should('have.value', '') 
    cy.get('#phone')     
      .type('1234567890')
      .should('have.value', '1234567890')         
      .clear()
      .should('have.value', '') 
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.get('button[type="submit"]').click()   
    cy.get('.error').should('be.visible')
  } )

  it('envia o formulário com sucesso usando um comando customizado', () => {

    //opcao usando data como objeto e enviando dados
    //    const data ={
    //    firstName: 'Stephanie',
    //    lastName: 'Godoi',
    //    email: 'stephaniegodoi@email.com',
    //    text: 'Teste.', 
    //    }
    //    cy.fillMandatoryFieldsAndSubmit(data) 
    
    //opcao usando data com valores padrao
    cy.fillMandatoryFieldsAndSubmit()   
    cy.get('.success').should('be.visible')
  } )

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
      .select('YouTube') //texto presente no conteúdo da tag option
      .should('have.value', 'youtube')
  } )

  it('seleciona um produto (Mentoria) por seu valor', () => {
    cy.get('#product')
      .select('mentoria') //valor do atributo value da tag option
      .should('have.value', 'mentoria')
  } )

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
      .select(1) //índice da opção na lista (começa do zero: selecione)
      .should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked')
  })

  //feito sozinha
  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"][value="ajuda"]').check().should('be.checked')
    cy.get('input[type="radio"][value="elogio"]').check().should('be.checked')
    cy.get('input[type="radio"][value="feedback"]').check().should('be.checked')
  })

  //correção do exercicio utilizando each e wrap
  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .each((tipoAtendimento) => {
        cy.wrap(tipoAtendimento)
          .check()
          .should('be.checked')
      })
  })

  //feito sozinha
  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"][value="email"]')
      .check()
      .should('be.checked')
    cy.get('input[type="checkbox"][value="phone"]')
      .check()
      .should('be.checked')
    cy.get('input[type="checkbox"][value="phone"]')
      .uncheck()
      .should('not.be.checked')
  })

  //correção do exercicio 
  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]') //com seletor generico ele aplica a todos os checkboxes
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload') //get pelo id
      .selectFile('cypress/fixtures/example.json')
      .should((input => {
        //passando como argumento uma função callback que recebe o fileInput 
        //expect no input indice zero, proprieade files no indice zero, propriedade name
	      expect(input[0].files[0].name).to.equal('example.json')
      }))
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
      .should((input => {
	      expect(input[0].files[0].name).to.equal('example.json')
      })) 
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile')//definição do alias
    cy.get('#file-upload')
      .selectFile('@sampleFile')//para chamar alias utiliza-se '@'
      .should((input => {
	      expect(input[0].files[0].name).to.equal('example.json')
      }))
  })

  it('verifica que a politica de privacidade abre em outra aba sem a necessidade de um clique',() => {
    cy.contains('a', 'Política de Privacidade')
    .should('have.attr', 'href', 'privacy.html')
    .and('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click()
    cy.contains('h1', 'CAC TAT - Política de Privacidade')
      .should('be.visible')
  })


})
