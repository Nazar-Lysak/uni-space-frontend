"use client";

import { Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useLoginPopupStore } from "@/app/store/store";

import style from "./LoginButton.module.scss";

const LoginButton: React.FC = () => {
  const openPopup = useLoginPopupStore(state => state.openPopup);

  return (
    <Button
      className={style.btnLogin}
      icon={<UserOutlined />}
      onClick={openPopup}
    />
  );
};

export default LoginButton;
