import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { renderToString } from "@vue/server-renderer";

export function create() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());

  const stores = [
    {
      city: "Москва",
      stores: [
        {
          name: "Магазин на Арбате",
          latitude: 55.7558,
          longitude: 37.6173,
          address: "ул. Арбат, 10",
          hours: "09:00 - 21:00",
        },
        {
          name: "Тверская Лавка",
          latitude: 55.7577,
          longitude: 37.6,
          address: "ул. Тверская, 12",
          hours: "10:00 - 22:00",
        },
        {
          name: "Новый Арбат Маркет",
          latitude: 55.7601,
          longitude: 37.61,
          address: "ул. Новый Арбат, 21",
          hours: "08:00 - 20:00",
        },
        {
          name: "Большая Дмитровка Бутик",
          latitude: 55.7512,
          longitude: 37.6031,
          address: "ул. Большая Дмитровка, 4",
          hours: "09:30 - 21:30",
        },
        {
          name: "Магазин на Пречистенке",
          latitude: 55.7421,
          longitude: 37.6212,
          address: "ул. Пречистенка, 17",
          hours: "10:00 - 20:00",
        },
      ],
    },
    {
      city: "Санкт-Петербург",
      stores: [
        {
          name: "Невский Пассаж",
          latitude: 59.9343,
          longitude: 30.3351,
          address: "Невский проспект, 24",
          hours: "10:00 - 20:00",
        },
        {
          name: "Садовая Лавка",
          latitude: 59.9371,
          longitude: 30.319,
          address: "ул. Садовая, 15",
          hours: "09:00 - 21:00",
        },
        {
          name: "Лиговский Торговый",
          latitude: 59.9303,
          longitude: 30.3554,
          address: "Лиговский проспект, 39",
          hours: "10:00 - 22:00",
        },
        {
          name: "Рубинштейн Бутик",
          latitude: 59.9277,
          longitude: 30.3325,
          address: "ул. Рубинштейна, 12",
          hours: "09:00 - 21:00",
        },
        {
          name: "Петровский Торговый",
          latitude: 59.9365,
          longitude: 30.3124,
          address: "ул. Петровская, 19",
          hours: "09:00 - 21:00",
        },
      ],
    },
  ];

  app.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (username === "Admin" && password === "pa$$word9009") {
      res.cookie("auth", "true", { httpOnly: true });
      res.send({ success: true });
    } else {
      res.send({ success: false });
    }
  });

  app.get("/stores", (req, res) => {
    res.json(stores);
  });

  const server = createServer(app);

  return { app, server };
}

export function listen({ server }, { port }, callback) {
  server.listen(port, callback);
}

export function close({ server }, callback) {
  server.close(callback);
}

const { app, server } = create();

app.get("*", async (req, res) => {
  try {
    const { createApp } = await import("../src/main.js");

    const { app: vueApp } = await createApp();

    const context = {};
    const html = await renderToString(vueApp, context);
    res.send(html);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server xatosi");
  }
});

listen({ server }, { port: 3000 }, () => {
  console.log("Server start on port http://localhost:3000");
});
