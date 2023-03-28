import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import { LinkContainer } from "react-router-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout } from "../auth/Firebase";
import { ToastContainer } from "react-toastify";

const Layout = () => {
  const [user] = useAuthState(auth);
  return (
    <Container fluid>
      <Row>
       

<ToastContainer/>
        <Navbar bg="dark" variant="dark">
          <Container className="justify-content-end">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="pt-3 pb-3 col-12">
                <LinkContainer to="/">
                  <Nav.Link>Home</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/countries">
                  <Nav.Link>Countries</Nav.Link>
                </LinkContainer>

                <LinkContainer to="/favourite">
                  <Nav.Link>Favourite</Nav.Link>
                </LinkContainer>
                
              </Nav>
            </Navbar.Collapse>
            <div className="text-white">
              {user ? (
                <>
                  Hello : {user.displayName} ||{" "}
                  <Nav.Link onClick={logout}>Logout</Nav.Link>
                </>
              ) : (
                <>
                  <>
                    <LinkContainer to="/register">
                      <Nav.Link>Create Account</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/login">
                      <Nav.Link>Login</Nav.Link>
                    </LinkContainer>
                  </>
                </>
              )}
            </div>
          </Container>
        </Navbar>
      </Row>
      <Row>

        <Outlet ></Outlet>
      </Row>
    </Container>
  );
};

export default Layout;
