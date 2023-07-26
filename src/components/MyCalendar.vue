<template>
  <div>
    <table class="calendar-table">
      <thead>
        <tr>
          <th>日付</th>
          <th>曜日</th>
          <th>予定</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="day in days" :key="day.date">
          <td>{{ day.date }}</td>
          <td>{{ day.day }}</td>
          <td>ホワイト新橋SL店</td>
        </tr>
      </tbody>
    </table>
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