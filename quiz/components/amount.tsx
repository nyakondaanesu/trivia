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

export let globalAmount = 5;
export default function AmountButton() {
  const [selectedCategory, setSelectedCategory] = useState(5);

  const handleClick = (Mycategory: number) => {
    setSelectedCategory(Mycategory);
    console.log(selectedCategory);
    globalAmount = Mycategory;
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
        {GENRES.amount.map((item, index) => (
          <DropdownItem
            key={index}
            onPress={() => handleClick(item)}
          >{`${item}`}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
