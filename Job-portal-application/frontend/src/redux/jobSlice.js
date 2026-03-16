import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  allJobs: [],
  allAdminJobs: [],
  singleJob: null,
  searchJobByText: "",
  allAppliedJobs: [],
  searchedQuery: "",
  // Added for Phase 1
  paginationData: {
    totalPages: 1,
    currentPage: 1,
  }
};

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setAllJobs(state, action) {
      state.allJobs = action.payload;
    },
    // Added for Phase 1
    setPaginationData(state, action) {
      state.paginationData = action.payload;
    },
    // ... keep all your other reducers exactly as they are ...
    setSingleJob(state, action) { state.singleJob = action.payload; },
    setAllAdminJobs(state, action) { state.allAdminJobs = action.payload; },
    setSearchJobByText(state, action) { state.searchJobByText = action.payload; },
    setAllAppliedJobs(state, action) { state.allAppliedJobs = action.payload; },
    setSearchedQuery(state, action) { state.searchedQuery = action.payload; },
  },
});

export const {
  setAllJobs,
  setPaginationData, // Export new action
  setSingleJob, setAllAdminJobs, setSearchJobByText, setAllAppliedJobs, setSearchedQuery
} = jobSlice.actions;

// Export reducer
export default jobSlice.reducer;
