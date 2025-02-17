import React from "react";
import { AppBar, Toolbar, Box } from "@mui/material";
import Logo from "./shared/Logo";
import { useAuth } from "../context/AuthContext";
import NavigationLink from "./shared/NavigationLink";

const Header = () => {
  const auth = useAuth();

  return (
    <AppBar sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
        <Logo />
        <Box sx={{ display: "flex", gap: 3 }}>
          {auth?.isLoggedIn ? (
            <>
              <NavigationLink
                bg="#d4f1ff"
                to="/chat"
                text="Go to Chat"
                textColor="black" 
              />
              <NavigationLink
                bg="#99e6ff" 
                to="/"
                text="Logout"
                textColor="black" 
                onclick={auth.logout}
              />
            </>
          ) : (
            <>
              <NavigationLink
                bg="#d4f1ff" 
                to="/login"
                text="Login"
                textColor="black" 
              />
              <NavigationLink
                bg="#b3e5fc" 
                to="/signup"
                text="Signup"
                textColor="black"
              />
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
