import TitleComponent from '@/app/ui/title-component/TitleComponent';
import { useTranslations } from 'next-intl';


const ContentList: React.FC = () => {

  const t = useTranslations("translations");

  return (
    <TitleComponent 
      level={3} 
      title={t("pages.copydeck.links.contentList")}
    />
  );
}

export default ContentList;