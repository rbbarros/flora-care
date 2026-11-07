import test from "node:test";
import assert from "node:assert/strict";
import { performance } from "node:perf_hooks";
import {
  ENVIRONMENTS,
  GARDEN_SCHEMA,
  GARDEN_VERSION,
  STORAGE_KEY,
  createPlant,
  exportGarden,
  filterPlants,
  loadPlants,
  nextWateringDate,
  parseGarden,
  removePlant,
  savePlants,
  summarizeGarden,
  updatePlant,
  validatePlantInput,
  waterPlant,
  wateringStatus,
} from "../src/js/plant-service.js";

const TODAY = "2026-11-07";

function validPlant(overrides = {}) {
  return {
    id: "plant-1",
    name: "Jiboia",
    species: "Epipremnum aureum",
    environment: "Meia-Sombra",
    intervalDays: 4,
    lastWateredAt: TODAY,
    wateringHistory: [TODAY],
    ...overrides,
  };
}

function memoryStorage() {
  const data = new Map();
  return {
    getItem: (key) => data.has(key) ? data.get(key) : null,
    setItem: (key, value) => data.set(key, String(value)),
    removeItem: (key) => data.delete(key),
    clear: () => data.clear(),
  };
}

test("validatePlantInput aceita nome e intervalo válidos", () => {
  assert.equal(validatePlantInput({ name: "Jiboia", intervalDays: 4 }), null);
});

test("validatePlantInput rejeita nome curto, vazio ou não textual", () => {
  assert.match(validatePlantInput({ name: "A", intervalDays: 4 }), /nome/i);
  assert.match(validatePlantInput({ name: "   ", intervalDays: 4 }), /nome/i);
  assert.match(validatePlantInput({ name: 42, intervalDays: 4 }), /nome/i);
});

test("validatePlantInput rejeita intervalo zero, negativo ou fracionário", () => {
  assert.match(validatePlantInput({ name: "Jiboia", intervalDays: 0 }), /intervalo/i);
  assert.match(validatePlantInput({ name: "Jiboia", intervalDays: -3 }), /intervalo/i);
  assert.match(validatePlantInput({ name: "Jiboia", intervalDays: 1.5 }), /intervalo/i);
});

test("createPlant cria a planta com a data de hoje e histórico inicial", () => {
  const plant = createPlant({
    name: "  Jiboia ",
    species: " Epipremnum aureum ",
    environment: "Meia-Sombra",
    intervalDays: 4,
  }, TODAY);

  assert.equal(typeof plant.id, "string");
  assert.ok(plant.id.length > 0);
  assert.equal(plant.name, "Jiboia");
  assert.equal(plant.species, "Epipremnum aureum");
  assert.equal(plant.lastWateredAt, TODAY);
  assert.deepEqual(plant.wateringHistory, [TODAY]);
  assert.equal(nextWateringDate(plant), "2026-11-11");
  assert.equal(wateringStatus(plant, TODAY), "hydrated");
});

test("createPlant marca como sedenta quando a planta já precisa de rega", () => {
  const plant = createPlant({
    name: "Manjericão",
    environment: "Sol Pleno",
    intervalDays: 2,
    needsWater: true,
  }, TODAY);

  assert.equal(plant.lastWateredAt, "2026-11-05");
  assert.deepEqual(plant.wateringHistory, []);
  assert.equal(nextWateringDate(plant), TODAY);
  assert.equal(wateringStatus(plant, TODAY), "thirsty");
});

test("createPlant rejeita entrada inválida e ambiente desconhecido", () => {
  assert.throws(() => createPlant({ name: "A", environment: "Sombra", intervalDays: 2 }, TODAY), /nome/i);
  assert.throws(() => createPlant({ name: "Jiboia", environment: "Sombra", intervalDays: 0 }, TODAY), /intervalo/i);
  assert.throws(() => createPlant({ name: "Jiboia", environment: "Lua", intervalDays: 2 }, TODAY), /Ambiente inválido/);
});

test("updatePlant atualiza os dados e recalcula a próxima rega", () => {
  const original = validPlant();
  const updated = updatePlant(original, {
    name: "Samambaia",
    species: "Nephrolepis exaltata",
    environment: "Sombra",
    intervalDays: 10,
  });

  assert.equal(updated.name, "Samambaia");
  assert.equal(updated.species, "Nephrolepis exaltata");
  assert.equal(updated.environment, "Sombra");
  assert.equal(updated.intervalDays, 10);
  assert.equal(updated.lastWateredAt, original.lastWateredAt);
  assert.deepEqual(updated.wateringHistory, original.wateringHistory);
  assert.equal(nextWateringDate(updated), "2026-11-17");
});

