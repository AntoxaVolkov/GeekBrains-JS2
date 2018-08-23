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
    likeComment(state, commentId) {
      for (let comment of state.comments) {
        if (comment.comment_id === commentId) {
          ++comment.likes;
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
        console.log(error);
      }
    },

    async addComment({ dispatch }, { comment }) {
      try {
        await API.addComment(comment);
        dispatch("getComments");
      } catch (error) {
        console.log(error);
      }
    },

    async removeComment({ dispatch }, { comment }) {
      try {
        await API.removeComment(comment.comment_id);
        dispatch("getComments");
      } catch (error) {
        console.log(error);
      }
    },

    async likeComment({ commit }, { comment }) {
      try {
        await API.likeComment(comment.comment_id);
        commit("likeComment", comment.comment_id);
      } catch (error) {
        console.log(error);
      }
    }
  }
};

export default Comments;
