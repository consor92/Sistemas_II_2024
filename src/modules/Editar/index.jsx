import React, { useState , useEffect} from 'react';
import {
    Table,
    Input,
    Space,
    Button,
    Card,
    Tag,
    Tooltip,
    Flex,
    Spin
} from 'antd';
import {
    SearchOutlined,
    EditOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const PerfumeTable = () => {
    const [searchText, setSearchText] = useState({});
    const [selectedRows, setSelectedRows] = useState([]);
    const [data, setProducto] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [itemSize, setItemSize] = React.useState(5);

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${window.URL_BASE}`, {
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true'
          },
        })
          .then((res) => res.json())
          .then((dat) => { setProducto(dat); setLoading(true); })
      }, [])

    const handleAction = (record) => {
        navigate(`/edit/${record.codigo}`);
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
                    <Tooltip title="Editar">
                        <Button
                            type="text"
                            icon={<EditOutlined />}
                            onClick={() => handleAction(record, 'edit')}
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
                    <div style={{
                        marginBottom: 16,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <h2>Gestión de Productos</h2>

                    </div>
                    <Table
                        columns={columns}
                        dataSource={data}
                        rowKey="codigo"
                        onChange={(value)=>{setItemSize(value.pageSize)}}
                        pagination={{
                            pageSize: itemSize,
                            showSizeChanger: true,
                            showTotal: (total) => `Total ${total} items`
                        }}
                        rowClassName={(record, index) =>
                            index % 2 === 0 ? 'table-row-light' : 'table-row-dark'
                        }
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