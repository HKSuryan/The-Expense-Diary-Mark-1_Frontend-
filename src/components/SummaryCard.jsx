import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../css/SummaryCard.css';

const SummaryCard = ({ transactions }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="transaction-slider">
      <Slider {...settings}>
        {transactions.map((transaction, index) => (
          <div className={`card ${transaction.direction === 'in' ? 'in' : 'out'}`} key={index}>
            <h3 className="transaction-name">{transaction["name"]}</h3>
            <p className="transaction-amount"><strong>Amount:</strong> {transaction.amount}</p>
            <p className="transaction-mode"><strong>Payment Mode:</strong> {transaction['paymentMode']}</p>
            <p className="transaction-date"><strong>Date:</strong> {transaction.date}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SummaryCard;
