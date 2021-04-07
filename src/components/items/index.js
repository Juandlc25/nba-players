import React from "react";
import { useHistory } from "react-router";
import { useStateValue } from "../../contextAPI/StateProvider";

function Items({ name, lastname, meters, inches, idx, details }) {
  const [{}, dispatch] = useStateValue();
  const history = useHistory();
  const addDetails = () => {
    if (details) {
      dispatch({
        type: "ADD_TO_DETAILS",
        item: {
          name,
          lastname,
          meters,
          inches,
        },
      });
    }

    if (details) history.push("/details");
  };
  return (
    <tr key={idx} onClick={addDetails} style={{ cursor: "pointer" }}>
      <th scope="row" key={idx}>
        {idx + 1}
      </th>
      <td>{name}</td>
      <td>{lastname}</td>
      <td>{meters}</td>
      <td>{inches}</td>
    </tr>
  );
}

export default Items;