test("updatePlant rejeita intervalo inválido", () => {
  assert.throws(() => updatePlant(validPlant(), { intervalDays: 0 }), /intervalo/i);
});

test("removePlant remove apenas a planta indicada", () => {
  const plants = [validPlant({ id: "a" }), validPlant({ id: "b" })];
  const result = removePlant(plants, "a");

  assert.deepEqual(result.map((plant) => plant.id), ["b"]);
  assert.equal(plants.length, 2);
});

test("waterPlant atualiza a última rega e acrescenta o histórico", () => {
  const plant = validPlant({ lastWateredAt: "2026-11-01", wateringHistory: ["2026-11-01"] });
  const watered = waterPlant(plant, TODAY);

  assert.equal(watered.lastWateredAt, TODAY);
  assert.deepEqual(watered.wateringHistory, ["2026-11-01", TODAY]);
  assert.equal(watered.wateringHistory.length, 2);
});

test("waterPlant antecipada reinicia o ciclo de uma planta hidratada", () => {
  const plant = validPlant({ lastWateredAt: "2026-11-07", intervalDays: 10 });
  const watered = waterPlant(plant, "2026-11-08");

  assert.equal(watered.lastWateredAt, "2026-11-08");
  assert.equal(nextWateringDate(watered), "2026-11-18");
  assert.equal(wateringStatus(watered, "2026-11-08"), "hydrated");
});

test("waterPlant é idempotente no mesmo dia", () => {
  const plant = validPlant({ wateringHistory: [TODAY] });
  const watered = waterPlant(plant, TODAY);

  assert.deepEqual(watered.wateringHistory, [TODAY]);
});

test("waterPlant não altera o objeto original", () => {
  const plant = validPlant({ lastWateredAt: "2026-11-01", wateringHistory: ["2026-11-01"] });
  waterPlant(plant, TODAY);

  assert.equal(plant.lastWateredAt, "2026-11-01");
  assert.deepEqual(plant.wateringHistory, ["2026-11-01"]);
});

test("nextWateringDate soma o intervalo à última rega", () => {
  assert.equal(nextWateringDate(validPlant({ lastWateredAt: "2026-01-30", intervalDays: 3 })), "2026-02-02");
});

test("wateringStatus retorna hidratada antes da data limite", () => {
  assert.equal(wateringStatus(validPlant({ lastWateredAt: "2026-11-07", intervalDays: 4 }), TODAY), "hydrated");
});

test("wateringStatus retorna sedenta na data limite ou depois", () => {
  assert.equal(wateringStatus(validPlant({ lastWateredAt: "2026-11-03", intervalDays: 4 }), TODAY), "thirsty");
  assert.equal(wateringStatus(validPlant({ lastWateredAt: "2026-11-01", intervalDays: 4 }), TODAY), "thirsty");
});

test("filterPlants mantém todas as plantas quando os filtros são 'all'", () => {
  const plants = [validPlant({ id: "a" }), validPlant({ id: "b" })];
  assert.equal(filterPlants(plants, { status: "all", environment: "all" }, TODAY).length, 2);
});

test("filterPlants filtra por status hídrico", () => {
  const plants = [
    validPlant({ id: "thirsty", lastWateredAt: "2026-11-01", intervalDays: 4 }),
    validPlant({ id: "hydrated", lastWateredAt: "2026-11-07", intervalDays: 4 }),
  ];
  const result = filterPlants(plants, { status: "thirsty" }, TODAY);

  assert.deepEqual(result.map((plant) => plant.id), ["thirsty"]);
});

test("filterPlants filtra por ambiente", () => {
  const plants = [
    validPlant({ id: "sol", environment: "Sol Pleno" }),
    validPlant({ id: "sombra", environment: "Sombra" }),
  ];
  const result = filterPlants(plants, { environment: "Sombra" }, TODAY);

  assert.deepEqual(result.map((plant) => plant.id), ["sombra"]);
});

test("filterPlants combina status e ambiente", () => {
  const plants = [
    validPlant({ id: "a", environment: "Sombra", lastWateredAt: "2026-11-01", intervalDays: 4 }),
    validPlant({ id: "b", environment: "Sombra", lastWateredAt: "2026-11-07", intervalDays: 4 }),
    validPlant({ id: "c", environment: "Sol Pleno", lastWateredAt: "2026-11-01", intervalDays: 4 }),
  ];
  const result = filterPlants(plants, { status: "thirsty", environment: "Sombra" }, TODAY);

  assert.deepEqual(result.map((plant) => plant.id), ["a"]);
});

