import React, { useEffect, useState } from 'react';
import {
  Table,
  Input,
  Space,
  Button,
  Card,
  Modal,
  message,
  Tag,
  Tooltip,
  Flex,
  Spin
} from 'antd'
  ;
import {
  SearchOutlined,
  DeleteOutlined,
  CheckOutlined
} from '@ant-design/icons';

const PerfumeTable = () => {

  const [searchText, setSearchText] = useState({});
  const [selectedRows, setSelectedRows] = useState([]);
  const [data, setProducto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [itemSize, setItemSize] = useState(5);
  const [refresh, setRefresh] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;  

  const onFinish = async (values) => {
    try {
      const response = await fetch(`${apiUrl}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      message.success('Perfumes eliminados exitosamente!');
    } catch (error) {
      message.error('Error en la eliminacion');
    }
  };


  useEffect(() => {
    fetch(`${window.URL_BASE}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      },
    })
      .then((res) => res.json())
      .then((dat) => { setProducto(dat); setLoading(true); })
  }, [refresh])



  const handleDeleteSelected = () => {
    if (selectedRows.length === 0) {
      message.warning('Selecciona al menos un producto para eliminar');
      return;
    }

    Modal.confirm({
      title: '¿Estás seguro de eliminar los productos seleccionados?',
      content: `Se eliminarán ${selectedRows.length} productos`,
      okText: 'Sí, eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk: () => {
        onFinish(selectedRows);
        setRefresh(true);
      }
    });
  };


  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Buscar ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => confirm()}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => confirm()}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Buscar
          </Button>
          <Button onClick={() => clearFilters()} size="small" style={{ width: 90 }}>
            Resetear
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
  });


  const columns = [
    {
      title: 'Código',
      dataIndex: 'codigo',
      key: 'codigo',
      ...getColumnSearchProps('codigo'),
      width: '100px',
    },
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      key: 'nombre',
      ...getColumnSearchProps('nombre'),
    },
    {
      title: 'Marca',
      dataIndex: 'marca',
      key: 'marca',
      ...getColumnSearchProps('marca'),
    },
    {
      title: 'Categoría',
      dataIndex: 'categoria',
      key: 'categoria',
      ...getColumnSearchProps('categoria'),
    },
    {
      title: 'Tamaño (ml)',
      dataIndex: 'tamanio',
      key: 'tamanio',
      sorter: (a, b) => a.size - b.size,
      width: '120px',
    },
    {
      title: 'Precio',
      dataIndex: 'precio',
      key: 'precio',
      sorter: (a, b) => a.price - b.price,
      render: (text) => `$${text.toFixed(2)}`,
      width: '120px',
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
      sorter: (a, b) => a.stock - b.stock,
      render: (stock) => (
        <Tag color={stock > 0 ? 'green' : stock === 0 ? 'gold' : 'red'}>
          {stock}
        </Tag>
      ),
      width: '100px',
    },
    {
      title: 'Acciones',
      key: 'action',
      width: '150px',
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Seleccionar para eliminar">
            <Button
              type="text"
              icon={<CheckOutlined />}
              onClick={() => {
                const newSelected = [...selectedRows];
                const index = newSelected.indexOf(record.codigo);
                if (index >= 0) {
                  newSelected.splice(index, 1);
                } else {
                  newSelected.push(record.codigo);
                }
                setSelectedRows(newSelected);
              }}
              style={{
                color: selectedRows.includes(record.codigo) ? '#52c41a' : '#999999'
              }}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Card>
      {loading ?
        <>
          <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
            <h2>Gestion producto</h2>
          </div>

          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={handleDeleteSelected}
          >
            Eliminar Seleccionados ({selectedRows.length})
          </Button>

          <Table
            columns={columns}
            dataSource={data}
            rowKey="codigo"
            onChange={(value) => { setItemSize(value.pageSize) }}
            pagination={{
              pageSize: itemSize,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} items`
            }}
          />

        </>
        :
        <Flex align="center" gap="middle">
          <Spin size="large" />
        </Flex>
      }
    </Card>
  );
};

export default PerfumeTable;