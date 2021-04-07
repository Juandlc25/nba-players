import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import Pagination from "../../components/DataTable/Pagination";
import TableHeader from "../../components/DataTable/TableHeader";
import Items from "../../components/items";
import Navbar from "../../components/Navbar";
import useFullPageLoader from "../../hooks/useFullPageLoader";
import { headers } from "../../utils";

function Main() {
  const [players, setPlayers] = useState([]);
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState({ field: "", order: "" });

  const ITEMS_PER_PAGE = 50;

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
      computedPlayers = computedPlayers.filter(
        (player) =>
          player.first_name.toLowerCase().includes(search.toLowerCase()) ||
          player.last_name.toLowerCase().includes(search.toLowerCase())
      );
    }
    setTotalItems(computedPlayers.length);
    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedPlayers = computedPlayers.sort(
        (a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field])
      );
    }
    return computedPlayers.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [players, currentPage, search, sorting]);
  return (
    <div>
      <Navbar
        home
        onSearch={(value) => {
          setSearch(value);
          setCurrentPage(1);
        }}
      />
      <div className="row w-100">
        <div className="col mb-3 col-12 text-center">
          <div className="row">
            <div className="col-md-12">
              <Pagination
                total={totalItems}
                itemsPerPage={ITEMS_PER_PAGE}
                currentPage={currentPage}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          </div>

          <table className="table table-striped">
            <TableHeader
              headers={headers}
              onSorting={(field, order) => setSorting({ field, order })}
            />
            <tbody>
              {playersData.map((player, idx) => (
                <Items
                  name={player.first_name}
                  lastname={player.last_name}
                  meters={player.h_meters}
                  inches={player.h_in}
                  idx={idx}
                  key={idx}
                  details
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {loader}
    </div>
  );
}

export default Main;
