import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom';

const App = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="404"
      subTitle="Recurso no encontrado."
      extra={
        <Button type="primary" onClick={() => navigate('/')}>
          Volver
        </Button>
      }
    />
  );
};

export default App
