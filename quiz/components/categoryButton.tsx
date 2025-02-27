"use client";
import { GENRES } from "@/config/genres";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import { button as buttonStyles } from "@heroui/theme";
import { useState } from "react";

export let category = "";
export default function CategoryButton() {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleClick = (Mycategory: string) => {
    setSelectedCategory(Mycategory);
    category = selectedCategory;
  };
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant="bordered"
          className={buttonStyles({
            class: "rounded-full bg-accent mt-2 p-5",
          })}
        >
          Select Category
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Static Actions"
        className="max-h-60 overflow-y-auto w-75"
      >
        {GENRES.category.map((item) => (
          <DropdownItem
            key={item.id}
            onPress={() => handleClick(item.id)}
          >{`${item.name}`}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
