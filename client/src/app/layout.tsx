import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';

export const metadata: Metadata = {
  title: "BookBay - University Textbook Marketplace",
  description: "Buy and sell textbooks at UMN and UW-Madison",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <Header />
          <main>
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
