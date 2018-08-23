<template>
  <div class="pageComments">
    <h1>Comments</h1>
    <form class="comments__form" @submit.prevent="addComment" action="#" method="post">
      <label class="comments__label" for="commentText">Your comment</label>
      <textarea class="comments__textarea" name="comment_text" v-model="commentText" id="commentText" rows="5"></textarea>
      <button class="comments__btn" type="submit">Send</button>
    </form>
    <div v-if="numberComments" class="comments">
      <comment class="comments__item" v-for="comment in comments" :comment="comment" :key="comment.comment_id"/>
    </div>
    <div v-else>
      <p class="text-center">No comments =)</p>
    </div>
  </div>
</template>

<script>
import Comment from "@/components/Comment.vue";
import { mapGetters } from "vuex";

export default {
  name: "comments",
  components: {
    Comment
  },
  data() {
    return {
      commentText: ""
    };
  },
  computed: {
    ...mapGetters(["comments", "numberComments"])
  },
  methods: {
    getComments() {
      this.$store.dispatch("getComments");
    },
    addComment() {
      this.$store
        .dispatch("addComment", { comment: this.commentText })
        .then(() => {
          this.commentText = "";
        });
    }
  },
  created() {
    this.getComments();
  }
};
</script>

<style lang="scss">
.comments {
  &__form {
    width: 400px;
    margin: 0 auto;
    border-bottom: 2px solid #2c3e50;
    padding: 10px;
    margin-bottom: 20px;
  }

  &__textarea {
    width: 100%;
    resize: none;
  }

  &__btn {
    background-color: #42b983;
    border: none;
    padding: 5px 10px;
    color: #fff;
    transition: background-color 0.2s ease-in-out;

    &:hover {
      background-color: #2c3e50;
    }
  }
}
</style>
