import { formatDate } from "./date-utils.js";
import {
  createPlant,
  loadPlants,
  nextWateringDate,
  savePlants,
  waterPlant,
  wateringStatus,
} from "./plant-service.js";

const $ = (selector) => document.querySelector(selector);
const ui = {
  add: $("#add-plant"),
  dialog: $("#plant-dialog"),
  form: $("#plant-form"),
  id: $("#plant-id"),
  name: $("#plant-name"),
  species: $("#plant-species"),
  environment: $("#plant-environment"),
  interval: $("#plant-interval"),
  needsWater: $("#needs-water"),
  needsWaterWrap: $("#needs-water-wrap"),
  title: $("#dialog-title"),
  list: $("#plant-list"),
  count: $("#plant-count"),
  thirstyCount: $("#thirsty-count"),
  statusFilter: $("#status-filter"),
  environmentFilter: $("#environment-filter"),
  notice: $("#notice"),
};

let plants = [];

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character]);
}

function commit(nextPlants) {
  try {
    savePlants(nextPlants);
  } catch (error) {
    console.error("Não foi possível salvar as plantas.", error);
    ui.notice.textContent = "Não foi possível salvar. Verifique as permissões e o espaço disponível no navegador.";
    ui.notice.hidden = false;
    return false;
  }
  plants = nextPlants;
  ui.notice.hidden = true;
  render();
  return true;
}

function card(plant) {
  const status = wateringStatus(plant);
  const article = document.createElement("article");
  article.className = "plant-card";
  article.innerHTML = `
    <div class="card-top">
      <span class="avatar" aria-hidden="true">🪴</span>
      <div class="card-actions">
        <button class="text-button" type="button" data-action="edit" data-id="${escapeHTML(plant.id)}">Editar</button>
        <button class="text-button danger" type="button" data-action="delete" data-id="${escapeHTML(plant.id)}">Excluir</button>
      </div>
    </div>
    <h3 class="plant-name">${escapeHTML(plant.name)}</h3>
    <p class="species">${escapeHTML(plant.species || "Espécie não informada")}</p>
    <div class="tags">
      <span class="tag">${escapeHTML(plant.environment)}</span>
      <span class="tag">A cada ${plant.intervalDays} dias</span>
      <span class="status status-${status}">${status === "thirsty" ? "Precisa de rega" : "Hidratada"}</span>
    </div>
    <dl class="dates">
      <div><dt>Última rega</dt><dd>${formatDate(plant.lastWateredAt)}</dd></div>
      <div><dt>Próxima rega</dt><dd>${formatDate(nextWateringDate(plant))}</dd></div>
    </dl>
    <p class="history">${plant.wateringHistory.length} ${plant.wateringHistory.length === 1 ? "rega registrada" : "regas registradas"}</p>
    <button class="water-button" type="button" data-action="water" data-id="${escapeHTML(plant.id)}">💧 Regar agora</button>
  `;
  return article;
}

function render() {
  const thirsty = plants.filter((plant) => wateringStatus(plant) === "thirsty").length;
  ui.count.textContent = `${plants.length} ${plants.length === 1 ? "planta" : "plantas"}`;
  ui.thirstyCount.textContent = `${thirsty} ${thirsty === 1 ? "planta" : "plantas"}`;
  ui.list.replaceChildren();

  const visible = plants.filter((plant) => {
    const status = wateringStatus(plant);
    const byStatus = ui.statusFilter.value === "all" || ui.statusFilter.value === status;
    const byEnvironment = ui.environmentFilter.value === "all" || ui.environmentFilter.value === plant.environment;
    return byStatus && byEnvironment;
  });
  if (visible.length) {
    visible.forEach((plant) => ui.list.append(card(plant)));
    return;
  }

  const filtered = ui.statusFilter.value !== "all" || ui.environmentFilter.value !== "all";
  ui.list.innerHTML = `<div class="empty"><div class="icon">${filtered ? "🔎" : "🌿"}</div><h3>${filtered ? "Nenhuma planta encontrada" : "Seu jardim começa aqui"}</h3><p>${filtered ? "Tente mudar os filtros." : "Adicione sua primeira planta para acompanhar os cuidados."}</p></div>`;
}

function openDialog(plant = null) {
  ui.form.reset();
  ui.id.value = plant?.id || "";
  ui.name.value = plant?.name || "";
  ui.species.value = plant?.species || "";
  ui.environment.value = plant?.environment || "Meia-Sombra";
  ui.interval.value = String(plant?.intervalDays || 7);
  ui.title.textContent = plant ? "Editar planta" : "Adicionar planta";
  ui.needsWaterWrap.hidden = Boolean(plant);
  ui.dialog.showModal();
  ui.name.focus();
}

ui.add.addEventListener("click", () => openDialog());
$("#cancel-dialog").addEventListener("click", () => ui.dialog.close());
$("#close-dialog").addEventListener("click", () => ui.dialog.close());
ui.dialog.addEventListener("click", (event) => {
  if (event.target === ui.dialog) ui.dialog.close();
});
ui.statusFilter.addEventListener("change", render);
ui.environmentFilter.addEventListener("change", render);

ui.form.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = ui.name.value.trim();
  const intervalDays = Number(ui.interval.value);
  if (name.length < 2 || !Number.isInteger(intervalDays) || intervalDays < 1) {
    ui.notice.textContent = "Informe um nome com pelo menos 2 caracteres e um intervalo inteiro de pelo menos 1 dia.";
    ui.notice.hidden = false;
    return;
  }

  const values = {
    name,
    species: ui.species.value.trim(),
    environment: ui.environment.value,
    intervalDays,
  };
  const existingId = ui.id.value;
  const nextPlants = existingId
    ? plants.map((plant) => plant.id === existingId ? { ...plant, ...values } : plant)
    : [...plants, createPlant({ ...values, needsWater: ui.needsWater.checked })];
  if (commit(nextPlants)) ui.dialog.close();
});

ui.list.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  const plant = plants.find((item) => item.id === button.dataset.id);
  if (!plant) return;

  if (button.dataset.action === "edit") {
    openDialog(plant);
  } else if (button.dataset.action === "delete") {
    if (window.confirm(`Deseja realmente remover "${plant.name}" do seu jardim?`)) {
      commit(plants.filter((item) => item.id !== plant.id));
    }
  } else if (button.dataset.action === "water") {
    commit(plants.map((item) => item.id === plant.id ? waterPlant(item) : item));
  }
});

try {
  plants = loadPlants();
  render();
} catch (error) {
  console.error("Não foi possível carregar as plantas salvas.", error);
  ui.notice.textContent = error.message || "Não foi possível carregar os dados salvos.";
  ui.notice.hidden = false;
  ui.add.disabled = true;
  ui.statusFilter.disabled = true;
  ui.environmentFilter.disabled = true;
}
