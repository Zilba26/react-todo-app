import { FC } from "react";
import "./LocalStorageView.css";
import {
  addCategory,
  deleteAllCategories,
  getCategories,
  getEvents,
} from "../LocalStorage";
import { Event } from "../models/Event";
import { Category } from "../models/Category";
import { Box, Button, Input } from "@chakra-ui/react";

interface LocalStorageViewProps {}

const LocalStorageView: FC<LocalStorageViewProps> = () => {
  const addCategoryName = () => {
    const name = (document.getElementById("category-name") as HTMLInputElement)
      .value;
    if (name) {
      const category = new Category(1, name, "#000000");
      addCategory(category);
      window.location.reload();
    }
  };

  const deleteAll = () => {
    deleteAllCategories();
    window.location.reload();
  };

  return (
    <Box className="LocalStorageView">
      <Box>
        {getEvents().map((task: Event) => (
          <Box>
            <Box>{task.name}</Box>
          </Box>
        ))}
      </Box>
      <Box>
        <Input type="text" id="category-name"></Input>
        <Button onClick={addCategoryName}>add</Button>
        <Button onClick={deleteAll}>clear</Button>
        {getCategories().map((category: Category) => (
          <Box>
            <Box>{category.name}</Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default LocalStorageView;
