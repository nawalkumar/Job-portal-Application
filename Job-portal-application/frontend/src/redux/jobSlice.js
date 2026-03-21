import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  allJobs: [],
  allAdminJobs: [],
  bookmarkedJobs: JSON.parse(localStorage.getItem("bookmarks")) || [],
  singleJob: null,
  searchJobByText: "",
  allAppliedJobs: [],
  searchedQuery: "",
  recommendedJobs: [],
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
    setRecommendedJobs: (state, action) => {
      state.recommendedJobs = action.payload;
    },
    // ... keep all your other reducers exactly as they are ...
    setSingleJob(state, action) { state.singleJob = action.payload; },
    setAllAdminJobs(state, action) { state.allAdminJobs = action.payload; },
    setSearchJobByText(state, action) { state.searchJobByText = action.payload; },
    setAllAppliedJobs(state, action) { state.allAppliedJobs = action.payload; },
    setSearchedQuery(state, action) { state.searchedQuery = action.payload; },

    setBookmarkedJobs: (state, action) => {
      const job = action.payload;

      // If for some reason bookmarkedJobs is missing, initialize it immediately
      if (!state.bookmarkedJobs) {
        state.bookmarkedJobs = [];
      }

      const exists = state.bookmarkedJobs.find((j) => j._id === job._id);

      if (exists) {
        state.bookmarkedJobs = state.bookmarkedJobs.filter((j) => j._id !== job._id);
      } else {
        state.bookmarkedJobs.push(job);
      }

      localStorage.setItem("bookmarks", JSON.stringify(state.bookmarkedJobs));
    },
  },
});

export const {
  setAllJobs,
  setPaginationData, // Export new action
  setSingleJob, setAllAdminJobs, setSearchJobByText, setAllAppliedJobs, setSearchedQuery, setBookmarkedJobs
} = jobSlice.actions;


// Export reducer
export default jobSlice.reducer;
