import express from "express";
import Global from "@/Global.js";
import { Server } from "http";

let server: null | Server = null;

export default async function staticServe() {
    return new Promise<void>((resolve, reject) => {
        const app = express();
        const port = 8081;
        app.use(express.static(Global.dist));
        
        server = app.listen(port, () => {
            resolve();
        });
        
        server.on('error', (err) => {
            reject(err);
        });
    });
}

export function closeServer() {
    if (server) {
        server.close();
    }
}
