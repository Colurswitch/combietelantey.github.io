import { execSync } from "child_process";

const BATCH_SIZE = 50; // Change this if needed
const COMMIT_PREFIX = "Batch commit:";

function run(cmd) {
    return execSync(cmd).toString().trim();
}

const statusOutput = run("git status --porcelain");
const changedFiles = statusOutput
    .split("\n")
    .filter((line) => line)
    .map((line, index) => {
        console.log(line);
        return line.slice(index === 0 ? 2 : 3).replace('"', "").replace('"', "").trim();
    }); // Skip status code (e.g., " M filename")

let batchNumber = 1;
for (let i = 0; i < changedFiles.length; i += BATCH_SIZE) {
    const batch = changedFiles.slice(i, i + BATCH_SIZE);

    // Stage the batch
    console.log(`📦 Staging batch ${batchNumber}: ${batch.length} files`);
    batch.forEach((file) => {
        console.log(`- ${file}`);
        run(`git add "${file}"`);
    });

    // Commit the batch
    const message = `${COMMIT_PREFIX} ${batchNumber}`;
    run(`git commit -m "${message}"`);
    console.log(`✅ Committed batch ${batchNumber}: ${batch.length} files`);

    batchNumber++;
}

console.log("🎉 All changes committed in batches.");
