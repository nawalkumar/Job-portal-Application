import cron from "node-cron";
import { fetchAdzunaJobs, fetchJoobleJobs } from "../services/jobFetcher.js";

// Run every 6 hours
cron.schedule("0 */6 * * *", async () => {
    console.log("⏳ Fetching latest jobs...");
    await fetchAdzunaJobs();
    await fetchJoobleJobs();
    console.log("✅ Job fetching completed.");
});
