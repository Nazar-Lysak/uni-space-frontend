import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ConfigProvider } from 'antd';

import theme from "../theme/themeConfig";

import Footer from "../components/layout/footer/Footer";
import Header from "../components/layout/header/Header";
import PopupManager from "../features/popup-manager/PopupManager";
import "./globals.css";


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <ConfigProvider theme={theme}>
        <html lang="en">
          <body className={"body_content"}>
            <Header />
            <main className={"main_content"}>
              {children}
            </main>
            <PopupManager />
            <Footer />
          </body>
        </html>
      </ConfigProvider>      
    </NextIntlClientProvider>
    
  );
}
