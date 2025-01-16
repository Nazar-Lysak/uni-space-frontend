
import { useTranslations } from 'next-intl';
import TitleComponent from "@/app/ui/title-component/TitleComponent";

const Profile: React.FC = () => {

  const t = useTranslations("translations");  

  return (
    <TitleComponent 
      level={3} 
      title={t("pages.profile.title")}
    />
  );
}

export default Profile;