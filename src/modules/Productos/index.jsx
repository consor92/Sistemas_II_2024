import React from 'react';
import { Row, Col } from 'antd';
import PerfumeCard from './tarjeta'; // Asegúrate de que la ruta sea correcta

const ListadoDePerfumes = [
    {
        codigo: 1,
        nombre: 'Light Blue',
        marca: 'Dolce & Gabbana',
        categoria: 'Cítrico',
        tamaño: 10,
        precio: 99.99,
        stock: 15,
        image: 'url-imagen-1',
    },
    {
        codigo: 2,
        nombre: 'Black Opium',
        marca: 'Yves Saint Laurent',
        categoria: 'Floral',
        tamaño: 20,
        precio: 109.99,
        stock: 20,
        imagen: 'url-imagen-2',
    },
    ,
    {
        codigo: 3,
        nombre: 'Black Opium',
        marca: 'Yves Saint Laurent',
        categoria: 'Floral',
        tamaño: 30,
        precio: 109.99,
        stock: 20,
        imagen: 'url-imagen-2',
    },
    ,
    {
        codigo: 4,
        nombre: 'Black Opium',
        marca: 'Yves Saint Laurent',
        categoria: 'Floral',
        tamaño: 40,
        precio: 109.99,
        stock: 20,
        imagen: 'url-imagen-2',
    },
    ,
    {
        codigo: 5,
        nombre: 'Black Opium',
        marca: 'Yves Saint Laurent',
        categoria: 'Floral',
        tamaño: 50,
        precio: 109.99,
        stock: 20,
        imagen: 'url-imagen-2',
    },
    // Agrega más productos aquí...
];

const PerfumeList = () => {
    return (
        <div style={{ padding: '20px' }}>
            <h1>Listado de Perfumes</h1>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32, xl: 40 }}>
                {ListadoDePerfumes.map((perfume) => (
                    <Col span={6} key={perfume.codigo}> {/* 6 para 4 columnas en total */}
                        <PerfumeCard perfume={perfume} />
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default PerfumeList;
