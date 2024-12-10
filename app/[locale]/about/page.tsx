import { useTranslations } from 'next-intl';

const About: React.FC = () => {

  const t = useTranslations("translations");

  return (
    <div>
      {t("pages.about.title")}      
    </div>
  );
}

export default About;