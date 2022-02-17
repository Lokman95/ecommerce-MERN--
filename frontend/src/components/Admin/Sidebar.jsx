import React from "react";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ViewAgendaIcon from "@material-ui/icons/ViewAgenda";
import AddBoxIcon from "@material-ui/icons/AddBox";
import styled from "styled-components";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PersonIcon from "@mui/icons-material/Person";
import VisibilityIcon from "@mui/icons-material/Visibility";

const SidebarContainer = styled.div`
  width: 230px;
  height: 100vh;
  background-color: #412cb6;
  flex-direction: column;
  display: flex;
`;

const Dashboard = styled.div`
  padding: 15px;
  font-size: 30px;
  font-weight: 700;
  margin-left: 15px;
  color: #0a032c;
  display: flex;
  align-items: center;
`;

const StyledLink = styled(Link)`
  color: #000000;
  text-decoration: none;
  padding: 15px;
  margin-left: 20px;
  font-weight: 700;
  display: flex;
  align-items: center;
  width: 170px;
  position: relative;
  &:hover {
    background-color: #01013a;
    color: #ffffff;
    transition: 0.6s all ease;
    transform: scale(1.1);
  }
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <Link
        to="/admin/dashboard"
        style={{ textDecoration: "none", color: "white" }}
      >
        <Dashboard>
          <DashboardIcon />
          Dashboard
        </Dashboard>
      </Link>
      <StyledLink to="/admin/products">
        <ViewAgendaIcon />
        All Products
      </StyledLink>
      <StyledLink to="/admin/product">
        <AddBoxIcon />
        Create Product
      </StyledLink>
      <StyledLink to="/admin/orders">
        <ListAltIcon />
        Orders
      </StyledLink>
      <StyledLink to="/admin/users">
        <PersonIcon />
        Users
      </StyledLink>
      <StyledLink to="/admin/reviews">
        <VisibilityIcon />
        Reviews
      </StyledLink>
    </SidebarContainer>
  );
};

export default Sidebar;
