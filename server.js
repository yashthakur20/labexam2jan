const express = require("express");
const fs = require("fs/promises");
const path = require("path");

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, "data.json");

app.use(express.json());

async function readData() {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    return JSON.parse(raw || "[]");
  } catch (error) {
    if (error.code === "ENOENT") {
      await writeData([]);
      return [];
    }
    throw error;
  }
}

async function writeData(data) {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

app.get("/", (req, res) => {
  res.send("CRUD API is running");
});

app.get("/items", async (req, res) => {
  try {
    const items = await readData();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Failed to read data", error: error.message });
  }
});

app.get("/items/:id", async (req, res) => {
  try {
    const items = await readData();
    const item = items.find((entry) => entry.id === Number(req.params.id));

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json(item);
  } catch (error) {
    res.status(500).json({ message: "Failed to read item", error: error.message });
  }
});

app.post("/items", async (req, res) => {
  try {
    const items = await readData();
    const newItem = {
      id: items.length ? items[items.length - 1].id + 1 : 1,
      ...req.body
    };

    items.push(newItem);
    await writeData(items);

    res.status(201).json({ message: "Item created", data: newItem });
  } catch (error) {
    res.status(500).json({ message: "Failed to create item", error: error.message });
  }
});

app.put("/items/:id", async (req, res) => {
  try {
    const items = await readData();
    const itemIndex = items.findIndex((entry) => entry.id === Number(req.params.id));

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found" });
    }

    const updatedItem = {
      id: items[itemIndex].id,
      ...req.body
    };

    items[itemIndex] = updatedItem;
    await writeData(items);

    res.json({ message: "Item fully updated", data: updatedItem });
  } catch (error) {
    res.status(500).json({ message: "Failed to update item", error: error.message });
  }
});

app.patch("/items/:id", async (req, res) => {
  try {
    const items = await readData();
    const itemIndex = items.findIndex((entry) => entry.id === Number(req.params.id));

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found" });
    }

    items[itemIndex] = {
      ...items[itemIndex],
      ...req.body,
      id: items[itemIndex].id
    };

    await writeData(items);

    res.json({ message: "Item partially updated", data: items[itemIndex] });
  } catch (error) {
    res.status(500).json({ message: "Failed to patch item", error: error.message });
  }
});

app.delete("/items/:id", async (req, res) => {
  try {
    const items = await readData();
    const itemIndex = items.findIndex((entry) => entry.id === Number(req.params.id));

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found" });
    }

    const deletedItem = items[itemIndex];
    items.splice(itemIndex, 1);
    await writeData(items);

    res.json({ message: "Item deleted", data: deletedItem });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete item", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
