import { useTranslations } from 'next-intl';

import { useEffect, useState } from 'react';
import { Button, Select, Form, Input, Typography, FormProps } from 'antd';
import { useMarketList } from '../../../store/store';
import Loader from '@/app/ui/loader/Loader';
import { AuthService } from '@/app/services/auth-service';
import { UserSignUp } from '@/app/types/types';

const { Title } = Typography;

type FieldType = {
  email?: string;
  password?: string;
  confirmPassword?: string;
  market?: string;
  username?: string; 
};


const SignUpForm: React.FC = () => {

  const [pendingRequest, setPendingRequest] = useState<boolean>(false);

  const { marketList, isLoading, fetchMarkets } = useMarketList();

  const t = useTranslations("translations");

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    setPendingRequest(true);  
  
    const userdata: UserSignUp = {
      "name": values.username,
      "email": values.email,
      "password": values.password,
      "market": values.market
    }
  
    AuthService.signup(userdata)
      .then((response) => {
        console.log('Signup successful', response);
      })
      .catch((error) => {
        console.error('Signup failed', error);
      }) 
      .finally(() => {
        setPendingRequest(false);
      });
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    fetchMarkets(); 
  }, [marketList, fetchMarkets]);

  return (
    <Form
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      preserve={false}
    >
      <Title level={3}>{ t("userAccess.auth.register") }</Title>
      <Form.Item<FieldType>
        label={t("labels.email")}
        name="email"
        rules={[
          { required: true, message: t("userAccess.messages.enterEmail") },
          { type: 'email', message: t("userAccess.errors.invalidEmail") },
        ]}
      >
        <Input disabled={pendingRequest} />
      </Form.Item>

      <Form.Item<FieldType>
        label={t("labels.password")}
        name="password"
        rules={[
          { required: true, message: t("userAccess.messages.enterPassword") },
          { min: 6, message: t("userAccess.errors.invalidPassword") },
        ]}
      >
        <Input.Password disabled={pendingRequest} />
      </Form.Item>
      <Form.Item<FieldType>
        label={t("labels.confirmPassword")}
        name="confirmPassword"
        dependencies={['password']}
        rules={[
          { required: true, message: t("userAccess.errors.confirmPassword") },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error(t("userAccess.errors.missmatchPassords")));
            },
          }),
        ]}
      >
        <Input.Password disabled={pendingRequest} />
      </Form.Item>

      <Form.Item<FieldType>
        label={t("labels.username")}
        name="username"
        rules={[{ required: true, message: t("userAccess.messages.enterUsername") }]}
      >
        <Input disabled={pendingRequest} />
      </Form.Item>
      <Form.Item<FieldType>
        name="market" 
        label={t("labels.selectMarket")} 
        rules={[{ required: true, message: t("userAccess.messages.selectMarket") }]}
      >
        {
          isLoading 
          ? <Loader />
          : (
            <Select
              options={marketList}
              disabled={pendingRequest}
            />
          ) 
        }
        
      </Form.Item>      

      <Form.Item label={null}>
        <Button
          type="primary"
          disabled={pendingRequest}
          htmlType="submit"
          style={{display: 'block', marginLeft: 'auto'}}
        >
          {
            pendingRequest 
            ? <Loader />
            :  t("buttons.submit")             
          }
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignUpForm;