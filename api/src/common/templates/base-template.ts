export function baseTemplate({
  title,
  body,
  footer = "You are receiving this alert from Uptime Ninja.",
}: {
  title: string;
  body: string;
  footer?: string;
}): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          margin: 0;
          padding: 0;
          background-color: #f4f4f4;
          font-family: 'Helvetica Neue', Arial, sans-serif;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }
        .header {
          background-color: #dc3545;
          padding: 20px;
          text-align: center;
          color: #ffffff;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
          font-weight: 600;
        }
        .content {
          padding: 30px;
          font-size: 16px;
          line-height: 1.6;
          color: #333333;
        }
        .content a {
          color: #007bff;
          text-decoration: none;
          font-weight: 500;
        }
        .content a:hover {
          text-decoration: underline;
        }
        .alert {
          background-color: #f8d7da;
          padding: 15px;
          border-radius: 5px;
          margin-bottom: 20px;
          text-align: center;
          font-weight: 600;
          color: #721c24;
        }
        .footer {
          background-color: #f8f9fa;
          padding: 15px;
          text-align: center;
          font-size: 12px;
          color: #6c757d;
          border-top: 1px solid #e0e0e0;
        }
        .button {
          display: inline-block;
          padding: 10px 20px;
          margin-top: 20px;
          background-color: #007bff;
          color: #ffffff;
          text-decoration: none;
          border-radius: 5px;
          font-weight: 500;
          transition: background-color 0.3s ease;
        }
        .button:hover {
          background-color: #0056b3;
        }
        @media screen and (max-width: 600px) {
          .container {
            margin: 10px;
          }
          .content {
            padding: 20px;
          }
          .header h1 {
            font-size: 20px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>${title}</h1>
        </div>
        <div class="content">
          <div class="alert">Service Status: DOWN</div>
          ${body}
          <a href="${body.includes("URL:") ? body.match(/href="([^"]+)"/)?.[1] || "#" : "#"}" class="button">Check Status</a>
        </div>
        <div class="footer">${footer}</div>
      </div>
    </body>
    </html>
  `;
}
