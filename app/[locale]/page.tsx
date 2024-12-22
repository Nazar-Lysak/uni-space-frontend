import { useTranslations } from 'next-intl';

const Home: React.FC = () => {

  const t = useTranslations("translations");
  
  return (
    <div>
      <h2>
        {t("pages.home.title")}
      </h2>
    </div>
  );
}

export default Home;
