import React, { useEffect, useState } from 'react';
import { Card, Descriptions, Image, Button } from 'antd';
import { useParams } from 'react-router-dom';


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

const PerfumeDetail = ({perfume}) => {
  const perfumeData = perfume[0] ;


  return (
    <>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: 24 }}>

        <Card title="Detalles del Perfume">
          <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
            <Image
              src={perfumeData.imagen}
              alt={perfumeData.nombre}
              style={{ width: 200, height: 200, objectFit: 'cover' }}
            />

            <Descriptions column={1}>
              <Descriptions.Item label="Codigo">{perfumeData.codigo}</Descriptions.Item>
              <Descriptions.Item label="Nombre">{perfumeData.nombre}</Descriptions.Item>
              <Descriptions.Item label="Marca">{perfumeData.marca}</Descriptions.Item>
              <Descriptions.Item label="Categoría">{perfumeData.categoria}</Descriptions.Item>
              <Descriptions.Item label="Tamaño">{perfumeData.tamaño} ml</Descriptions.Item>
              <Descriptions.Item label="Precio">${perfumeData.precio.toFixed(2)}</Descriptions.Item>
              <Descriptions.Item label="Stock">{perfumeData.stock} unidades</Descriptions.Item>
            </Descriptions>
          </div>

          <Card type="inner" title="Descripción">
            {perfumeData.descripcion}
          </Card>
        </Card>
      </div>
    </>
  );
};

export default PerfumeDetail;