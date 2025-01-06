import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";

// https://vitejs.dev/config/
//host: true

export default () => {
  const DevMode = process.env.VITE_NODE_ENV === "dev";
  if (DevMode) {
    return defineConfig({
      plugins: [react()],
      server: {
        host: true,
      },
    });
  } else {
    const options = {
      key: fs.readFileSync("./privkey.pem"),
      cert: fs.readFileSync("./fullchain.pem"),
    };

    return defineConfig({
      plugins: [react()],
      server: {
        host: true,
        https: options,
      },
    });
  }
};
