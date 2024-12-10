
import style from "./Loader.module.scss";
import { LoadingOutlined } from '@ant-design/icons';

const Loader: React.FC = () => {
  return <LoadingOutlined className={style.loader} />;
}

export default Loader;
