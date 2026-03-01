// Use the environment variable for production, fallback to localhost for dev
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5011";

export const USER_API_ENDPOINT = `${BASE_URL}/api/user`;
export const JOB_API_ENDPOINT = `${BASE_URL}/api/job`;
export const APPLICATION_API_ENDPOINT = `${BASE_URL}/api/application`;
export const COMPANY_API_ENDPOINT = `${BASE_URL}/api/company`;