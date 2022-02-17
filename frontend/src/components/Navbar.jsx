import { ShoppingCartOutlined } from "@material-ui/icons";
import { Badge } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Link } from "react-router-dom";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import { mobile } from "../responsive";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { useHistory } from "react-router-dom";
import { logout } from "../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";

const Container = styled.div`
  height: 60px;
  background-color: #f1f0ec;
  color: #000000;
  //display: flex;
  //position: fixed;

  ${mobile({ width: 410, height: 55 })}
`;
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

/* End Left Side */

/* Starting Center */
const Center = styled.div`
  flex: 2;
  text-align: center;
`;

/* End Center
 */

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Menu = styled.div`
  cursor: pointer;
  margin-left: 25px;
`;
const MenuCenter = styled.li`
  text-decoration: none;
  list-style: none;
  align-items: center;
  justify-content: space-evenly;
  padding: 8px;
  display: flex;
  margin-left: 340px;
  font-weight: 500;
  font-size: 20px;
  ${mobile({ marginLeft: "5px", flex: 2 })}
`;
const LinkHead = styled(Link)`
  ${mobile({ fontSize: "10px" })}
`;
const LinkMenu = styled(Link)`
  ${mobile({ fontSize: "10px", marginLeft: "5px", flex: 2 })}
`;

const Navbar = () => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);

  const [open, setOpen] = React.useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const actions = [
    { icon: <PersonIcon />, name: "Profile", func: account },
    { icon: <ListAltIcon />, name: "Orders", func: orders },
  ];
  if (user?.role === "admin") {
    actions.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }
  if (isAuthenticated) {
    actions.unshift({
      icon: <ExitToAppIcon />,
      name: "Logout",
      func: logoutUser,
    });
  }
  if (!isAuthenticated) {
    actions.unshift({
      icon: <AccountCircle />,
      name: "Login",
      func: login,
    });
  }

  function dashboard() {
    history.push("/admin/dashboard");
  }
  function orders() {
    history.push("/orders");
  }
  function account() {
    history.push("/account");
  }
  function logoutUser() {
    dispatch(logout());
    history.push("/");
  }
  function login() {
    history.push("/login");
  }

  return (
    <Container>
      <Wrapper>
        <LinkHead
          to={"/"}
          style={{ color: "inherit", textDecoration: "inherit" }}
        >
          <h2 style={{ display: "flex", flex: 1 }}>ESHOP</h2>
        </LinkHead>
        <Center>
          <MenuCenter>
            <LinkMenu
              to={"/"}
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <li>Home</li>
            </LinkMenu>
            <LinkMenu
              to={"/search"}
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <li>Search</li>
            </LinkMenu>
            <LinkMenu
              to={"/products"}
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <li>Product</li>
            </LinkMenu>
            <LinkMenu
              to={"/contact"}
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <li>Contact</li>
            </LinkMenu>
          </MenuCenter>
        </Center>
        <Right>
          <SpeedDial
            ariaLabel="SpeedDial tooltip example"
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            direction="down"
            FabProps={{ size: "small" }}
            style={{
              backgroundColor: "#d1d1d114",
              height: "35px",
              width: "25px",
              color: "#000000",
            }}
            icon={
              (isAuthenticated && (
                <img
                  alt={user.name}
                  style={{
                    borderRadius: "100%",
                    width: "35px",
                    height: "35px",
                  }}
                  src={user.avatar.url ? user.avatar.url : "/profile.png"}
                />
              )) || <AccountCircle />
            }
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={action.func}
              />
            ))}
          </SpeedDial>
          {/*   </Link> */}
          <Menu>
            <Link
              to="/cart"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <Badge badgeContent={cartItems.length} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </Link>
          </Menu>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
