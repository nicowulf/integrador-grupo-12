import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import UsersCard from "./UsersCard";

function ContentRowUsers() {
  const [usersInDB, setUsersInDB] = useState([]);

  useEffect(() => {
    const allUsers = async () => {
      let results = await axios.get("http://localhost:3000/api/users");
      
      setUsersInDB(results.data.data.users);
    };

    allUsers();
    
  }, []);
  
    return (
      <section className="usenInDB">
        <h3 className="">Usuarios en la DB</h3>
        <div className="d-flex flex-wrap justify-content-between">
          {usersInDB.map((user, i) => {
            return <UsersCard data={user} key={user.id} />;
          })}
        </div>
      </section>
    );
}

export default ContentRowUsers;