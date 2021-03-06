import API from "@/api";

const Comments = {
  state: {
    comments: []
  },
  getters: {
    comments(state) {
      return state.comments;
    },
    numberComments(state) {
      return state.comments.length;
    }
  },
  mutations: {
    setComments(state, comments) {
      state.comments = comments;
    },
    likeComment(state, resComment) {
      for (let comment of state.comments) {
        if (comment.comment_id === resComment.comment_id) {
          comment.likes = resComment.likes;
          break;
        }
      }
    }
  },
  actions: {
    async getComments({ commit }) {
      try {
        let comments = await API.getComments();

        commit("setComments", comments);
      } catch (error) {
        throw error;
      }
    },

    async addComment({ dispatch }, { comment }) {
      try {
        await API.addComment(comment);
        dispatch("getComments");
      } catch (error) {
        throw error;
      }
    },

    async removeComment({ dispatch }, { comment }) {
      try {
        await API.removeComment(comment.comment_id);
        dispatch("getComments");
      } catch (error) {
        throw error;
      }
    },

    async likeComment({ commit }, { comment }) {
      try {
        let res = await API.likeComment(comment.comment_id);
        commit("likeComment", res);
      } catch (error) {
        throw error;
      }
    }
  }
};

export default Comments;
