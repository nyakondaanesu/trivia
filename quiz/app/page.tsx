"use client";

import { title, subtitle } from "@/components/primitives";
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
import Link from "next/link";
import StartButton from "@/components/startButton";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("easy");

  const handleDifficulty = (difficulty: string) => {
    setSelectedDifficulty(difficulty);
  };
  const handleCategory = (Mycategory: string) => {
    setSelectedCategory(Mycategory);
  };
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>
          Test Your Knowledge : The Ultimate&nbsp;
        </span>
        <span className={title({ class: "text-accent" })}>Trivia&nbsp;</span>
        <br />
        <span className={title()}>Challenge Awaits!</span>
        <div className={subtitle({ class: "mt-4" })}>
          Fun, and Challenging, Compete, and Learn Something New!
        </div>
      </div>

      <div className="flex gap-2">
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
                onPress={() => handleCategory(item.id)}
              >{`${item.name}`}</DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>

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
                onPress={() => handleDifficulty(item)}
              >{`${item}`}</DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>

      <Link
        className="mt-12"
        href={`/questions?category=${selectedCategory}&amount=${20}&difficulty=${selectedDifficulty}`}
      >
        <StartButton />
      </Link>
    </section>
  );
}
