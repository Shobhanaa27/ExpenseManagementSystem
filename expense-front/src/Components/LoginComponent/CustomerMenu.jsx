import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CustomerMenu = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/LoginPage"); // Redirect to login page
  };

  return (
    <div
    style={{
      backgroundImage: "url('/images/HomePage.png')",
      backgroundSize: "cover", // Ensures it covers the full screen without stretching
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      height: "100vh",
      width: "100vw",
      display: "flex",
      flexDirection: "column",
    }}
    >
    <Navbar style={{ backgroundColor: "#001F3F" ,height: "80px" }} variant="dark" bg="dark" expand="lg" className="py-3" >
      <Container fluid>
        {/* Left Side - System Name */}
        <Navbar.Brand className="fw-bold fs-4">Expense Management System</Navbar.Brand>

        <Navbar.Toggle aria-controls="customer-navbar" />
        <Navbar.Collapse id="customer-navbar">
          <Nav className="ms-auto d-flex align-items-center">
            {/* Customer Dropdown */}
            <NavDropdown title="Customer" id="customer-dropdown" className="mx-3 fs-5">
              <NavDropdown.Item href="customer-reg">Customer Registration</NavDropdown.Item>
              <NavDropdown.Item href="customerdetails">Customer Details</NavDropdown.Item>
            </NavDropdown>

            {/* Expense Dropdown */}
            <NavDropdown title="Expense" id="expense-dropdown" className="mx-3 fs-5">
              <NavDropdown.Item href="Expense-entry">Expense Entry</NavDropdown.Item>
              <NavDropdown.Item href="/expenseListCust">Expense List</NavDropdown.Item>
              <NavDropdown.Item href="customer-category-list">Category List</NavDropdown.Item>
              <NavDropdown.Item href="/Expense-bar-chart">Expense Report</NavDropdown.Item>
            </NavDropdown>

            {/* Logout */}
            <Nav.Link onClick={handleLogout} className="text-danger fw-bold mx-3 fs-5" style={{ cursor: "pointer" }}>
              Logout
            </Nav.Link>

            {/* Profile mentioning Customer */}
            <Nav.Link className="fw-bold text-warning mx-3 fs-5">Customer</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  );
};

export default CustomerMenu;
