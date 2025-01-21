import { Flex, Spin } from "antd";

const PageLoader: React.FC = () => {
    return (
        <Flex justify="center" align="center" style={{ height: "90vh" }}>
            <Spin size="large" />
        </Flex>
    );    
}

export default PageLoader;
