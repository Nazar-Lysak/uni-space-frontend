'use client'

import { useTranslations } from 'next-intl';
import { Menu } from 'antd';
import LanguageSelector from "@/app/ui/loader/language-selector/LanguageSelector";
import style from "./Header.module.scss";
import LoginButton from '@/app/features/login-button/LoginButton';
import { useLanguage } from "@/app/store/store";
import LinkComponent from "@/app/ui/link/LinkComponent";

const Header: React.FC = () => {

  const t = useTranslations("translations");
  const { language } = useLanguage();

  const nav = [
    {
      key: 'home',
      label: (
        <LinkComponent 
          url={`/${language}/`} 
          title={t("pages.home.linkLabel")} 
        />
      ),
    },
    {
      key: 'about',
      label: (
        <LinkComponent 
          url={`/${language}/about`} 
          title={t("pages.about.linkLabel")} 
        />  
      )      
    },
    {
      key: 'admin',
      label: (
        <LinkComponent 
          url={`/${language}/admin`} 
          title={t("pages.admin.linkLabel")} 
        />  
      )      
    }  
  ]

  return (
    <header className={style.header}>
      <div>
        <LanguageSelector />
      </div>
      <div style={{padding: '0 20px', width: '370px'}}> 
        <Menu 
          mode={"horizontal"} 
          items={nav} 
        />
      </div>      
      <LoginButton />
    </header>
  );
}

export default Header;
