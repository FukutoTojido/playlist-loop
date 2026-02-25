import { spawnSync } from "child_process";

function main() {
    if (!process.env.URL) {
        console.error("No WHIP endpoint provided");
        return;
    }

    while (true) {
    	spawnSync("ffmpeg", [`-re`, '-stream_loop', '-1', `-i`, `./Videos/ittai.mp4`, `-c`, `copy`, '-b:v', "2000k", `-f`, `flv`, `"${process.env.URL}"`, `-authorization`, `${process.env.PASSWORD}`], {
    		shell: true,
     	});
    }
}

main();
