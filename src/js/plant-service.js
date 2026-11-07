import { addDays, isISODate, todayISO } from "./date-utils.js";

export const STORAGE_KEY = "floracare.plants.v1";
export const GARDEN_SCHEMA = "floracare.garden";
export const GARDEN_VERSION = 1;
export const ENVIRONMENTS = Object.freeze(["Sol Pleno", "Meia-Sombra", "Sombra"]);

const ENVIRONMENT_SET = new Set(ENVIRONMENTS);

function requireStorage(storage) {
  const target = storage ?? globalThis.localStorage;
  if (!target) {
    throw new Error("Armazenamento local indisponível neste ambiente.");
  }
  return target;
}

export function isValidPlant(plant) {
  return Boolean(
    plant &&
    typeof plant.id === "string" && plant.id.length > 0 &&
    typeof plant.name === "string" && plant.name.trim().length >= 2 &&
    typeof plant.species === "string" &&
    ENVIRONMENT_SET.has(plant.environment) &&
    Number.isInteger(plant.intervalDays) && plant.intervalDays > 0 &&
    isISODate(plant.lastWateredAt) &&
    Array.isArray(plant.wateringHistory) &&
    plant.wateringHistory.every(isISODate)
  );
}

export function validatePlantInput({ name, intervalDays } = {}) {
  if (typeof name !== "string" || name.trim().length < 2) {
    return "Informe um nome com pelo menos 2 caracteres.";
  }
  if (!Number.isInteger(intervalDays) || intervalDays < 1) {
    return "O intervalo de rega deve ser um número inteiro de pelo menos 1 dia.";
  }
  return null;
}

export function loadPlants(storage) {
  const raw = requireStorage(storage).getItem(STORAGE_KEY);
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

export function savePlants(plants, storage) {
  if (!Array.isArray(plants) || !plants.every(isValidPlant)) {
    throw new Error("Não é possível salvar um jardim com dados inválidos.");
  }
  requireStorage(storage).setItem(STORAGE_KEY, JSON.stringify(plants));
}

export function createPlant(
  { name, species = "", environment, intervalDays, needsWater = false },
  today = todayISO()
) {
  const error = validatePlantInput({ name, intervalDays });
  if (error) throw new Error(error);
  if (!ENVIRONMENT_SET.has(environment)) {
    throw new Error("Ambiente inválido. Use Sol Pleno, Meia-Sombra ou Sombra.");
  }

  return {
    id: crypto.randomUUID(),
    name: name.trim(),
    species: typeof species === "string" ? species.trim() : "",
    environment,
    intervalDays,
    lastWateredAt: needsWater ? addDays(today, -intervalDays) : today,
    wateringHistory: needsWater ? [] : [today],
  };
}

export function updatePlant(plant, values) {
  const next = { ...plant, ...values };
  const error = validatePlantInput({ name: next.name, intervalDays: next.intervalDays });
  if (error) throw new Error(error);
  if (!ENVIRONMENT_SET.has(next.environment)) {
    throw new Error("Ambiente inválido. Use Sol Pleno, Meia-Sombra ou Sombra.");
  }
  return {
    ...next,
    name: next.name.trim(),
    species: typeof next.species === "string" ? next.species.trim() : "",
  };
}

export function removePlant(plants, id) {
  return plants.filter((plant) => plant.id !== id);
}

export function waterPlant(plant, today = todayISO()) {
  const alreadyRegisteredToday = plant.wateringHistory.at(-1) === today;
  return {
    ...plant,
    lastWateredAt: today,
    wateringHistory: alreadyRegisteredToday
      ? plant.wateringHistory
      : [...plant.wateringHistory, today],
  };
}

export function nextWateringDate(plant) {
  return addDays(plant.lastWateredAt, plant.intervalDays);
}

export function wateringStatus(plant, today = todayISO()) {
  return today >= nextWateringDate(plant) ? "thirsty" : "hydrated";
}

export function filterPlants(plants, { status = "all", environment = "all" } = {}, today = todayISO()) {
  return plants.filter((plant) => {
    const byStatus = status === "all" || wateringStatus(plant, today) === status;
    const byEnvironment = environment === "all" || plant.environment === environment;
    return byStatus && byEnvironment;
  });
}

export function summarizeGarden(plants, today = todayISO()) {
  const thirsty = plants.filter((plant) => wateringStatus(plant, today) === "thirsty").length;
  return {
    total: plants.length,
    thirsty,
    hydrated: plants.length - thirsty,
  };
}

export function exportGarden(plants, exportedAt = new Date().toISOString()) {
  if (!Array.isArray(plants) || !plants.every(isValidPlant)) {
    throw new Error("Não é possível exportar um jardim com dados inválidos.");
  }
  return JSON.stringify({
    schema: GARDEN_SCHEMA,
    version: GARDEN_VERSION,
    exportedAt,
    plants,
  }, null, 2);
}

export function parseGarden(raw) {
  let data;
  try {
    data = JSON.parse(raw);
  } catch (error) {
    throw new Error("O arquivo não contém JSON válido.", { cause: error });
  }

  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new Error("Formato de arquivo não reconhecido. Selecione um arquivo exportado pelo FloraCare.");
  }
  if (data.schema !== GARDEN_SCHEMA) {
    throw new Error("O arquivo não é uma exportação do FloraCare.");
  }
  if (data.version !== GARDEN_VERSION) {
    throw new Error(`Versão de arquivo não suportada: ${data.version}.`);
  }
  if (!Array.isArray(data.plants) || !data.plants.every(isValidPlant)) {
    throw new Error("O arquivo contém plantas inválidas. Nenhum dado foi alterado.");
  }
  return data.plants;
}
