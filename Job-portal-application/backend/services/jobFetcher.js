import axios from "axios";
import mongoose from "mongoose";
import { Job } from "../models/job.model.js";

// Default values (replace with real IDs if available)
const defaultCompanyId = new mongoose.Types.ObjectId();
const defaultUserId = new mongoose.Types.ObjectId();

/**
 * Save job to DB with duplicate check
 */
const saveJob = async (jobData) => {
    try {
        const exists = await Job.findOne({
            title: jobData.title,
            location: jobData.location,
            company: jobData.company,
        });

        if (!exists) {
            const savedJob = await Job.create(jobData);
            console.log(`✅ Saved job: ${savedJob.title} (ID: ${savedJob._id})`);
            return true; // job saved
        } else {
            console.log(`⚠️ Skipped duplicate: ${jobData.title}`);
            return false; // duplicate
        }
    } catch (err) {
        console.error(`❌ Error saving job "${jobData.title}":`, err.message);
        return false;
    }
};

/**
 * Fetch jobs from Adzuna API
 */
export const fetchAdzunaJobs = async () => {
    if (!process.env.ADZUNA_APP_ID || !process.env.ADZUNA_APP_KEY) {
        console.warn("⚠️ Adzuna API keys missing in .env");
        return [];
    }

    try {
        const res = await axios.get(
            "https://api.adzuna.com/v1/api/jobs/in/search/1",
            {
                params: {
                    app_id: process.env.ADZUNA_APP_ID,
                    app_key: process.env.ADZUNA_APP_KEY,
                    what: "developer",
                    sort_by: "date",
                    max_days_old: 1,
                    results_per_page: 10,
                },
            }
        );

        const jobs = res.data.results || [];
        console.log(`Adzuna API returned ${jobs.length} jobs`);
        console.log("🔍 First Adzuna job:", jobs[0]?.title, "-", jobs[0]?.location?.display_name);

        for (let job of jobs) {
            await saveJob({
                title: job.title,
                description: job.description || "Not provided",
                requirements: job.category ? [job.category.label] : [],
                salary: job.salary_min ? `${job.salary_min} - ${job.salary_max}` : "Not disclosed",
                experienceLevel: 1,
                location: job.location?.display_name || "Remote",
                jobType: job.contract_type || "Full-time",
                position: 1,
                company: defaultCompanyId,
                created_by: defaultUserId,
                applications: [],
            });
        }

        return jobs; // return jobs for logging in scheduler
    } catch (err) {
        console.error("❌ Error fetching Adzuna jobs:", err.message);
        return [];
    }
};

/**
 * Fetch jobs from Jooble API
 */
export const fetchJoobleJobs = async () => {
    if (!process.env.JOOBLE_KEY) {
        console.warn("⚠️ Jooble API key missing in .env");
        return [];
    }

    try {
        const res = await axios.post(`https://jooble.org/api/${process.env.JOOBLE_KEY}`, {
            keywords: "developer",
            location: "India",
            page: 1,
        });

        const jobs = res.data.jobs || [];
        console.log(`Jooble API returned ${jobs.length} jobs`);
        console.log("🔍 First Jooble job:", jobs[0]?.title, "-", jobs[0]?.location);

        for (let job of jobs) {
            await saveJob({
                title: job.title,
                description: job.snippet || "Not provided",
                requirements: [],
                salary: job.salary || "Not disclosed",
                experienceLevel: 1,
                location: job.location || "Remote",
                jobType: job.type || "Full-time",
                position: 1,
                company: defaultCompanyId,
                created_by: defaultUserId,
                applications: [],
            });
        }

        return jobs;
    } catch (err) {
        console.error("❌ Error fetching Jooble jobs:", err.message);
        return [];
    }
};
