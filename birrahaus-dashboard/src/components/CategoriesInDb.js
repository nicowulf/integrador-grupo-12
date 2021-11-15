import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import StylesBox from "./StylesBox";



function CategoriesInDb() {

  const [stylesInDB, setStylesInDB] = useState([]);
  
  
  useEffect(() => {
    
    const getStyles = async () => {
      let results = await axios.get("http://localhost:3000/api/products");
      let styles = results.data.meta.countByCategory;
      // let styles = newArr.map( prod => {
      //   return prod.style;
      // });
      // let filterStyles = styles.filter((style, position, styles) => {
      //   return position == styles.indexOf(style);
      // });
        
      
      setStylesInDB(styles);
      
    };

    getStyles();
    
  }, []);




  return (
    <div className="col-lg-6 mb-4">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h5 className="m-0 font-weight-bold text-gray-800">
            Variedades en DB
          </h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="card-body">
              {Object.entries(stylesInDB).map((style, i) => {
                return <StylesBox data={style} key={i} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoriesInDb;
