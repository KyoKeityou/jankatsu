<template>
  <div class="calendar-table">
    <el-table 
      ref="myCalendarTable"
      :data="days" 
      :border="true" 
      :show-header="false" 
      style="width: 100%; font-family: 'Meiryo', sans-serif; font-size: 12px;" 
      :row-class-name="getRowClassName"
      highlight-current-row
    >
      <el-table-column label="日付" prop="date" width="40px"></el-table-column>
      <el-table-column label="曜日" prop="day" width="40px"></el-table-column>
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
      selectedRowIndex: null
    };
  },
  methods: {
    getRowClassName({row}) {
      // 土曜日または日曜日の場合は 'saturday-or-sunday' クラスを返す
      if (row.day === '土' || row.day === '日') {
        return 'saturday-or-sunday';
      }
      return ''; // それ以外の行は何も返さない
    }
  }
};
</script>

<style>
/* テーブルのセル（行）のスタイル */
.calendar-table .el-table__row {
  height: 22px; /* セルの高さを指定 */
  padding: 0; /* セルの余白（パディング）をなくす */
}

/* テーブルのヘッダーセルのスタイル */
.calendar-table .el-table__header th {
  padding: 0; /* ヘッダーセルの余白（パディング）をなくす */
}

/* テーブルのセル（データ）のスタイル */
.calendar-table .el-table__body td {
  padding: 0; /* セル（データ）の余白（パディング）をなくす */
}

/* 土曜日または日曜日の行のスタイル */
.calendar-table .saturday-or-sunday {
  background-color: #CCFFFF; /* 背景色を #CCFFFF に設定 */
}

/* 選択行のスタイル */
.el-table__body tr.current-row > td {
  background: #28A458 !important;
}
</style>