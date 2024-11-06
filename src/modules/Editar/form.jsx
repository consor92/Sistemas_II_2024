import React, { useState, useEffect } from 'react';
import { useParams , useNavigate } from 'react-router-dom';
import { Form, Input, Button, Card, Upload, Select, InputNumber, Typography, message, theme } from 'antd';
import { UploadOutlined, InboxOutlined, ArrowLeftOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const AddPerfumeForm = () => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    // Simulación de llamada a la API para obtener los datos del perfume
    const perfumeData = {
      name: 'Light Blue',
      marca: 'Dolce & Gabbana',
      categoria: 'citrico',
      tamaño: 100,
      precio: 99.99,
      stock: 15,
      descripcion: 'Una fragancia fresca y ligera...',
      imagen: [] // Aquí iría la imagen cargada
    };

    // Establece los valores del formulario con los datos del perfume
    form.setFieldsValue(perfumeData);
  }, [form, id]);

  const onFinish = (values) => {
    console.log('Received values:', values);
    message.success('Perfume agregado exitosamente!');
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
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
            <Form.Item
              label="Imagen del Perfume"
              name="imagen"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              rules={[{ required: true, message: 'Por favor sube una imagen' }]}
            >
              <Upload.Dragger
                name="files"
                action="/upload.do"
                multiple={false}
                listType="picture-card"
                maxCount={1}
                style={{ height: '200px' }}
                beforeUpload={(file) => {
                  const isImage = file.type.startsWith('image/');
                  if (!isImage) {
                    message.error('Solo puedes subir archivos de imagen!');
                  }
                  return isImage || Upload.LIST_IGNORE;
                }}
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Haz clic o arrastra una imagen aquí
                </p>
              </Upload.Dragger>
            </Form.Item>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <Form.Item
                label="Nombre del Perfume"
                name="name"
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
                name="tamaño"
                rules={[{ required: true, message: 'Por favor ingresa el tamaño' }]}
              >
                <InputNumber
                  min={1}
                  max={1000}
                  style={{ width: '100%' }}
                  placeholder="100"
                />
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
