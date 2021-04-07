import React, { useState } from "react";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

function TableHeader({ headers, onSorting }) {
  const [sortingField, setSortingField] = useState("");
  const [sortingOrder, setSortingOrder] = useState("asc");
  const onSortingChange = (field) => {
    const order =
      field === sortingField && sortingOrder === "asc" ? "desc" : "asc";

    setSortingField(field);
    setSortingOrder(order);
    onSorting(field, order);
  };
  return (
    <thead>
      <tr>
        {headers.map(({ name, field, sortable }) => (
          <th
            key={field}
            onClick={() => (sortable ? onSortingChange(field) : null)}
            style={{ cursor: "pointer" }}
          >
            {name}
            {sortingField &&
              sortingField === field &&
              (sortingOrder === "asc" ? (
                <ExpandMoreIcon />
              ) : (
                <ExpandLessIcon />
              ))}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default TableHeader;
