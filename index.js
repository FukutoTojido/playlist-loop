import { exec } from "child_process";
import util from "util";
import config from "./config.json" with { type: "json" };

const execAsync = util.promisify(exec);

(async () => {
    if (!process.env.URL) {
        console.error("No WHIP endpoint provided");
        return;
    }

    const { prefix, videos } = config;

    try {
        let i = 0;
        while (true) {
            const video = videos[i];
            await execAsync(`ffmpeg-webrtc -re -i ${prefix}${video} -c copy -f whip ${process.env.URL}`);

            i = (i + 1) % videos.length;
        }
    } catch (error) {
        console.error(error);
        return;
    }
})();
