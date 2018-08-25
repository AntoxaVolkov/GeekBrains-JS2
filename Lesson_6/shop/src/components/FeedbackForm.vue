<template>
  <div class="feedback-form">
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
    <el-form-item label="Your name" prop="name">
      <el-input placeholder="Jhon" v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="Your phone" prop="tel">
      <el-input placeholder="+7(000)000-0000" v-model="ruleForm.tel"></el-input>
    </el-form-item>
    <el-form-item label="Your email" prop="email">
      <el-input placeholder="myemail@example.com" :type="'email'" v-model="ruleForm.email"></el-input>
    </el-form-item>
    <el-form-item label="Your city" prop="city">
      <el-autocomplete
        class="inline-input"
        v-model="ruleForm.city"
        :fetch-suggestions="querySearch"
        placeholder="Please Input"
        :trigger-on-focus="false"
        @select="handleSelect"
        style="width: 100%;"
      ></el-autocomplete>
    </el-form-item>
    <el-form-item label="Date of birth" prop="date">
      <el-date-picker 
        type="date" 
        placeholder="Pick a date" 
        v-model="ruleForm.date" 
        style="width: 100%;"
      ></el-date-picker>
    </el-form-item>
    <el-form-item label="Your message" prop="message">
      <el-input type="textarea" v-model="ruleForm.message"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">Create</el-button>
      <el-button @click="resetForm('ruleForm')">Reset</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>

<script>
export default {
  name: "feedback-form",
  data() {
    return {
      ruleForm: {
        name: "",
        tel: "",
        email: "",
        city: "",
        date: "",
        message: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "Please input your name",
            trigger: "blur"
          },
          {
            min: 2,
            max: 55,
            message: "Length should be 2 to 55",
            trigger: "blur"
          },
          {
            pattern: "^[a-zA-Zа-яА-ЯёЁ]+$",
            message: "Only letters allowed",
            trigger: "blur"
          }
        ],
        tel: [
          {
            required: true,
            message: "Please input your the phone number",
            trigger: "blur"
          },
          {
            pattern: /^\+7\(\d{3}\)\d{3}-\d{4}$/,
            message: "The phone number must be in the format +7(000)000-0000",
            trigger: "blur"
          }
        ],
        email: [
          {
            pattern: "^[a-zA-Z]+[.-]?[a-zA-Z]+@[a-zA-Z]+.[a-zA-Z]{2,4}$",
            message: `The email must be in the format my-mail@example.com or my.mail@example.com" 
              or mymail@example.com`,
            trigger: "blur"
          }
        ],
        city: [
          {
            required: true,
            message: "Please select city",
            trigger: "change"
          }
        ],
        date: [
          {
            type: "date",
            required: true,
            message: "Please pick a date",
            trigger: "blur"
          }
        ],
        message: [
          {
            required: true,
            message: "Please input message",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$notify({
            title: "Success",
            message: "Your feedback has been sent successfully ",
            type: "success"
          });
        } else {
          this.$notify({
            title: "Warning",
            message: "Incorrectly filled form",
            type: "warning"
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async querySearch(queryString, cb) {
      var results = await this.searchCity(queryString);
      cb(results);
    },
    searchCity(queryString) {
      let cities = [
        { value: "Ivanovo" },
        { value: "Moscow" },
        { value: "St. Petersburg" },
        { value: "Yaroslavl" },
        { value: "Nizhny Novgorod" },
        { value: "Kazan" },
        { value: "Ivankovo" }
      ];
      return new Promise(res => {
        setTimeout(() => {
          let result = queryString
            ? cities.filter(
                city =>
                  city.value
                    .toLowerCase()
                    .indexOf(queryString.toLowerCase()) === 0
              )
            : cities;
          res(result);
        }, 1000);
      });
    },
    handleSelect(item) {
      console.log(item);
    }
  }
};
</script>
