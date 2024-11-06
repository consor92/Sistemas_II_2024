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
    EyeOutlined,
} from '@ant-design/icons';

import ViewPerfume from '../Mostrar/modal'
import { useNavigate } from 'react-router-dom';

const PerfumeTable = ({ mode = 'view' }) => {
    const [searchText, setSearchText] = useState({});
    const [selectedRows, setSelectedRows] = useState([]);
    const navigate = useNavigate();

    // Datos de ejemplo
    const data = [
        {
            codigo: 1,
            nombre: 'Light Blue',
            marca: 'Dolce & Gabbana',
            categoria: 'Cítrico',
            tamaño: 100,
            precio: 99.99,
            stock: 15,
            descripcion: 'lalalalalalalalalalalalallaa',
            imagen: 'url-imagen-1'
        },
    ];

    const handleAction = (record) => {
        showLoading(record);
    };



    const [idProducto, setProducto] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(true);

    const showLoading = () => {
        setOpen(true);
        setLoading(true);

        // Simple loading mock. You should add cleanup logic in real world.
        setTimeout(() => {
            setLoading(false);
            setProducto( data );
            //consultar a la API y cargar los datos con setProducto
        }, 2000);
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
            dataIndex: 'tamaño',
            key: 'tamaño',
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
                            icon={<EyeOutlined />}
                            onClick={() => handleAction(record, 'view')}
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Card>
                <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
                    <h2>Ver producto</h2>
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
                />
            </Card>

            <Modal
                width={"80%"}
                loading={loading}
                open={open}
                onCancel={() => setOpen(false)}
            >
                <ViewPerfume perfume={idProducto}/>
            </Modal>
        </>
    );
};

export default PerfumeTable;