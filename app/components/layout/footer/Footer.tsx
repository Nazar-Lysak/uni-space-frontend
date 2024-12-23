import { useTranslations } from 'next-intl';

import style from "./Footer.module.scss";

const Footer: React.FC = () => {
  const t = useTranslations("translations");

  return (
    <footer className={style.footer}>{ t("footer.title") }</footer>
  );
}

export default Footer;
