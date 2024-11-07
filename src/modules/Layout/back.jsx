import { useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import {
  EditTwoTone,
  PlusCircleTwoTone,
  HomeOutlined,
  DeleteTwoTone,
  QuestionCircleTwoTone,
  EyeTwoTone
} from '@ant-design/icons'
import { Layout, Menu, theme } from 'antd'

const { Header, Content, Footer, Sider } = Layout

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  }
}


const items = [
  //getItem(<Link to="/backend"> Dashboard </Link>, '1', <HomeOutlined />),
  getItem(<Link to="/backend/add"> Agregar </Link>, '2', <PlusCircleTwoTone />),
  getItem(<Link to="/backend/edit"> Editar</Link>, '3', <EditTwoTone /> ),
  getItem(<Link to="/backend/delete"> Eliminar </Link>, '4', <DeleteTwoTone />, ),
  getItem(<Link to="/backend/view"> Mostrar </Link>, '5', <EyeTwoTone />, ),
]


const App = () => {
  const [collapsed, setCollapsed] = useState(false)
  
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  
  return (
    <Layout
      style={{
        minHeight: '90vh',
      }}
    >
      <Sider
        collapsible 
        defaultCollapsed={true}
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline"
          items={items}
        ></Menu>
      </Sider>

      <Layout style={{ width: '100%' }}>
        
        <Content
          style={{
            margin: '20px 16px',
          }}
        >
          <div
            style={{
              height: '100%',
              background: colorBgContainer,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Outlet />

          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          API Front Sistemas II - Dockerizado
        </Footer>
      </Layout>
    </Layout>
  )
}
export default App
