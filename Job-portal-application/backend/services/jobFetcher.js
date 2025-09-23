import axios from "axios";
import mongoose from "mongoose";
import { Job } from "../models/jobModel.js";

// Default values (replace later with actual IDs from your DB)
const defaultCompanyId = new mongoose.Types.ObjectId();
const defaultUserId = new mongoose.Types.ObjectId();

/**
 * Normalize and save job to DB
 */
const saveJob = async (jobData) => {
    const exists = await Job.findOne({
        title: jobData.title,
        location: jobData.location,
        company: jobData.company,
    });

    if (!exists) {
        await Job.create(jobData);
        console.log(`✅ Saved job: ${jobData.title}`);
    } else {
        console.log(`⚠️ Skipped duplicate: ${jobData.title}`);
    }
};

/**
 * Fetch jobs from Adzuna API
 */
export const fetchAdzunaJobs = async () => {
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

        for (let job of res.data.results) {
            const newJob = {
                title: job.title,
                description: job.description || "Not provided",
                requirements: job.category ? [job.category.label] : [],
                salary: job.salary_min
                    ? `${job.salary_min} - ${job.salary_max}`
                    : "Not disclosed",
                experienceLevel: 1, // default
                location: job.location.display_name || "Remote",
                jobType: job.contract_type || "Full-time",
                position: 1, // default
                company: defaultCompanyId,
                created_by: defaultUserId,
                applications: [],
            };

            await saveJob(newJob);
        }
    } catch (err) {
        console.error("❌ Error fetching Adzuna jobs:", err.message);
    }
};

/**
 * Fetch jobs from Jooble API
 */
export const fetchJoobleJobs = async () => {
    try {
        const res = await axios.post(
            `https://jooble.org/api/${process.env.JOOBLE_KEY}`,
            {
                keywords: "developer",
                location: "India",
                page: 1,
            }
        );

        for (let job of res.data.jobs) {
            const newJob = {
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
            };

            await saveJob(newJob);
        }
    } catch (err) {
        console.error("❌ Error fetching Jooble jobs:", err.message);
    }
};
