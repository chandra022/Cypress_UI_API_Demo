export function navigateToForm(){
    // cy.intercept('GET','https://demoqa.com/favicon.ico').as('navigateForm');
     cy.contains('Forms').eq(0).click();
     // cy.wait('@navigateForm');
     checkUrl( 'forms');
     cy.get('div.main-header').should('have.text','Forms');
     cy.get('div[class="element-list collapse show"] > ul.menu-list')
         .invoke('text')
         .then( (avilableOpts) => {
             expect(avilableOpts).to.include( 'Practice Form' )
         });
    cy.contains('Practice Form').click();
    checkUrl( 'automation-practice-form' );
 }
 
 export function checkUrl( pageUrl ){
     let expUrl;
     if( pageUrl.includes( 'http') ){
         expUrl = pageUrl;
     }else{
         expUrl = Cypress.config().baseUrl + pageUrl;
     }
     cy.url( {timeout: 5000} ).should( 'eq', expUrl );
 }

 export function getCurrnetDate( dateFormat ){
     const toDay = new Date();
     const monthNames = [ "January", "February", "March", "April" , "May", "June", "July", "August", "September", "October", "November", "December" ];

     let day = toDay.getDate().toString();
     let year = toDay.getFullYear().toString();
     let month = toDay.getMonth();
     if( day.length < 2) day = '0'+day;
     let res;
     switch(dateFormat){
         case 'dd mmm yyyy':
            res = day +' '+ monthNames[month].substr(0,3) +' '+ year;
            break;
         case 'dd/mm/yyyy':  
            month++;
            if( month.length < 2) month = '0'+month; 
            res = day +'/'+ month +'/'+ year;
            break;
     }
     return res;
 }