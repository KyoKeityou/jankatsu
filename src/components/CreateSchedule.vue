<template>
  <div class="create-schedule">
    <h2>スケジュール登録</h2>
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="auto"
      :label-position="left"
    >
      <el-form-item label="日付">
        <el-date-picker v-model="form.date" type="date" placeholder="選択してください" @change="updateDay" />
        <!-- <span>{{ selectedDay }}</span> -->
      </el-form-item>
      <el-form-item label="カテゴリ">
        <el-select v-model="form.category" placeholder="選択してください" @change="handleCategoryChange">
          <el-option label="常勤" value="c1"></el-option>
          <el-option label="ゲスト" value="c2"></el-option>
          <el-option label="タイトル戦" value="c3"></el-option>
          <el-option label="プライベート" value="c4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="!locationDisabled1" label="場所">
        <el-select v-model="form.location1" placeholder="選択してください">
          <el-option label="ドラゴン雀荘渋谷店" value="l1"></el-option>
          <el-option label="じゃんかつ池袋店" value="l2"></el-option>
          <el-option label="麻雀BAR銀座" value="l3"></el-option>
          <el-option label="麻雀BAR新橋" value="l4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="!locationDisabled2" label="場所">
        <el-input v-model="form.location2" placeholder="フリー入力" />
      </el-form-item>
      <el-form-item label="メモ">
        <el-input type="textarea" v-model="form.memo" />
      </el-form-item>
      <el-form-item label="開始時間">
        <el-time-picker v-model="form.timefrom" :picker-options="timeOptions" />
      </el-form-item>
      <el-form-item label="終了時間">
        <el-time-picker v-model="form.timeto" :picker-options="timeOptions" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">登録</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        date: null,
        category: "",
        location: "",
        memo: "",
        timefrom: null,
        timeto: null,
      },
      selectedDay: "",
      locationDisabled1: true,
      locationDisabled2: true,
      rules: {
        date: [{ required: true, message: "日付を選択してください", trigger: "change" }],
        category: [{ required: true, message: "カテゴリを選択してください", trigger: "change" }],
        location: [{ required: true, message: "場所を選択または入力してください", trigger: "change" }],
        memo: [{ required: true, message: "メモを入力してください", trigger: "blur" }],
        timefrom: [{ required: true, message: "開始時間を選択してください", trigger: "change" }],
        timeto: [{ required: true, message: "終了時間を選択してください", trigger: "change" }],
      },
      timeOptions: {
        selectableRange: "18:00:00 - 24:00:00",
      },
    };
  },
  methods: {
    updateDay() {
      if (this.form.date) {
        const day = new Date(this.form.date).toLocaleDateString("ja-JP", { weekday: "short" });
        this.selectedDay = day;
      } else {
        this.selectedDay = "";
      }
    },
    handleCategoryChange(value) {
      this.locationDisabled1 = value === "c3" || value === "c4";
      if (this.locationDisabled1) {
        this.form.location1 = "";
      }
      this.locationDisabled2 = value === "c1" || value === "c2";
      if (this.locationDisabled2) {
        this.form.location2 = "";
      }
    },
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // フォームのバリデーションが成功した場合、ここでフォームの送信処理を行います
          console.log("Form submitted");
        } else {
          console.log("Form validation failed");
          return false;
        }
      });
    },
  },
};
</script>

<style>
.create-schedule {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}
</style>
