import cron from "node-cron";
import connectDB from "../utils/db.js";
import { fetchAdzunaJobs, fetchJoobleJobs } from "../services/jobFetcher.js";

const runJobFetch = async () => {
    console.log("⏳ Manual Run: Fetching latest jobs...");
    try {
        const adzunaJobs = await fetchAdzunaJobs();
        const joobleJobs = await fetchJoobleJobs();

        console.log("📌 Adzuna Jobs (sample):", adzunaJobs.slice(0, 3).map(j => j.title));
        console.log("📌 Jooble Jobs (sample):", joobleJobs.slice(0, 3).map(j => j.title));

        console.log("✅ Manual Run: Job fetching completed.");
    } catch (err) {
        console.error("❌ Manual Run: Error fetching jobs:", err.message);
    }
};

(async () => {
    await connectDB();   // ✅ Ensure DB connection
    cron.schedule("0 */6 * * *", runJobFetch);
    runJobFetch(); // 🔥 Run immediately
})();
