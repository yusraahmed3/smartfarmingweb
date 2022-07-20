const Approved = (data) => {
    return `<!DOCTYPE html>
      <html style="margin:0; padding:0;
      <head><title>Welcome ${data}</title></head>
      <body style="margin: 0; padding: 0;">
      <br />
      <br/>
      <div>Welcome ${data}.</div>
      <div>Your request has been approved. You can login using the credentials you provided in the request application</div>
      <br/>
      <br/>
      </body>
      </html>`;
  };
  
  module.exports = { Approved }