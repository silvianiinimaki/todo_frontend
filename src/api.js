import React, { useEffect } from "react";

const axios = require("axios");

const Api = () => {
  const [list, setList] = React.useState([]);
  useEffect(() => {
    axios
      .get("https://tamk-4a00ez62-3002-group20-old.herokuapp.com/api")
      .then(function (response) {
        setList(response.data);
      })
      .catch((err) => console.log(err));
  });
  return (
    <div>
      <p>{list}</p>
    </div>
  );
};
export default Api;
