import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import DetailsCard from './DetailsCard';

function ContentRowDetails() {
  const [productsInDB, setProductsInDB] = useState([]);
  const [nationalProducts, setNationalProducts] = useState([]);
  const [internationalProducts, setInternationalProducts] = useState([]);
  const [stylesInDB, setStylesInDB] = useState([]);
  const [usersInDB, setUsersInDB] = useState([]);


  useEffect(() => {
    const allProducts = async () => {
      let results = await axios.get("http://localhost:3000/api/products");
      let products = results.data.meta.count;
      setProductsInDB({
        title: "Productos en DB",
        color: "warning",
        quantity: products,
        icon: "fas fa-beer",
      });
    };

    const nationalProducts = async () => {
      let results = await axios.get("http://localhost:3000/api/products");
      let newArr = results.data.data.products;
      let national = newArr.filter(function (prod) {
        return prod.origin == "Argentina"
      })
      setNationalProducts({
        title: "Productos Nacionales",
        color: "warning",
        quantity: national.length,
        icon: "far fa-flag",
      });
    };

    const internationalProducts = async () => {
      let results = await axios.get("http://localhost:3000/api/products");
      let newArr = results.data.data.products;
      let international = newArr.filter(function (prod) {
        return prod.origin !== "Argentina";
      });
      setInternationalProducts({
        title: "Productos Internacionales",
        color: "warning",
        quantity: international.length,
        icon: "fas fa-flag",
      });
    };

    const allUsers = async () => {
      let results = await axios.get("http://localhost:3000/api/users");
      let users = results.data.meta.count;
      setUsersInDB({
        title: "Usuarios en DB",
        color: "success",
        quantity: users,
        icon: "fas fa-users",
      });
    };

    const allStyles = async () => {
      let results = await axios.get("http://localhost:3000/api/products");
      let newArr = results.data.data.products;
      let styles = newArr.map((prod) => {
        return prod.style;
      });
      let filterStyles = styles.filter((style, position, styles) => {
        return position == styles.indexOf(style);
      });

      setStylesInDB({
        title: "Variedades en DB",
        color: "danger",
        quantity: filterStyles.length,
        icon: "fas fa-list-ol",
      });
    };
      
    allProducts();
    nationalProducts();
    internationalProducts();
    allUsers();
    allStyles();

  }, []);

  let cartProps = [
    productsInDB,
    nationalProducts,
    internationalProducts,
    usersInDB,
    stylesInDB,
  ];

  return (
    <div className="row">
      {cartProps.map((product, i) => {
        return <DetailsCard {...product} key={i} />;
      })}
    </div>
  );
}

export default ContentRowDetails;