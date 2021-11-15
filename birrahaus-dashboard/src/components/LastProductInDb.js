import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
//import imagenFondo from "../assets/images/product-1633643083816.png";

function LastProductInDb() {
  const [lastProductDescription, setLastProductDescription] = useState([]);
  const [lastProductImage, setLastProductImage] = useState([]);
  const [lastProductBrand, setLastProductBrand] = useState([]);
  const [lastProductStyle, setLastProductStyle] = useState([]);
  const [lastProductPrice, setLastProductPrice] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      let resultados = await axios.get('http://localhost:3000/api/products');
      let lastProduct = resultados.data.data.products;
      //console.log(lastProduct);
        setLastProductDescription(
           lastProduct[lastProduct.length - 1].description
         );
        setLastProductImage(lastProduct[lastProduct.length - 1].image);
        setLastProductBrand(lastProduct[lastProduct.length - 1].brand);
        setLastProductStyle(lastProduct[lastProduct.length - 1].style);
        setLastProductPrice(lastProduct[lastProduct.length - 1].price);

    };

    fetchData();
  }, []);

  return (
    <div className="col-lg-6 mb-4">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h5 className="m-0 font-weight-bold text-gray-800">
            Último Producto en DB
          </h5>
        </div>
        <div className="card-body">
          <div className="text-center">
            <img
              className="img-fluid px-3 px-sm-4 mt-3 mb-4"
              style={{ width: 40 + "rem", height: 30 + "rem" }}
              src={`${lastProductImage}`}
              alt={`${lastProductImage}`}
            />
          </div>
          <h3>{lastProductBrand}</h3>
          <h4>{lastProductStyle}</h4>
          <p>{`${lastProductDescription}`}</p>
          <h4>{lastProductPrice}</h4>
          <a className="btn btn-dark" target="_blank" rel="nofollow" href="/">
            Detalle
          </a>
        </div>
      </div>
    </div>
  );
}

export default LastProductInDb;
