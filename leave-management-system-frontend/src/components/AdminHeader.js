import "../styles/Header.css";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function AdminHeader() {
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
        <Toolbar className="appbar" style={{ justifyContent: "space-between" }}>
          <Typography variant="h4">Leave Management System</Typography>
          {/* <div
            style={{
              marginLeft: "940px",
              marginTop: "10px",
            }}
          > */}
          <Button
            variant="h4"
            style={{ fontSize: "16px", flexDirection: "row" }}
            onClick={handleLogout}
          >
            {" "}
            Logout
          </Button>
          {/* </div> */}
        </Toolbar>
      </AppBar>
    </>
  );
}

export default AdminHeader;
