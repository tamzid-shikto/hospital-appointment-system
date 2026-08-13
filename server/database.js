// database.js
const DB_URL = "https://piano-f7987.firebaseio.com/";

async function ConnectToDatabase() {
  const res = await fetch(`${DB_URL}.json?shallow=true`);
  if (!res.ok) throw new Error("DB Connection failed");
  return true;
}

async function ReadDatabase(path = "") {
  const res = await fetch(`${DB_URL}${path}.json`);
  if (!res.ok) throw new Error("Failed to read database");
  return await res.json();
}

async function WriteDatabase(path, data) {
  const res = await fetch(`${DB_URL}${path}.json`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Failed to write to database");
  return await res.json();
}

async function PushDatabase(path, data) {
  const res = await fetch(`${DB_URL}${path}.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Failed to push to database");
  return await res.json();
}

module.exports = {
  ConnectToDatabase,
  ReadDatabase,
  WriteDatabase,
  PushDatabase
};