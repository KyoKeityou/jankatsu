<template>
  <div class="create-schedule">
    <!-- フォーム要素をここに記述します -->
    <el-time-picker
    v-model="startTime"
    :picker-options="{
        start: '00:00',
        step: '00:30',
        end: '23:30'
    }"
    ></el-time-picker>

    <el-time-picker
    v-model="endTime"
    :picker-options="{
        start: '00:30',
        step: '00:30',
        end: '23:59'
    }"
    ></el-time-picker>

    <el-input v-model="title" placeholder="タイトル"></el-input>

    <el-input v-model="location" placeholder="場所"></el-input>

    <el-radio-group v-model="privateFlag">
    <el-radio-button :label="true">プライベート</el-radio-button>
    <el-radio-button :label="false">パブリック</el-radio-button>
    </el-radio-group>

    <el-button @click="submitForm">登録</el-button>
    <el-button @click="cancelForm">キャンセル</el-button>
  </div>  
</template>
  
<script>
import { ref } from 'vue';

export default {
  setup() {
    const startTime = ref('');
    const endTime = ref('');
    const title = ref('');
    const location = ref('');
    const privateFlag = ref(false);

    // フォーム送信処理
    const submitForm = () => {
    // フォーム送信のロジックをここに実装します
    // 上記の ref 変数を使ってフォームデータにアクセスできます
    };

    // フォームキャンセル処理
    const cancelForm = () => {
    // フォームのキャンセルのロジックをここに実装します
    // 例えば、前のページに戻るなどの処理を行います
    };

    return {
    startTime,
    endTime,
    title,
    location,
    privateFlag,
    submitForm,
    cancelForm,
    };
  },
};
</script>
  
<style>
/* コンポーネント固有のスタイルをここに記述します（必要な場合のみ） */
</style>
  