import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AdminMenu = () => {
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

        <Navbar.Toggle aria-controls="admin-navbar" />
        <Navbar.Collapse id="admin-navbar">
          <Nav className="ms-auto d-flex align-items-center">
            {/* Customer List */}
            <Nav.Link href="/admin-customer-list" className="mx-3 fs-5">Customer List</Nav.Link>

            {/* Category Dropdown */}
            <NavDropdown title="Category" id="category-dropdown" className="mx-3 fs-5">
              <NavDropdown.Item href="/category-add">Category Addition</NavDropdown.Item>
              <NavDropdown.Item href="/admin-category-list">Category List</NavDropdown.Item>
            </NavDropdown>

            {/* Expense Report */}
            <Nav.Link href="/admin-report" className="mx-3 fs-5">Expense Report</Nav.Link>

            {/* Logout */}
            <Nav.Link onClick={handleLogout} className="text-danger fw-bold mx-3 fs-5" style={{ cursor: "pointer" }}>
              Logout
            </Nav.Link>

            {/* Profile mentioning Admin */}
            <Nav.Link className="fw-bold text-warning mx-3 fs-5">Admin</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  );
};

export default AdminMenu;
