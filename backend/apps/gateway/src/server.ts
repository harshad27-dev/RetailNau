import { createServer } from "http";
import { app } from "./app";

const PORT = Number(process.env.PORT) || 4000;

const server = createServer(app);

server.listen(PORT, () => {
    console.log(`Gateway Service running on port ${PORT}`);
});
