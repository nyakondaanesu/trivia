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
export let globalDifficulty = "";
export default function DifficultyButton() {
  const [selectedDifficulty, setSelectedDifficulty] = useState("");

  const handleClick = (difficulty: string) => {
    setSelectedDifficulty(difficulty);
    globalDifficulty = selectedDifficulty;
  };
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant="bordered"
          className={buttonStyles({
            class: "rounded-full mt-2 p-5",
          })}
        >
          Select Diffuculty
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Static Actions"
        className="max-h-60 overflow-y-auto w-75"
      >
        {GENRES.difficulty.map((item) => (
          <DropdownItem
            key={item}
            onPress={() => handleClick(item)}
          >{`${item}`}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
