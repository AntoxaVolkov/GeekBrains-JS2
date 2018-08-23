<template>
  <div class="comment">
    <p class="product__price">{{comment.text}}</p>
    <div class="comment__actions">
      <button  @click="likeComment" class="comment__like"><span>&#9829;</span> {{comment.likes}}</button>
      <button  @click="removeComment" class="comment__btn comment__btn--red">Remove</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "comment",
  props: ["comment"],
  methods: {
    addComment() {
      this.$store.dispatch("addComment", { comment: this.comment });
    },
    removeComment() {
      this.$store.dispatch("removeComment", {
        comment: this.comment
      });
    },
    likeComment() {
      this.$store.dispatch("likeComment", {
        comment: this.comment
      });
    }
  }
};
</script>

<style lang="scss">
.comment {
  width: 400px;
  margin: 0 auto;
  border-bottom: 2px solid #2c3e50;
  padding: 10px;
  margin-bottom: 20px;
  text-align: left;

  &__actions {
    display: flex;
    justify-content: space-between;
  }

  &__like {
    background: none;
    color: #2c3e50;
    border: none;

    span {
      color: rgb(248, 48, 48);
      transition: transform 0.3s;
    }

    &:hover {
      background: #eee;
      span {
        transform: scale(1.1);
      }
    }
  }

  &__btn {
    background-color: #42b983;
    border: none;
    padding: 5px 10px;
    color: #fff;
    transition: background-color 0.2s ease-in-out;

    &--red {
      background-color: rgb(248, 48, 48);
    }

    &:hover {
      background-color: #2c3e50;
    }
  }
}
</style>
