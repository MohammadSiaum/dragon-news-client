import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


const News = () => {
    const news = useLoaderData();
    const {category_id, title, details, image_url, author, rating } = news
    return (
        <Card>
            <Card.Img variant="top" src={image_url} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{details}</Card.Text>
                <Link to={`/category/${category_id}`}>
                    <Button variant="primary">Go Back this Category</Button>
                </Link>
            </Card.Body>
        </Card>
    );
};

export default News;