
//      Validate element existance
export function checkExistance( selectorVal ){
    cy.get(selectorVal).should('exist');
}
export function checkExistanceWithText( textVal ){
    cy.contains( textVal ).should("exist");
}
//      Validate text in the element
export function checkText( selectorVal, expText ){
    cy.get( selectorVal ).invoke( 'text' ).then( (txtVal) => {
        expect( txtVal ).to.eql( expText );
    });
}
export function checkTextContains( selectorVal, expTxt ){
    cy.get( selectorVal ).invoke( 'text' ).then( (txtVal) => {
        expect( txtVal ).to.include( expTxt );
    });
}
//      Validate property of element
export function checkElmProperty( selectorVal, propName, propVal ){
    cy.get( selectorVal ).invoke( 'attr', propName ).should( 'equal', propVal );
}
//      Enter value in an element
export function typeValue( selectorVal, inputVal ){
    cy.get( selectorVal ).click().type( inputVal ).should('have.value', inputVal );
}
export function typeAndEnterVal( selectorVal, inputVal ){
    cy.get( selectorVal ).click().type( inputVal +'{enter}');
}
//      Perform selection on an element
export function clickElm( selectorVal ){
    cy.get( selectorVal ).click();
}

export function forceClick( selectorVal ){
    cy.get( selectorVal ).click( {force:true} );
}

export function checkVal( selectorVal ){
    cy.get( selectorVal ).check({force:true}).should('be.checked');
}

export function makeSelection( selectorVal, optName){
    cy.get( selectorVal, {timeout:5000} ).select( optName );
}

export function checkSelected( selectorVal ){
    cy.get( selectorVal ).should('be.selected');
}

export function checkUnselected( selectorVal ){
    cy.get( selectorVal ).should('not.be.selected' );
}