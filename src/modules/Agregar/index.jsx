import React, { useState, useRef } from 'react';
import {
  Form,
  Input,
  Button,
  Card,
  Upload,
  Select,
  InputNumber,
  Typography,
  message,
  theme
} from 'antd';

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;



const AddPerfumeForm = () => {

  const onFinish = async (values) => {
    console.log('Received values:', values);
    try {
      const response = await fetch(`${window.URL_BASE}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      message.success('Perfume agregado exitosamente!');
      form.setFieldsValue({
        codigo: '',
        nombre: '',
        stock: '',
        precio: '',
        marca: '',
        tamanio: '',
        descripcion: '',
        categoria: ''
      });

    } catch (error) {
      message.error('Codigo de producto existente');
    }
  };

  const [form] = Form.useForm();
  const { token: { colorBgContainer }, } = theme.useToken()

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
        Agregar Nuevo Perfume
      </Title>

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
              size: 100,
              stock: 1,
            }}
          >

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <Form.Item
                label="Nombre del Perfume"
                name="nombre"
                rules={[{ required: true, message: 'Por favor ingresa el nombre' }]}
              >
                <Input placeholder="Ej: Light Blue" />
              </Form.Item>

              <Form.Item
                label="Marca"
                name="marca"
                rules={[{ required: true, message: 'Por favor ingresa la marca' }]}
              >
                <Input placeholder="Ej: Dolce & Gabbana" />
              </Form.Item>
            </div>


            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <Form.Item
                label="Categoría"
                name="categoria"
                rules={[{ required: true, message: 'Por favor selecciona una categoría' }]}
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
                rules={[{ required: true, message: 'Por favor ingresa el tamaño', }]}
              >
                <Input placeholder="100" />
              </Form.Item>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <Form.Item
                label="Precio ($)"
                name="precio"
                rules={[{ required: true, message: 'Por favor ingresa el precio' }]}
              >
                <InputNumber
                  min={0}
                  step={0.01}
                  style={{ width: '100%' }}
                  placeholder="99.99"
                  controls={false}
                  formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/\$\s?|(,*)/g, '')}
                />
              </Form.Item>

              <Form.Item
                label="Stock"
                name="stock"
                rules={[{ required: true, message: 'Por favor ingresa el stock' }]}
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
                rules={[{ required: true, message: 'Por favor ingresa el codigo' }]}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  placeholder="100"
                  controls={false}
                />
              </Form.Item>
            </div>

            <Form.Item
              label="Descripción"
              name="descripcion"
              rules={[{ required: true, message: 'Por favor ingresa una descripción' }]}
            >
              <TextArea
                rows={4}
                placeholder="Describe las notas y características del perfume..."
              />
            </Form.Item>


            <Form.Item style={{ marginBottom: 0 }}>
              <Button type="primary" htmlType="submit" size="large" block>
                Guardar Perfume
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default AddPerfumeForm;