// QRCodeGenerator.js
import React, { useState, useRef } from 'react';
import QRCode from 'qrcode.react';
import html2canvas from 'html2canvas';

const QRCodeGenerator = () => {
  const [url, setUrl] = useState('');
  const qrCodeRef = useRef(null);

  const handleInputChange = (e) => {
    setUrl(e.target.value);
  };

  const handleDownload = () => {
    html2canvas(qrCodeRef.current, { scale: 2 })
      .then((canvas) => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'qrcode.png';
        link.click();
      })
      .catch((error) => {
        console.error('Error generating QR code image:', error);
      });
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h1 className="card-title">QR Code Generator</h1>
          <div className="form-group">
            <label htmlFor="urlInput">Enter URL:</label>
            <input
              id="urlInput"
              type="text"
              className="form-control"
              value={url}
              onChange={handleInputChange}
              placeholder="Enter URL here"
            />
          </div>
          <div ref={qrCodeRef} className="text-center">
            {url && <QRCode value={url} size={200} />}
          </div>
          {url && (
            <div className="text-center mt-3">
              <button className="btn btn-primary" onClick={handleDownload}>
                Download QR Code
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
