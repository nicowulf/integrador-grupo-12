import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import ChartRow from './ChartRow';


function Chart (){

    const [productsInDB, setProductsInDB] = useState([]);

    useEffect(() => {
      const allProducts = async () => {
        let results = await axios.get("http://localhost:3000/api/products");
        let products = results.data.data.products;
       
        setProductsInDB(products);
      };

      allProducts();
      
    }, []);




    return (
      /* <!-- DataTales Example --> */
      <div className="card shadow mb-4">
        <div className="card-body">
          <div className="table-responsive">
            <table
              className="table table-bordered"
              id="dataTable"
              width="100%"
              cellSpacing="0"
            >
              <thead>
                <tr>
                  <th>Marca</th>
                  <th>Variedad</th>
                  <th>Origen</th>
                  <th>Descripción</th>
                  <th>Detalle</th>
                </tr>
              </thead>
              <tbody>
                {productsInDB.map((row, i) => {
                  return <ChartRow {...row} key={i} />;
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
}

export default Chart;