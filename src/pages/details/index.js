import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import TableHeader from "../../components/DataTable/TableHeader";
import Items from "../../components/items";
import NavBar from "../../components/Navbar";
import { useStateValue } from "../../contextAPI/StateProvider";
import useFullPageLoader from "../../hooks/useFullPageLoader";
import { headers } from "../../utils";

function Details() {
  const [{ details }, dispatch] = useStateValue();
  const [players, setPlayers] = useState([]);
  const [loader, showLoader, hideLoader] = useFullPageLoader();

  useEffect(() => {
    showLoader();
    axios.get(`https://mach-eight.uc.r.appspot.com/`).then((res) => {
      hideLoader();
      setPlayers(res.data.values);
    });
  }, []);
  const playersData = useMemo(() => {
    let computedPlayers = players;
    showLoader();
    computedPlayers = computedPlayers.filter((player) =>
      player.h_in.match(details[0].inches)
    );
    hideLoader();
    return computedPlayers;
  }, [players]);
  return (
    <div>
      <NavBar details />
      <table className="table table-striped">
        <TableHeader headers={headers} />
        <tbody>
          {details.map((player, idx) => (
            <Items
              name={player.name}
              lastname={player.lastname}
              meters={player.meters}
              inches={player.inches}
              idx={idx}
              key={idx}
            />
          ))}
        </tbody>
      </table>

      <h2>Matches inches</h2>
      <table className="table table-striped">
        <TableHeader headers={headers} />
        <tbody>
          {playersData.map((player, idx) => (
            <Items
              name={player.first_name}
              lastname={player.last_name}
              meters={player.h_meters}
              inches={player.h_in}
              idx={idx}
              key={idx}
            />
          ))}
        </tbody>
      </table>
      {loader}
    </div>
  );
}

export default Details;
