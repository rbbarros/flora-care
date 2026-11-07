import { addDays, todayISO } from "./date-utils.js";

const STORAGE_KEY = "floracare.plants.v1";
const ENVIRONMENTS = new Set(["Sol Pleno", "Meia-Sombra", "Sombra"]);

function isValidPlant(plant) {
  return Boolean(
    plant &&
    typeof plant.id === "string" &&
    typeof plant.name === "string" && plant.name.trim().length >= 2 &&
    typeof plant.species === "string" &&
    ENVIRONMENTS.has(plant.environment) &&
    Number.isInteger(plant.intervalDays) && plant.intervalDays > 0 &&
    typeof plant.lastWateredAt === "string" && /^\d{4}-\d{2}-\d{2}$/.test(plant.lastWateredAt) &&
    Array.isArray(plant.wateringHistory) &&
    plant.wateringHistory.every((date) => typeof date === "string")
  );
}

export function loadPlants() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw === null) return [];

  let plants;
  try {
    plants = JSON.parse(raw);
  } catch (error) {
    throw new Error("Os dados salvos estão inválidos. Eles não foram apagados nem alterados.", { cause: error });
  }
  if (!Array.isArray(plants) || !plants.every(isValidPlant)) {
    throw new Error("O formato dos dados salvos não é reconhecido. Eles não foram apagados nem alterados.");
  }
  return plants;
}

export function savePlants(plants) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(plants));
}

export function createPlant({ name, species, environment, intervalDays, needsWater }) {
  const today = todayISO();
  return {
    id: crypto.randomUUID(),
    name: name.trim(),
    species: species.trim(),
    environment,
    intervalDays,
    lastWateredAt: needsWater ? addDays(today, -intervalDays) : today,
    wateringHistory: needsWater ? [] : [today],
  };
}

export function waterPlant(plant) {
  const today = todayISO();
  return {
    ...plant,
    lastWateredAt: today,
    wateringHistory: [...plant.wateringHistory, today],
  };
}

export function nextWateringDate(plant) {
  return addDays(plant.lastWateredAt, plant.intervalDays);
}

export function wateringStatus(plant, today = todayISO()) {
  return today >= nextWateringDate(plant) ? "thirsty" : "hydrated";
}
