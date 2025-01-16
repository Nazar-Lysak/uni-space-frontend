import TitleComponent from '@/app/ui/title-component/TitleComponent';
import { useTranslations } from 'next-intl';

const People: React.FC = () => {

  const t = useTranslations("translations");

  return ( 
    <TitleComponent 
      level={3} 
      title={t("pages.people.title")}
    />
  );
}

export default People;