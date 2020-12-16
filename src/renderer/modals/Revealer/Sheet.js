import React from "react";
import chip from "./puce_white.svg";

const style = `
    html, body {
      margin: 0;
      width: 210mm;
      height: 297mm;
      -webkit-print-color-adjust: exact;
    }
    
    .revealerImg {
      image-rendering: pixelated;
      width: 8.1cm;
      height: 4.9cm;
    }
    
    .pageContainer {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
    }
    
    .revealerContainer {
      position: relative;
      border: 0.01cm black solid;
      box-sizing: border-box;
    }
    
    .revealerFrame {
      padding: 0.18cm;
      border: 0.01cm black solid;
      position: relative;
      box-sizing: border-box;
    }
    
    .leftBar {
      border-left: 0.005cm black dashed;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0.08cm;
    }

    .rightBar {
      border-right: 0.005cm black dashed;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0.08cm;
    }

    .bottomBar {
      border-bottom: 0.005cm black dashed;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0.08cm;
    }

    .topBar {
      border-top: 0.005cm black dashed;
      position: absolute;
      left: 0;
      right: 0;
      top: 0.08cm;
    }
    
    .logoContainer {
      z-index: 4;
      width: 0.4cm;
      height: 0.4cm;
      background-color: black;
      padding: 0.15cm;
      border-bottom-right-radius: 25%;
      position: absolute;
      top: 0;
      left: 0;
    }

    .ledgerLogo {
      width: 100%;
      height: 100%;
    }

    @page {
      size: A4;
      margin: 0;
    }
  }
`;

export function Sheet({ imgData }) {
  return (
    <html>
      <head>
        <style>{style}</style>
        <title>Ledger live revealer</title>
      </head>
      <body>
        <div className="pageContainer">
          <div className="revealerFrame">
            <div className="topBar" />
            <div className="leftBar" />
            <div className="rightBar" />
            <div className="bottomBar" />
            <div className="revealerContainer">
              <div className="logoContainer">
                <img className="ledgerLogo" src={chip} />
              </div>
              <img className="revealerImg" src={imgData} />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
