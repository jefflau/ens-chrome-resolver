import React from 'react'
var QRCode = require('qrcode.react');

const QRGenerator = (props) => {
  if (props.query === ""){return <img src="./ens-logo.png" className="App-logo" alt="logo" /> ;}
  var regex_addr =  new RegExp('(\b|^)(0x)?[A-Fa-f0-9]{40}($|\b)'); 
  var regex_eth = new RegExp('\.eth(?:[:\/]|$)');
  if (regex_addr.test(props.query)) {
    return <QRCode className="qrcode" size="75"  value={props.query} />;
  }else if(regex_eth.test(props.query)){
    return <QRCode className="qrcode" size="75"  value={props.query2} />;
  } else{
    return <img src="./ens-logo.png" className="App-logo" alt="logo" />;
  }
}

export default QRGenerator;