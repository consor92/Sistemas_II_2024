import React, { useState } from 'react';
import { 
  Table, 
  Input, 
  Space, 
  Button, 
  Card, 
  Modal, 
  message, 
  Tag,
  Tooltip 
} from 'antd';
import { 
  SearchOutlined, 
  DeleteOutlined,
  CheckOutlined 
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const PerfumeTable = () => {
    const onFinish = (values) => {
        console.log('Received values:', values);
        message.success('Perfumes eliminado exitosamente!');
      };



      

  const [searchText, setSearchText] = useState({});
  const [selectedRows, setSelectedRows] = useState([]);
  const navigate = useNavigate();
  
  // Datos de ejemplo
  const data = [
    {
      codigo: 'P001',
      name: 'Light Blue',
      brand: 'Dolce & Gabbana',
      category: 'Cítrico',
      size: 100,
      price: 99.99,
      stock: 15
    },
    {
      codigo: 'P002',
      name: 'Jadore',
      brand: 'Dior',
      category: 'Floral',
      size: 50,
      price: 120.00,
      stock: 0
    },
    {
      codigo: 'P003',
      name: 'Acqua di Gio',
      brand: 'Giorgio Armani',
      category: 'Amaderado',
      size: 75,
      price: 85.50,
      stock: -2
    },
  ];



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
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Marca',
      dataIndex: 'brand',
      key: 'brand',
      ...getColumnSearchProps('brand'),
    },
    {
      title: 'Categoría',
      dataIndex: 'category',
      key: 'category',
      ...getColumnSearchProps('category'),
    },
    {
      title: 'Tamaño (ml)',
      dataIndex: 'size',
      key: 'size',
      sorter: (a, b) => a.size - b.size,
      width: '120px',
    },
    {
      title: 'Precio',
      dataIndex: 'price',
      key: 'price',
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
      <div style={{ 
        marginBottom: 16, 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h2>Gestión de Productos</h2>
        <Button 
          type="primary" 
          danger
          icon={<DeleteOutlined />}
          onClick={handleDeleteSelected}
        >
          Eliminar Seleccionados ({selectedRows.length})
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        rowKey="codigo"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} items`
        }}
        rowClassName={(record, index) => 
          index % 2 === 0 ? 'table-row-light' : 'table-row-dark'
        }
      />

    </Card>
  );
};

export default PerfumeTable;