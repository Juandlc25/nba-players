import React, { useState } from "react";
import { Navbar, Nav, FormControl, Form, Button } from "react-bootstrap";

function NavBar({ home, details, matches, onSearch }) {
  const [search, setSearch] = useState("");
  const onInputChange = (value) => {
    setSearch(value);
    onSearch(value);
  };
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">MACH EIGHT</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link className={`${home && "active"}`} href="/">
          Home
        </Nav.Link>
        <Nav.Link className={`${details && "active"}`}>Details</Nav.Link>
        <Nav.Link className={`${matches && "active"}`} href="/matches">
          Matches
        </Nav.Link>
      </Nav>
      {home && (
        <Form inline>
          <FormControl
            type="text"
            placeholder="Search for name or last"
            className="mr-sm-2"
            value={search}
            onChange={(e) => onInputChange(e.target.value)}
          />
          <Button variant="outline-info">Search</Button>
        </Form>
      )}
    </Navbar>
  );
}

export default NavBar;
