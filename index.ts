import { spawnSync } from "child_process";
import config from "./config.json" with { type: "json" };

function main() {
    if (!process.env.URL) {
        console.error("No WHIP endpoint provided");
        return;
    }

    const { prefix, videos } = config;

    while (true) {
        for (const video of videos) {
            spawnSync("ffmpeg", [`-re`, `-i`, `${prefix}${video}`, `-c`, `copy`, `-f`, `whip`, `"${process.env.URL}"`, `-authorization`, `${process.env.PASSWORD}`], {
                shell: true,
            });
        }
    }
}

main();
