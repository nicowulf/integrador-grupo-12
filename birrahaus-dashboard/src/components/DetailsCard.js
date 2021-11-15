import React from 'react';
import PropTypes from 'prop-types';

function ProductsCard(props){
    return (
      <div className="col-md-4 mb-4">
        <div className={`card border-left-${props.color} shadow h-100 py-2`}>
          <div className="card-body">
            <div className="row no-gutters align-items-center">
              <div className="col mr-2">
                <div
                  className={`text-xs font-weight-bold text-${props.color} text-uppercase mb-1`}
                >
                  {" "}
                  {props.title}
                </div>
                <div className="p mb-0 font-weight-bold text-dark-800">
                  <p> Cantidad {props.quantity} </p>
                </div>
              </div>
              <div className="col-auto">
                <i className={`${props.icon} fa-2x text-gray-300`}></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}


ProductsCard.defaultProps = {
  title: "No Title",
  color: "No color",
  quantity: 0,
  icon: "No icon",
};


ProductsCard.propTypes = {
  atritutes: PropTypes.shape({
    title: PropTypes.string.isRequired,
    quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    icon: PropTypes.string.isRequired,
  }),
};



export default ProductsCard;