import { useTranslations } from 'next-intl';

import { Form, Input, Button, Typography } from 'antd';

const { Title } = Typography;

const ForgotPasswordForm: React.FC = () => {

  const t = useTranslations("translations");

  const onFinish = (values: { email: string }) => {
    console.log('Forgot Password Form Submitted:', values);
  };

  return (
    <Form
      name="forgot-password"
      onFinish={onFinish}
      autoComplete="off"
    >
      <Title level={3}>{ t("userAccess.auth.forgotPassword") }</Title>
      <Form.Item
        label={t("labels.email")}
        name="email"
        rules={[{ required: true, message: t("userAccess.messages.enterEmail") }, { type: 'email', message: t("userAccess.errors.invalidEmail") }]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{display: 'block', marginLeft: 'auto'}}
        >
          {t("userAccess.auth.forgotPassword")}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ForgotPasswordForm;
