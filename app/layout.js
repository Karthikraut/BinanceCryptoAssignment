import './styles/globals.css';  

export const metadata = {
  title: 'Fintarget',   // App name displayed in the browser tab
  description: 'Your App Description',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        {/* Add favicon using logo.png */}
        <link rel="icon" type="image/png" href="/logo.png" />  {/* Ensure logo.png is in the public folder */}
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
