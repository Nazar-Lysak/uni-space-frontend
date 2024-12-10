import { useTranslations } from 'next-intl';

import { useEffect } from 'react';
import { Button, Select, Form, Input, Typography, FormProps } from 'antd';
import { useMarketList } from '../../../store/store';
import Loader from '@/app/ui/loader/Loader';

const { Title } = Typography;

type FieldType = {
  email?: string;
  password?: string;
  confirmPassword?: string;
  market?: string;
  username?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const handleSelect = (value: string) => {
  console.log(`selected ${value}`);
};

const SignUpForm: React.FC = () => {

  const { marketList, isLoading, error, fetchMarkets } = useMarketList();

  const t = useTranslations("translations");

  useEffect(() => {
    fetchMarkets(); 
  }, [marketList]);

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
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label={t("labels.password")}
        name="password"
        rules={[
          { required: true, message: t("userAccess.messages.enterPassword") },
          { min: 6, message: t("userAccess.errors.invalidPassword") },
        ]}
      >
        <Input.Password />
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
        <Input.Password />
      </Form.Item>

      <Form.Item<FieldType>
        label={t("labels.username")}
        name="username"
        rules={[{ required: true, message: t("userAccess.messages.enterUsername") }]}
      >
        <Input />
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
              onChange={handleSelect}
              options={marketList}
            />
          ) 
        }
        
      </Form.Item>      

      <Form.Item label={null}>
        <Button
          type="primary"
          htmlType="submit"
          style={{display: 'block', marginLeft: 'auto'}}
        >
          { t("buttons.submit") }
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignUpForm;