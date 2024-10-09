
import AuthPage from "@/app/pages/login/page";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext"; // Adjust the import path as needed

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <AuthPage></AuthPage>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
