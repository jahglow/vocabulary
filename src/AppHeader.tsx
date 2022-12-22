import React from "react";
import { useHistory } from "react-router-dom";
import {
  AppBar,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import ArrowBack from "@material-ui/icons/ArrowBack";

export const AppHeader = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <AppBar className={classes.appBar} position="static">
      <Toolbar>
        {history.location.pathname !== "/" && (
          <IconButton onClick={() => history.push("/")}>
            <ArrowBack />
          </IconButton>
        )}
        <Typography variant="h6" className={classes.title}>
          Learn English
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(2),
  },
  appBar: {
    backgroundColor: "#f5f5f5",
    color: "#000",
    boxShadow: "none",
    borderBottom: "1px solid #e0e0e0",
  },
  title: {
    flexGrow: 1,
    textAlign: "center",
  },
  section: {
    maxWidth: 400,
    margin: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  buttons: { flexDirection: "row", gap: theme.spacing(2) },
  listItem: {
    padding: theme.spacing(1),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));
