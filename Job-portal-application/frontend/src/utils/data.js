const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5011";

export const USER_API_ENDPOINT = `${BASE_URL}/user`;
export const JOB_API_ENDPOINT = `${BASE_URL}/job`;
export const APPLICATION_API_ENDPOINT = `${BASE_URL}/application`;
export const COMPANY_API_ENDPOINT = `${BASE_URL}/company`;