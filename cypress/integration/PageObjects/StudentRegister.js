/// <reference types="cypress" />
 import * as app from '../../support/step_definitions/appUtils';
 import * as obj from '../../support/step_definitions/objUtils';


class StudentReg{
    stuRegFormHeading = "div.practice-form-wrapper > h5";
    nameElm = "label#userName-label";
    fNameEdit = "input#firstName";
    lNameEdit = "input#lastName";
    emailElm = "label#userEmail-label";
    emailEdit = "input#userEmail";
    genderElm = "div#genterWrapper > div:nth-child(1)";
    maleRadio = "input#gender-radio-1";
    femaleRadio = "input#gender-radio-2";
    otherRadio = "input#gender-radio-3";
    mobileElm = "label#userNumber-label";
    mobileEdit = "input#userNumber";
    dobElm = "label#dateOfBirth-label";
    dobEdit = "input#dateOfBirthInput";
    monthSelect = "select.react-datepicker__month-select";
    yearSelect = "select.react-datepicker__year-select";
    dateSelect = ".react-datepicker__day--0";
    subjectElm = "label#subjects-label";
    subjectEdit = "#subjectsInput";
    hobbiesElm = "label#subjects-label";
    sportsCheck = "input#hobbies-checkbox-1";
    readingCheck = "input#hobbies-checkbox-2";
    musicCheck = "input#hobbies-checkbox-3";
    currentAddElm = "label#currentAddress-label";
    currAddEdit = "textarea#currentAddress";
    stateAndCityElm = "label#stateCity-label";
    stateEdit = "#state > div > div.css-1hwfws3 > div.css-1wa3eu0-placeholder";
    cityEdit = "#city > div > div.css-1hwfws3 > div.css-1wa3eu0-placeholder";
    submitBtn = "button#submit";
    acknowledgeTitle = "#example-modal-sizes-title-lg";
    closeAcknowledgeBtn = "button#closeLargeModal";

    navigateRegisterPage(){
        app.navigateToForm();
    }

    checkRegisterPageDefaultView(){
        obj.checkText( this.stuRegFormHeading, 'Student Registration Form' );
        obj.checkText( this.nameElm , 'Name' );
        obj.checkElmProperty(this.fNameEdit, 'placeholder', 'First Name' );
        obj.checkElmProperty( this.lNameEdit, 'placeholder', 'Last Name' );
        obj.checkText( this.emailElm , 'Email' );
        obj.checkElmProperty( this.emailEdit, 'placeholder', 'name@example.com' );
        obj.checkText( this.genderElm , 'Gender' );
        obj.checkUnselected( this.maleRadio );
        obj.checkUnselected( this.femaleRadio );
        obj.checkUnselected( this.otherRadio );
        obj.checkTextContains( this.mobileElm, 'Mobile' );
        obj.checkElmProperty( this.mobileEdit, 'placeholder', 'Mobile Number' );
        obj.checkText( this.dobElm, 'Date of Birth' );
        obj.checkElmProperty( this.dobEdit, 'value', app.getCurrnetDate( 'dd mmm yyyy' ) );
        obj.checkTextContains( this.subjectElm, 'Subjects' );
        obj.checkText( this.subjectEdit, '' );
        obj.checkTextContains( this.hobbiesElm, 'Hobbies' );
        obj.checkText( this.currentAddElm, 'Current Address' );
        obj.checkElmProperty( this.currAddEdit, 'placeholder', 'Current Address' );
    }

    addName( fName, lName){
        obj.typeValue( this.fNameEdit, fName );
        obj.typeValue( this.lNameEdit, lName );
    }
    addMail( mailId ){
        obj.typeValue( this.emailEdit, mailId );
    }
    addGender( gendarVal ){
        let targetElm;
        switch( gendarVal.toUpperCase() ){
            case 'MALE':
                targetElm = this.maleRadio;
                break;
            case 'FEMALE':
                targetElm = this.femaleRadio;
                break;
            case "OTHER":
                targetElm = this.otherRadio;
                break;
        }
        obj.checkVal( targetElm );
    }
    addMobile( mobNum ){
        obj.typeValue( this.mobileEdit, mobNum );
    }
    addDob( dob ){
        const arr = dob.split(' ');
        const date = arr[0];
        const month = arr[1];
        const year = arr[2];

        obj.clickElm( this.dobEdit );
        obj.makeSelection( this.yearSelect, year );
        obj.makeSelection( this.monthSelect, month );
        if( date.length <2 ) date = '0'+date;
        obj.clickElm( this.dateSelect + date );
    }
    addSubjects( subjName ){
        obj.typeAndEnterVal( this.subjectEdit, subjName );
    }
    addState( sName ){
        obj.typeAndEnterVal( this.stateEdit, sName );
    }
    addCity( cName ){
        obj.typeAndEnterVal( this.cityEdit, cName );
    }
    submitForm(){
        obj.clickElm( this.submitBtn );
    }
    checkAcknowledgeTitle(){
        obj.checkText( this.acknowledgeTitle, 'Thanks for submitting the form' );
    }
    closeAcknowledge(){
        cy.get('#close-fixedban').click();
        obj.clickElm( this.closeAcknowledgeBtn );
    }
}

export default StudentReg;