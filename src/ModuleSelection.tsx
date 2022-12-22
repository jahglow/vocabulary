import React from "react";
import { JsonData } from "./types";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox";

interface Props {
  modules: Pick<JsonData, "id" | "name">[];
  selectedModules: string[];
  onModuleToggle: (moduleId: string) => () => void;
}

const ModuleSelection: React.FC<Props> = ({
  modules,
  selectedModules,
  onModuleToggle,
}) => (
  <List>
    {modules.map((module) => (
      <ListItem key={module.id} button onClick={onModuleToggle(module.id)}>
        <ListItemText primary={module.name} />
        <ListItemSecondaryAction>
          <Checkbox
            edge="end"
            onChange={onModuleToggle(module.id)}
            checked={selectedModules.includes(module.id)}
          />
        </ListItemSecondaryAction>
      </ListItem>
    ))}
  </List>
);

export default ModuleSelection;
