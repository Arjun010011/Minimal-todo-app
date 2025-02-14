import "./globals.css";
export const metadata = {
  title: "notes app",
  icons: "/favicon.ico",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        {/* Add this manually */}
      </head>
      <body>{children}</body>
    </html>
  );
}
