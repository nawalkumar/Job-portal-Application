// services/jobFetcher.js
import axios from "axios";
import mongoose from "mongoose";
import { Job } from "../models/job.model.js";

// Helper: Generate 2-letter avatar
const generateAvatar = (name) => {
    if (!name) return "";
    const words = name.trim().split(/\s+/);
    const first = words[0][0] ?? "";
    const second = words.length > 1 ? words[words.length - 1][0] : words[0][1] ?? "";
    const text = (first + second).toUpperCase();
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
        text
    )}&background=random&color=fff&size=128`;
};

const defaultCompanyId = new mongoose.Types.ObjectId();
const defaultUserId = new mongoose.Types.ObjectId();

/**
 * Save job with duplicate check
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
            console.log(`Saved job: ${savedJob.title} (ID: ${savedJob._id})`);
            return true;
        } else {
            console.log(`Skipped duplicate: ${jobData.title}`);
            return false;
        }
    } catch (err) {
        console.error(`Error saving job "${jobData.title}":`, err.message);
        return false;
    }
};

/**
 * Fetch jobs from Adzuna API
 */
export const fetchAdzunaJobs = async () => {
    if (!process.env.ADZUNA_APP_ID || !process.env.ADZUNA_APP_KEY) {
        console.warn("Adzuna API keys missing in .env");
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

        for (const job of jobs) {
            const companyName = job.company?.display_name ?? "Unknown Company";

            await saveJob({
                title: job.title,
                description: `<p><strong>Company:</strong> ${companyName}</p>${job.description || "Not provided"}`,
                requirements: job.category ? [job.category.label] : [],
                salary: job.salary_min
                    ? `${job.salary_min} - ${job.salary_max}`
                    : "Not disclosed",
                experienceLevel: 1,
                location: job.location?.display_name || "Remote",
                jobType: job.contract_type || "Full-time",
                position: 1,
                company: defaultCompanyId,
                created_by: defaultUserId,
                applications: [],
                applicationLink: job.redirect_url || null,
                companyLogo: job.company?.logo || generateAvatar(companyName),
            });
        }

        return jobs;
    } catch (err) {
        console.error("Error fetching Adzuna jobs:", err.message);
        return [];
    }
};

/**
 * Fetch jobs from Jooble API
 */
export const fetchJoobleJobs = async () => {
    if (!process.env.JOOBLE_KEY) {
        console.warn("Jooble API key missing in .env");
        return [];
    }

    try {
        const res = await axios.post(
            `https://jooble.org/api/${process.env.JOOBLE_KEY}`,
            {
                keywords: "developer",
                location: "India",
                page: 1,
            }
        );

        const jobs = res.data.jobs || [];
        console.log(`Jooble API returned ${jobs.length} jobs`);

        for (const job of jobs) {
            const companyName = job.company ?? "Unknown Company";

            await saveJob({
                title: job.title,
                description: `<p><strong>Company:</strong> ${companyName}</p>${job.snippet || "Not provided"}`,
                requirements: [],
                salary: job.salary || "Not disclosed",
                experienceLevel: 1,
                location: job.location || "Remote",
                jobType: job.type || "Full-time",
                position: 1,
                company: defaultCompanyId,
                created_by: defaultUserId,
                applications: [],
                applicationLink: job.link || null,
                companyLogo: generateAvatar(companyName),
            });
        }

        return jobs;
    } catch (err) {
        console.error("Error fetching Jooble jobs:", err.message);
        return [];
    }
};