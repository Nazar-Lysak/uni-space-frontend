import TitleComponent from '@/app/ui/title-component/TitleComponent';
import { useTranslations } from 'next-intl';
import RemotePageFrame from './components/remot-page-frame/RemotePageFrame';


const Content: React.FC = () => {

  const t = useTranslations("translations");

  return (
    <>
      <TitleComponent 
        level={3} 
        title={t("pages.copydeck.linkLabel")}
      />
      <RemotePageFrame />
    </>
  );
}

export default Content;