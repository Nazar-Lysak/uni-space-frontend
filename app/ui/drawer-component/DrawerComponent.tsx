import React from 'react';
import { Drawer, Button, FormInstance } from 'antd';

interface DrawerComponentProps {
    drawerTitle?: string;
    showDrawer: boolean;
    closeDrawer: (value: boolean) => void;
    children: React.ReactNode;
    form: FormInstance;
}

const DrawerComponent: React.FC<DrawerComponentProps> = ({ children, drawerTitle, showDrawer, closeDrawer, form }) => {
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
            Cancel
          </Button>
          <Button 
            type="primary" 
            onClick={() => form.submit()}
          >
            Confirm
          </Button>
        </div>
      }
    >
      {children}
    </Drawer>
  );
};

export default DrawerComponent;
