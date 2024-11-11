import React from 'react';
import { Card, Descriptions, Image, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Meta } = Card;

const PerfumeCard = ({ perfume }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/producto/${perfume.codigo}`); // Cambia la ruta según necesites
    };

    return (
        <Card
            hoverable
            style={{ width: '10hv', margin: '10px' }}
            onClick={handleCardClick}
        >

            <Image
                src={perfume.imagen}
                alt={perfume.nombre}
                style={{ width: 200, height: 200, objectFit: 'cover' }}
            />

            <Meta title={perfume.nombre} description={`Precio: $${perfume.precio.toFixed(2)}`} />
        </Card>
    );
};

export default PerfumeCard;
