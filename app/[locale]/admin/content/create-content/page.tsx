import TitleComponent from '@/app/ui/title-component/TitleComponent';
import { useTranslations } from 'next-intl';


const CreateContent: React.FC = () => {

  const t = useTranslations("translations");

  return (
    <TitleComponent 
      level={3} 
      title={t("pages.copydeck.links.contenCreate")}
    />
  );
}

export default CreateContent;