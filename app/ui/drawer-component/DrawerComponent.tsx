import React from 'react';
import { Drawer, Button, FormInstance } from 'antd';
import { useTranslations } from 'use-intl';

interface DrawerComponentProps {
    drawerTitle?: string;
    showDrawer: boolean;
    closeDrawer: (value: boolean) => void;
    children: React.ReactNode;
    form: FormInstance;
}

const DrawerComponent: React.FC<DrawerComponentProps> = ({ children, drawerTitle, showDrawer, closeDrawer, form }) => {

  const t = useTranslations("translations");

  return (
    <Drawer 
      key={showDrawer ? 'open' : 'close'}
      title={drawerTitle}
      onClose={() => closeDrawer(false)} 
      open={showDrawer}
      footer={
        <div style={{ textAlign: 'right' }}>
          <Button 
            onClick={() => closeDrawer(false)} 
            style={{ marginRight: 8 }}
            >
            {t("pages.reactCourse.recipeDrawer.cancel")}
          </Button>
          <Button 
            type="primary" 
            onClick={() => form.submit()}
          >
            {t("pages.reactCourse.recipeDrawer.confirm")}
          </Button>
        </div>
      }
    >
      {children}
    </Drawer>
  );
};

export default DrawerComponent;
