import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allJobs: [],           // All jobs (from API + admin) – used in Browse & LatestJobs
  allAdminJobs: [],      // Jobs posted by logged-in admin
  singleJob: null,       // Selected job details (for Description page)
  searchJobByText: "",   // Search input text (for filtering)
  allAppliedJobs: [],    // Jobs user has applied to
  searchedQuery: "",     // Final query sent to backend (after debounce or enter)
};

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    // Set all jobs from /get endpoint
    setAllJobs(state, action) {
      state.allJobs = action.payload;
    },

    // Set single job when user clicks "Details"
    setSingleJob(state, action) {
      state.singleJob = action.payload;
    },

    // Set jobs created by admin
    setAllAdminJobs(state, action) {
      state.allAdminJobs = action.payload;
    },

    // Update search input as user types
    setSearchJobByText(state, action) {
      state.searchJobByText = action.payload;
    },

    // Update applied jobs list
    setAllAppliedJobs(state, action) {
      state.allAppliedJobs = action.payload;
    },

    // Final search query sent to API
    setSearchedQuery(state, action) {
      state.searchedQuery = action.payload;
    },
  },
});

// Export actions
export const {
  setAllJobs,
  setSingleJob,
  setAllAdminJobs,
  setSearchJobByText,
  setAllAppliedJobs,
  setSearchedQuery,
} = jobSlice.actions;

// Export reducer
export default jobSlice.reducer;
