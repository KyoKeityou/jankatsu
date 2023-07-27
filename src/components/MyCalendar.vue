<template>
  <div class="calendar-container">
    <el-table :data="days" border style="width: 100%">
      <el-table-column label="日付" prop="date" width="100"></el-table-column>
      <el-table-column label="曜日" prop="day" width="100"></el-table-column>
      <el-table-column label="予定"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const days = ref([]);

    // カレンダーの日付を生成し、日付と曜日をオブジェクトとしてdays配列に追加
    const startDate = new Date();
    startDate.setDate(1); // 1日からスタート
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + 1); // 1ヶ月後まで
    endDate.setDate(0); // 月末の前日

    while (startDate <= endDate) {
      const date = startDate.getDate();
      const day = ['日', '月', '火', '水', '木', '金', '土'][startDate.getDay()];

      days.value.push({ date, day });
      startDate.setDate(startDate.getDate() + 1); // 1日進める
    }

    return {
      days,
    };
  },
};
</script>

<style>
.calendar-container {
  height: 100vh;
  /* overflow-y: auto; */
  font-family: "Meiryo", sans-serif;
  font-size: 8px;
}

.calendar-table {
  border-collapse: collapse;
  /* width: 100%; */
}

.calendar-table th, .calendar-table td {
  border: 1px solid #000;
  /* padding: 8px; */
  /* text-align: center; */
  width: 200px;
}
</style>