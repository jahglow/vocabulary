import React, { useContext } from "react";
import { AppContext } from "./types";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import ModuleSelection from "./ModuleSelection";
import { AppHeader } from "./AppHeader";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
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
  })
);

const Home: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const { state } = useContext(AppContext);
  const { selectedModules, modules, handleModuleToggle } = state;

  const handleGoClick = () => {
    history.push("/test");
  };

  return (
    <div className={classes.root}>
      <AppHeader />
      <div className={classes.section}>
        <Typography variant="h5" component="h2">
          Modules
        </Typography>
        <ModuleSelection
          modules={modules}
          selectedModules={selectedModules}
          onModuleToggle={handleModuleToggle}
        />
      </div>
      <div className={`${classes.section} ${classes.buttons}`}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => history.push("/word-list")}
          disabled={!selectedModules.length}
        >
          Word List
        </Button>
        <Button
          variant="contained"
          className={classes.button}
          color="primary"
          disabled={!selectedModules.length}
          onClick={handleGoClick}
        >
          Test
        </Button>
      </div>
    </div>
  );
};

export default Home;
