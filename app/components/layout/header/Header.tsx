'use client'

import { useTranslations } from 'next-intl';
import { Menu } from 'antd';
import LanguageSelector from "@/app/ui/language-selector/LanguageSelector";
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
    },
    {
      key: 'recipe',
      label: (
        <LinkComponent 
          url={`/${language}/recipe`} 
          title={t("pages.reactCourse.linkLabel")} 
        />  
      )      
    },
    { 
      key: 'copydeck',
      label: (
        <LinkComponent
          url={`/${language}/copydeck`} 
          title={t("pages.copydeck.linkLabel")}
        />
      )
    } 
  ]

  return (
    <header className={style.header}>
      <div>
        <LanguageSelector />
      </div>
      <div style={{padding: '0 20px', width: '100%'}}> 
        <Menu 
          mode={"horizontal"} 
          items={nav} 
        />
      </div>   
      <div>
        <LinkComponent 
          url={`/${language}/profile`} 
          title={t("pages.profile.linkLabel")}
        />
        <LoginButton />
      </div>         
    </header>
  );
}

export default Header;
