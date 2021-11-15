import React from "react";

function UsersCard({data}) {
    return (
      <div className="card m-2 p-2" style={{ width: `${18}rem` }}>
        <img
          className="card-img-top"
          src={data.avatar}
          alt={`Imagen de ${data.first_name}`}
        />
        <div className="card-body">
          <h5 className="card-title">
            {data.first_name} {data.last_name}
          </h5>
          <p className="card-text">{data.email}</p>
          <a href={data.detail} className="btn btn-dark">
            Detalle
          </a>
        </div>
      </div>
    );
}

/* DEFINICIÓN DE PROPIEDADES POR DEFAULT */

UsersCard.defaultProps = {
    first_name: "No first name",
    last_name: "No last name",
    email: "No email",
    avatar: "No avatar"
};

export default UsersCard;
