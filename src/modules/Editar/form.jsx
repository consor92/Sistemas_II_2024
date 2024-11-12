import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Card, Upload, Select, InputNumber, Typography, message, theme } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

const apiUrl = import.meta.env.VITE_API_URL;

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const AddPerfumeForm = () => {
  const [form] = Form.useForm();
  const { codigo } = useParams();
  const navigate = useNavigate();

  const { token: { colorBgContainer }, } = theme.useToken();
  const [data, setProducto] = React.useState(null);

  useEffect(() => {
    fetch(`${apiUrl}/codigo/${codigo}`, {
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      },
    })
      .then((res) => res.json())
      .then((dat) => { setProducto(dat); form.setFieldsValue(dat); })
  }, [])


  const onFinish = async (values) => {
    try {
      const response = await fetch(`${apiUrl}/${data._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      message.success('Perfume editado exitosamente!');
      navigate(-1);

    } catch (error) {
      message.error('No se ah podido editar.');
    }
  };


  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px',
      background: colorBgContainer,
    }}>

      <Title level={3} style={{
        textAlign: 'center',
        margin: '0 0 20px 0',
        flex: '0 0 auto'
      }}>
        Editar Perfume
      </Title>
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate(-1)}
        style={{ marginBottom: 16 }}
      >
        Volver
      </Button>
      {/* Contenedor con scroll */}
      <div style={{
        flex: '1 1 auto',
        overflow: 'auto',
        padding: '0 20px'
      }}>
        <Card style={{
          maxWidth: '90vh',
          margin: '0 auto',
          marginBottom: '20px'
        }}>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              tamaño: 100,
              stock: 1,
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <Form.Item
                label="Nombre del Perfume"
                name="nombre"
                rules={[{ message: 'Por favor ingresa el nombre' }]}
              >
                <Input placeholder="Ej: Light Blue" />
              </Form.Item>

              <Form.Item
                label="Marca"
                name="marca"
                rules={[{ message: 'Por favor ingresa la marca' }]}
              >
                <Input placeholder="Ej: Dolce & Gabbana" />
              </Form.Item>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <Form.Item
                label="Categoría"
                name="categoria"
                rules={[{ message: 'Por favor selecciona una categoría' }]}
              >
                <Select placeholder="Selecciona una categoría">
                  <Option value="floral">Floral</Option>
                  <Option value="citrico">Cítrico</Option>
                  <Option value="amaderado">Amaderado</Option>
                  <Option value="oriental">Oriental</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Tamaño (ml)"
                name="tamanio"
                rules={[{ message: 'Por favor ingresa el tamaño' }]}
              >
                <InputNumber
                  min={1}
                  max={1000}
                  style={{ width: '100%' }}
                  controls={false}
                  placeholder="100"
                />
              </Form.Item>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <Form.Item
                label="Precio ($)"
                name="precio"
                rules={[]}
              >
                <InputNumber
                  min={0}
                  step={0.01}
                  style={{ width: '100%' }}
                  controls={false}
                  formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/\$\s?|(,*)/g, '')}
                />
              </Form.Item>

              <Form.Item
                label="Stock"
                name="stock"
                rules={[]}
              >
                <InputNumber
                  min={0}
                  style={{ width: '100%' }}
                  placeholder="10"
                  controls={false}
                />
              </Form.Item>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <Form.Item
                label="Codigo"
                name="codigo"
                rules={[]}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  disabled
                  controls={false}
                />
              </Form.Item>
              <Form.Item
                name="_id"
                style={{ display: 'none' }} // Esto oculta el campo visualmente
              >
                <Input
                  type="hidden"
                />
              </Form.Item>

            </div>

            <Form.Item
              label="Descripción"
              name="descripcion"
              rules={[{ message: 'Por favor ingresa una descripción' }]}
            >
              <TextArea
                rows={4}
                placeholder="Describe las notas y características del perfume..."
              />
            </Form.Item>

            <Form.Item style={{ marginBottom: 0 }}>
              <Button type="primary" htmlType="submit" size="large" block>
                Guardar Cambios
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default AddPerfumeForm;
