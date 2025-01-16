// import { signIn } from 'next-auth/react'

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { UserSignIn } from '@/app/types/types';

import { AuthService } from '@/app/services/auth-service';


import type { FormProps } from 'antd';
import { Alert, Button, Checkbox, Form, Input, Typography } from 'antd';
import { SignInFieldType } from '@/app/types/types';
import Loader from '@/app/ui/loader/Loader';
import { CloseSquareFilled } from '@ant-design/icons';

const { Title } = Typography;



const onFinishFailed: FormProps<SignInFieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const SignInForm: React.FC = () => {

  const [pendingRequest, setPendingRequest] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  

  const t = useTranslations("translations");

  const onFinish: FormProps<SignInFieldType>['onFinish'] = async (values) => {

    setPendingRequest(true);
    
    const userCredentials: UserSignIn = {
      "email": values.email || '',
      "password": values.password || ''
    }
    
    AuthService.signin(userCredentials)
      .then((response) => {        
        console.log(response)
        
      })
      .catch((/*error*/) => {
        setError(true);
      }) 
      .finally(() => {
        setPendingRequest(false);
      });
  };

  return (
    <Form
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      preserve={false}
    >
    <Title level={3}>{ t("userAccess.auth.signIn") }</Title>
      <Form.Item<SignInFieldType>
          label={t("labels.email")}
          name="email"
          validateStatus={error ? 'error' : ''} 
          rules={[
            { required: true, message: t("userAccess.messages.enterEmail") },
            { type: 'email', message: t("userAccess.errors.invalidEmail") },
          ]}
        >
        <Input disabled={pendingRequest} onFocus={() => setError(false)}/>
      </Form.Item>

    <Form.Item<SignInFieldType>
      label={t("labels.password")}
      name="password"
      validateStatus={error ? 'error' : ''} 
      rules={[{ required: true, message: t("userAccess.messages.enterPassword") }]}
    >
      <Input.Password disabled={pendingRequest} onFocus={() => setError(false)}/>
    </Form.Item>

    <Form.Item<SignInFieldType> name="remember" valuePropName="checked" label={null}>
      <Checkbox>{t("labels.rememberMe")}</Checkbox>
    </Form.Item>
    {
      error && (
        <Alert
          message={t("userAccess.errors.wrongCredencials")}
          type="error"
          closable={{
            'aria-label': 'close',
            closeIcon: <CloseSquareFilled />,
          }}
          onClose={() => setError(false)}
        />
      )
    }    

    <Form.Item label={null}>
      <Button
        type="primary"
        htmlType="submit"
        disabled={pendingRequest}
        style={{display: 'block', marginLeft: 'auto'}}
      >
        {
          pendingRequest 
            ? <Loader />
            :  t("userAccess.auth.signIn")             
          }
      </Button>
    </Form.Item>
  </Form>
  );
};

export default SignInForm;