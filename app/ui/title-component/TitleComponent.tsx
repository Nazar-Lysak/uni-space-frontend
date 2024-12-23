"use client"

import { Typography } from "antd";

interface TitleComponentProps {
    title: string;
    level: 1 | 2 | 3 | 4 | 5
  }
  
  const TitleComponent: React.FC<TitleComponentProps> = ({ title, level}) => {

    const { Title } = Typography;

    return (
      <Title level={level}>
        {title}
      </Title>
    );
  }
  
  export default TitleComponent;
  
