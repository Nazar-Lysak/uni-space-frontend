"use client"

import { Menu } from 'antd';
import LanguageSelector from "@/app/ui/loader/language-selector/LanguageSelector";
import style from "./Header.module.scss";
import LoginButton from '@/app/features/login-button/LoginButton';
import { useLanguage } from "@/app/store/store";
import LinkComponent from "@/app/ui/link/LinkComponent";

const Header: React.FC = () => {

  const { language } = useLanguage();

  const nav = [
    {
      key: 'home',
      label: (
        <LinkComponent 
          url={`/${language}/`} 
          title={"home"} 
        />
      ),
    },
    {
      key: 'about',
      label: (
        <LinkComponent 
          url={`/${language}/about`} 
          title={"About"} 
        />  
      )      
    }    
  ]

  return (
    <header className={style.header}>
      <div>
        <LanguageSelector />
      </div>
      <Menu 
        mode="horizontal" 
        items={nav} 
      />
      <LoginButton />
    </header>
  );
}

export default Header;
