import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  allJobs: [],
  allAdminJobs: [],
  bookmarkedJobs: JSON.parse(localStorage.getItem("bookmarks")) || [],
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
    setBookmarkedJobsList: (state, action) => {
      state.bookmarkedJobs = action.payload || [];
    },

    setBookmarkedJobs: (state, action) => {
      const job = action.payload;
      const exists = state.bookmarkedJobs.find((j) => j._id === job._id);

      if (exists) {
        state.bookmarkedJobs = state.bookmarkedJobs.filter((j) => j._id !== job._id);
      } else {
        state.bookmarkedJobs.push(job);
      }

      // Save to localStorage every time a bookmark is added or removed
      localStorage.setItem("bookmarks", JSON.stringify(state.bookmarkedJobs));
    },
  },
});

export const {
  setAllJobs,
  setPaginationData, // Export new action
  setSingleJob, setAllAdminJobs, setSearchJobByText, setAllAppliedJobs, setSearchedQuery, setBookmarkedJobs, setBookmarkedJobsList
} = jobSlice.actions;


// Export reducer
export default jobSlice.reducer;
