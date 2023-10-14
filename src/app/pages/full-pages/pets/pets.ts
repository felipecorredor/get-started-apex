import { Pet } from "./pet";

const petNames: string[] = [
  "Lulu",
  "Buddy",
  "Max",
  "Daisy",
  "Charlie",
  "Bella",
  "Lucy",
  "Rocky",
  "Cooper",
  "Lola",
];

export const PETS: Pet[] = petNames.map((name, index) => ({
  id: index + 1,
  name: name,
  age: Math.floor(Math.random() * 15) + 1,
}));
