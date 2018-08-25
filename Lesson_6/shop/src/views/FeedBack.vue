<template>
  <div class="page-feedback">
    <h1>Feedback</h1>
    <FeedbackForm/>
  </div>
</template>

<script>
import FeedbackForm from "@/components/FeedbackForm.vue";

export default {
  name: "feedback",
  components: {
    FeedbackForm
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
