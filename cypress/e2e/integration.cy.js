describe('Integration test', () => {
    it('should load the homepage', () => {
      cy.visit('http://localhost:3000/')
      cy.contains('Buy Stuff')
    })
  
    it('should send a message', () => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:5000/send-fresh',
        body: {
          message: 'Szukam męskich butów',
          sender: 'user',
          userEmail: 'test@test.com'
        }
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.query).to.eq('Szukam męskich butów')
        expect(response.body.sender).not.to.be.null
        expect(response.body.answer).to.contain('but')
        expect(response.body.link).to.contain('http')
      })
    })
  })