test("summarizeGarden conta total, sedentas e hidratadas", () => {
  const plants = [
    validPlant({ id: "a", lastWateredAt: "2026-11-01", intervalDays: 4 }),
    validPlant({ id: "b", lastWateredAt: "2026-11-02", intervalDays: 4 }),
    validPlant({ id: "c", lastWateredAt: "2026-11-07", intervalDays: 4 }),
  ];

  assert.deepEqual(summarizeGarden(plants, TODAY), { total: 3, thirsty: 2, hydrated: 1 });
});

test("loadPlants retorna lista vazia quando não há dados salvos", () => {
  assert.deepEqual(loadPlants(memoryStorage()), []);
});

test("loadPlants lê um jardim válido do armazenamento", () => {
  const storage = memoryStorage();
  const plants = [validPlant()];
  storage.setItem(STORAGE_KEY, JSON.stringify(plants));

  assert.deepEqual(loadPlants(storage), plants);
});

test("loadPlants rejeita JSON inválido e formato não reconhecido", () => {
  const invalidJson = memoryStorage();
  invalidJson.setItem(STORAGE_KEY, "{");
  assert.throws(() => loadPlants(invalidJson), /inválidos/i);

  const invalidFormat = memoryStorage();
  invalidFormat.setItem(STORAGE_KEY, JSON.stringify([{ id: "x" }]));
  assert.throws(() => loadPlants(invalidFormat), /formato/i);
});

test("savePlants persiste o jardim e rejeita dados inválidos", () => {
  const storage = memoryStorage();
  const plants = [validPlant()];
  savePlants(plants, storage);

  assert.deepEqual(JSON.parse(storage.getItem(STORAGE_KEY)), plants);
  const before = storage.getItem(STORAGE_KEY);
  assert.throws(() => savePlants([{ id: "x" }], storage), /dados inválidos/i);
  assert.equal(storage.getItem(STORAGE_KEY), before);
});

test("exportGarden gera um JSON versionado com as plantas", () => {
  const plants = [validPlant()];
  const payload = JSON.parse(exportGarden(plants, "2026-11-07T12:00:00.000Z"));

  assert.equal(payload.schema, GARDEN_SCHEMA);
  assert.equal(payload.version, GARDEN_VERSION);
  assert.equal(payload.exportedAt, "2026-11-07T12:00:00.000Z");
  assert.deepEqual(payload.plants, plants);
});

test("exportGarden rejeita plantas inválidas", () => {
  assert.throws(() => exportGarden([{ id: "x" }]), /dados inválidos/i);
});

test("parseGarden restaura exatamente as plantas exportadas", () => {
  const plants = [validPlant(), validPlant({ id: "plant-2", environment: "Sombra" })];
  assert.deepEqual(parseGarden(exportGarden(plants)), plants);
});

test("parseGarden rejeita arquivo que não é JSON", () => {
  assert.throws(() => parseGarden("{"), /JSON válido/i);
});

test("parseGarden rejeita schema e versão desconhecidos", () => {
  assert.throws(
    () => parseGarden(JSON.stringify({ schema: "outro", version: GARDEN_VERSION, plants: [] })),
    /exportação do FloraCare/i,
  );
  assert.throws(
    () => parseGarden(JSON.stringify({ schema: GARDEN_SCHEMA, version: 99, plants: [] })),
    /Versão de arquivo não suportada/i,
  );
});

test("parseGarden rejeita plantas inválidas sem alterar o jardim", () => {
  assert.throws(
    () => parseGarden(JSON.stringify({ schema: GARDEN_SCHEMA, version: GARDEN_VERSION, plants: [{ id: "x" }] })),
    /plantas inválidas/i,
  );
});

test("RNF02: calcula, filtra e resume 500 plantas em menos de 200 ms", () => {
  const plants = Array.from({ length: 500 }, (_, index) => validPlant({
    id: `plant-${index}`,
    environment: ENVIRONMENTS[index % ENVIRONMENTS.length],
    intervalDays: (index % 14) + 1,
    lastWateredAt: `2026-10-${String((index % 28) + 1).padStart(2, "0")}`,
  }));

  // Aquecimento para separar a compilação JIT da medição de regime permanente.
  filterPlants(plants, { status: "thirsty", environment: "all" }, TODAY);
  summarizeGarden(plants, TODAY);

  const startedAt = performance.now();
  const thirsty = filterPlants(plants, { status: "thirsty", environment: "all" }, TODAY);
  const summary = summarizeGarden(plants, TODAY);
  const elapsed = performance.now() - startedAt;

  assert.equal(summary.total, 500);
  assert.ok(thirsty.length > 0);
  assert.ok(elapsed < 200, `Cálculo levou ${elapsed.toFixed(2)} ms, acima do limite de 200 ms.`);
});
