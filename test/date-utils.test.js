import test from "node:test";
import assert from "node:assert/strict";
import {
  addDays,
  formatDate,
  isISODate,
  toISODate,
  todayISO,
} from "../src/js/date-utils.js";

test("toISODate formata uma data local com zeros à esquerda", () => {
  assert.equal(toISODate(new Date(2026, 0, 5)), "2026-01-05");
});

test("toISODate rejeita uma data inválida", () => {
  assert.throws(() => toISODate(new Date("data-invalida")), /Data inválida/);
});

test("todayISO retorna a data atual no formato ISO", () => {
  const now = new Date();
  const expected = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("-");
  assert.equal(todayISO(), expected);
});

test("isISODate aceita uma data ISO válida", () => {
  assert.equal(isISODate("2026-11-07"), true);
});

test("isISODate rejeita formatos e datas inexistentes", () => {
  assert.equal(isISODate("2026-2-3"), false);
  assert.equal(isISODate("07/11/2026"), false);
  assert.equal(isISODate("2026-02-30"), false);
  assert.equal(isISODate(null), false);
});

test("isISODate valida 29 de fevereiro apenas em ano bissexto", () => {
  assert.equal(isISODate("2024-02-29"), true);
  assert.equal(isISODate("2023-02-29"), false);
});

test("addDays soma dias dentro do mesmo mês", () => {
  assert.equal(addDays("2026-11-07", 3), "2026-11-10");
});

test("addDays vira o mês corretamente", () => {
  assert.equal(addDays("2026-01-30", 3), "2026-02-02");
});

test("addDays vira o ano corretamente", () => {
  assert.equal(addDays("2026-12-30", 3), "2027-01-02");
});

test("addDays respeita o ano bissexto", () => {
  assert.equal(addDays("2024-02-28", 1), "2024-02-29");
});

test("addDays aceita zero e dias negativos", () => {
  assert.equal(addDays("2026-11-07", 0), "2026-11-07");
  assert.equal(addDays("2026-11-07", -1), "2026-11-06");
});

test("addDays rejeita data inválida e quantidade não inteira", () => {
  assert.throws(() => addDays("2026-02-30", 1), /Data inválida/);
  assert.throws(() => addDays("2026-11-07", 1.5), /número inteiro/);
});

test("formatDate formata no padrão brasileiro", () => {
  assert.equal(formatDate("2026-01-05"), "05/01/2026");
});

test("formatDate retorna travessão para valor vazio ou inválido", () => {
  assert.equal(formatDate(""), "—");
  assert.equal(formatDate("2026-02-30"), "—");
});
