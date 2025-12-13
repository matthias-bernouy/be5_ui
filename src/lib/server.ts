import express from "express";
import Global from "@/domain/build/Global.js";
import { Server } from "http";

let server: null | Server = null;

export default function staticServe() {
    const app = express();
    const port = 8081;
    app.use(express.static(Global.dist));
    server = app.listen(port, () => { });
}

export function closeServer() {
    if (server) {
        server.close();
    }
}
