import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
    name: "comment",
    initialState: {
        comments: [],
        allComments: []
    },

    reducers: {
        setComments: (state, action) => {
            // payload: all comments
            state.allComments = action.payload;
        },
        addNewComment: (state, action) => {
            // payload: newComment
            state.comments.push(action.payload);
        },
        updateComment: (state, action) => {
            // payload: update-comment
            state.comments = state.comments.map((comment) => {
                if (comment.id === action.payload.id) {
                    return {...comment, ...action.payload};
                }
            })
        },
        deleteComment: (state, action) => {
            // payload: id
            state.comments = state.comments.filter((comment) => {
                return comment.id !== action.payload;
            })
        }
    }
});

export const {
    setComments,
    addNewComment,
    updateComment,
    deleteComment
} = commentSlice.actions;

export default commentSlice.reducer