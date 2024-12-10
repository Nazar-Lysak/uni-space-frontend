import { useTranslations } from 'next-intl';

import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input, Typography } from 'antd';

const { Title } = Typography;

type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const SignInForm: React.FC = () => {

  const t = useTranslations("translations");

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
      rules={[{ required: true, message: t("userAccess.messages.enterPassword") }]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
      <Checkbox>{t("labels.rememberMe")}</Checkbox>
    </Form.Item>

    <Form.Item label={null}>
      <Button
        type="primary"
        htmlType="submit"
        style={{display: 'block', marginLeft: 'auto'}}
      >
        { t("userAccess.auth.signIn") }
      </Button>
    </Form.Item>
  </Form>
  );
};

export default SignInForm;