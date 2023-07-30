<!-- HomePage.vue -->
<template>
  <div>
    <h1>雀活モック画面サイト</h1>
    <p>麻雀プロ用</p>
    <router-link to="./proschedule">月間スケジュール</router-link><br />
    <router-link to="./createschedule">スケジュール登録（仕掛中）</router-link>
  </div>
</template>

<script>
export default {
  name: 'HomePage'
};
</script>

<style>
</style>
  