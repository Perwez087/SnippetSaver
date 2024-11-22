import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  snippets : localStorage.getItem('snippets') ? JSON.parse(localStorage.getItem('snippets')) :[]
};

export const snippetSlice = createSlice({
  name: "snippet",
  initialState,
  reducers: {
    addToSnippet : (state,action) =>{
     const snippet = action.payload;
     //existingSnippet
     const existingSnippet = state.snippets.find(s=> s.title === snippet.title);
     if(existingSnippet){
        toast.error('Snippet already exists');
        return;
     }
     state.snippets.push(snippet);
     localStorage.setItem('snippets',JSON.stringify(state.snippets));
     toast.success('Snippet added successfully');
    },
    updateToSnippet: (state,action) =>{
      const snippet = action.payload;
      const index = state.snippets.findIndex((s) => s._id === snippet._id);
 
      if(index >= 0){
        state.snippets[index] = snippet;
        localStorage.setItem('snippets', JSON.stringify(state.snippets));
        toast.success('Snippet updated successfully');
      }
    },
    resetAllSnippet: (state) =>{
      state.snippets = [];
      localStorage.removeItem('snippets');
      toast.success('All snippets reset successfully');
    },
    removeFromSnippet: (state,action) =>{
      const snippetId = action.payload;
      const index = state.snippets.findIndex((s) => s._id === snippetId);

      if(index >= 0){
        state.snippets.splice(index, 1);
        localStorage.setItem('snippets', JSON.stringify(state.snippets));
        toast.success('Snippet removed successfully');
      }
    }
  },
});

// Action creators are generated for each case reducer function

export const {
  addToSnippet,
  updateToSnippet,
  removeFromSnippet,
  resetAllSnippet,
} = snippetSlice.actions;

export default snippetSlice.reducer;
