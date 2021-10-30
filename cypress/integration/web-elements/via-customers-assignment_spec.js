/// <reference types="cypress" />
import StudentReg from '../PageObjects/StudentRegister';
import * as apis from '../../support/step_definitions/apiUtils';


describe('Student Registration Form', () => {

  it('submit student registration form', () => {
    const stuReg = new StudentReg();
    cy.visit('/');
    stuReg.navigateRegisterPage();
    stuReg.checkRegisterPageDefaultView();
    stuReg.addName( 'via', 'customers' );
    stuReg.addMail( 'customers@via.com' );
    stuReg.addGender( 'OTHER' );
    stuReg.addMobile( '9988776655' );
    stuReg.addDob( '22 December 1990' );
    stuReg.addSubjects( 'Science' );
    stuReg.addState( 'NCR' );
    stuReg.addCity( 'Noida' );
    stuReg.submitForm();
    stuReg.checkAcknowledgeTitle();
    stuReg.closeAcknowledge();
  })
 
})


describe( 'API Validations', () => {
  
  //  Check the response for page=2 record
  it('Check for List Users', () => {
    cy.request('GET','https://reqres.in/api/users?page=2').then( (res) => {
      apis.checkStatus(res, 200);
      apis.checkStatusText( res, 'OK' )
      apis.checkBodyPropVal( res, 'page', 2);
      apis.checkBodyPropVal( res, 'per_page', 6 );
      expect( res.body.per_page ).to.eql( res.body.data.length );
    });
  })
  
  // Check the response of each user from 2nd page
  it('Check for List Users', () => {
    cy.request('GET','https://reqres.in/api/users?page=2').then( (res) => {
      apis.checkStatus(res, 200);                     //  check Status
      apis.checkStatusText( res, 'OK' )               //  Check StatusText
      apis.checkBodyPropVal( res, 'page', 2);         //  Check Properties of Response body
      apis.checkBodyPropVal( res, 'per_page', 6 );
      expect( res.body.per_page, 'per_page value' ).to.eql( res.body.data.length );
      const dataArr = res.body.data;
      for(let i = 1; i <= res.body.per_page ; i++ ){  //  Check data is loaded as per the page number
        expect( dataArr[i-1].id ).to.eql( ((res.body.page -1)*res.body.per_page) + i );
      }
      return dataArr;
    })
    .then( (dataArr) => {
        for( let i = 0; i < dataArr.length; i++ ){    // Check the data present in page-view and Individual user-view is matching
          cy.request('GET','https://reqres.in/api/users/' + dataArr[i].id )
            .then( (resp) => {
              apis.checkStatus( resp, 200);
              apis.checkStatusText( resp, 'OK' );
              expect( resp.body.data.id ).to.eql( dataArr[i].id );
              expect( resp.body.data.email ).to.eql( dataArr[i].email );
              expect( resp.body.data.first_name ).to.eql( dataArr[i].first_name );
              expect( resp.body.data.last_name ).to.eql( dataArr[i].last_name );
              expect( resp.body.data.avatar ).to.eql( dataArr[i].avatar );
            });
        }
    });
  })

  it('Check for single user', () => {
    cy.request('GET','https://reqres.in/api/users/2').then( (res) => {
      apis.checkStatus(res, 200);
      apis.checkStatusText( res, 'OK' )
      expect( res.body.data.id ).to.eql( 2 );
    });
  })

  it('Single User not found', () => {
    cy.request({ method: 'GET',
                  url: 'https://reqres.in/api/users/23',
                  failOnStatusCode: false })
      .then( (res) => {
        apis.checkStatus(res, 404);
        apis.checkStatusText( res, 'Not Found' )
        expect( res.body ).to.eql( {} );
      });
  })

  it( 'Create record', () =>{
    cy.request({
      method: 'PoST',
      url: 'https://reqres.in/api/users',
      body:{
        "name": "morpheus",
        "job": "leader"
      }
    }).then( (res ) => {
      apis.checkStatus(res, 201);
      apis.checkStatusText( res, 'Created' );
      apis.checkBodyPropVal( res, 'name', 'morpheus' ); 
      apis.checkBodyPropVal( res, 'job', 'leader' ); 
    });
  })

  it('Update record', () => {
    cy.fixture('put_req_data').then( (data) => {
      cy.request({
        method:'PUT',
        url: 'https://reqres.in/api/users/2',
        body:{
          "name": data.name,
          "job": data.job
        }
      }).then( (res) => {
        apis.checkStatus(res, 200);
        apis.checkStatusText( res, 'OK' );
        apis.checkBodyPropVal( res, 'name', data.name ); 
        apis.checkBodyPropVal( res, 'job', data.job ); 
      })
    })
  })
})
