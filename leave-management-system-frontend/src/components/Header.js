import "../styles/Header.css";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (localStorage.getItem("user") !== null) {
      localStorage.removeItem("user");
      navigate("/");
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar
          className="appbar"
          style={{
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h4">Leave Management System</Typography>

          <Button
            variant="h4"
            style={{ fontSize: "16px", flexDirection: "row" }}
            onClick={handleLogout}
          >
            {" "}
            Logout
          </Button>
        </Toolbar>
        <Toolbar
          sx={{ minHeight: "64px", backgroundColor: "rgb(92, 160, 185)" }}
        >
          <Button variant="h6" component={Link} to="/user/leave-info">
            Leaves Info
          </Button>
          <Button variant="h6" component={Link} to="/user/leave-history">
            Leave History
          </Button>
          <Button variant="h6" component={Link} to="/user/request-leave">
            Request Leave
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;
