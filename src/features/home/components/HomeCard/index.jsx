import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import './style.scss';
import { Link } from 'react-router-dom';

HomeCard.propTypes = {
  data: PropTypes.object,
};

function HomeCard({ data = {} }) {
  return (
    <Card className="card-normal">
      <Card.Body className="card-normal-body">
        <Card.Title as="h4" className="card-normal__title">
          {data.title}
        </Card.Title>
      </Card.Body>
      <div className="card-normal__thumb" variant="top">
        <img src={data.thumb} alt="" />
      </div>
      <Link className="card-normal__overlay" to={data.url} />
    </Card>
  );
}

export default HomeCard;
