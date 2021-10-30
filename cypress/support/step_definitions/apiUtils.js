export function checkStatus( resObj, expStatus){
    expect( resObj.status).to.eqls( expStatus );
}
export function checkStatusText( resObj, expTxt ){
    expect( resObj.statusText).to.eqls( expTxt );
}

export function checkBodyPropVal( resObj, propName, expVal ){
    expect( resObj.body ).to.have.property( propName, expVal );
}

