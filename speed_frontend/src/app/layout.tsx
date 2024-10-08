
import "./globals.css";
import PopulatedNavBar from "@/components/PopulatedNavBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <PopulatedNavBar></PopulatedNavBar>
      </body>
    </html>
  );
}
