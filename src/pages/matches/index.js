import React, { useEffect, useMemo, useState } from "react";
import NavBar from "../../components/Navbar";
import { FormControl, Form, Button } from "react-bootstrap";
import useFullPageLoader from "../../hooks/useFullPageLoader";
import axios from "axios";
import Items from "../../components/items";
import TableHeader from "../../components/DataTable/TableHeader";
import { headers } from "../../utils";

function Matches() {
  const [search, setSearch] = useState("");
  const [displayData, setDisplayData] = useState(false);
  const [players, setPlayers] = useState([]);
  const [loader, showLoader, hideLoader] = useFullPageLoader();

  const twoNumerSum = (numbersArray, targetSum) => {
    for (let i = 0; i < numbersArray.length; i++) {
      const firstNumber = numbersArray[i];

      for (let j = 0; j < numbersArray.length; j++) {
        const secondNumber = numbersArray[j];

        if (firstNumber + secondNumber === targetSum) {
          return [firstNumber, secondNumber];
        }
      }
    }

    return [];
  };
  let results = players.map((a) => a.h_in);
  results = results.map((result) => Number(result));

  useEffect(() => {
    showLoader();
    axios.get(`https://mach-eight.uc.r.appspot.com/`).then((res) => {
      hideLoader();
      setPlayers(res.data.values);
    });
  }, []);

  const playersData = useMemo(() => {
    let computedPlayers = players;

    if (search) {
      let numbers = twoNumerSum(results, parseInt(search));
      numbers = numbers.map((number) => number.toString());
      computedPlayers = computedPlayers.filter(
        (player) => player.h_in === numbers[0] || player.h_in === numbers[1]
      );
    }
    hideLoader();
    return computedPlayers;
  }, [players, search]);
  const submit = (e) => {
    e.preventDefault();
    setDisplayData(true);
    showLoader();
    // setSearch("");
  };
  return (
    <div>
      <NavBar matches />
      <div className="d-flex justify-content-center mt-3 mb-3">
        <Form inline onSubmit={submit}>
          <FormControl
            type="text"
            placeholder="Heights in inches"
            className="mr-md-2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button variant="outline-info">Search</Button>
        </Form>
      </div>
      {displayData && (
        <>
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
        </>
      )}
    </div>
  );
}

export default Matches;
