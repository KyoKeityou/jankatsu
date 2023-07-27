<template>
  <div class="calendar-table">
    <el-table 
      ref="myCalendarTable"
      :data="calendarData" 
      :border="true" 
      :show-header="false" 
      style="width: 100%; font-family: 'Meiryo', sans-serif; font-size: 12px;" 
      :row-class-name="getRowClassName"
      highlight-current-row
      @row-dblclick="handleRowDblClick"
    >
      <el-table-column type="expand">
        <template #default="props">
          <el-table :data="props.row.detail" :border="false">
            <el-table-column prop="time" />
            <el-table-column prop="plan" />
          </el-table>
        </template>
      </el-table-column>
      <el-table-column label="日付" prop="date" width="40px"></el-table-column>
      <el-table-column label="曜日" prop="day" width="40px"></el-table-column>
      <el-table-column label="予定" prop="schedule"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const calendarData = ref([]);
    const startDate = new Date();
    startDate.setDate(1); // 1日からスタート
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + 1); // 1ヶ月後まで
    endDate.setDate(0); // 月末の前日
    while (startDate <= endDate) {
      const date = startDate.getDate();
      const day = ['日', '月', '火', '水', '木', '金', '土'][startDate.getDay()];
      const schedule = '13:00～ 雀荘新宿店、18:00～ 新橋麻雀BAR';
      const detail = ref([]);
      const detailCount = 2;
      var i = 1;
      while (i <= detailCount) {
        const time = '13:00 ～ 17:00';
        const plan = '雀荘新宿店';
        detail.value.push({ time, plan });
        i++;
      }
      calendarData.value.push({ date, day, schedule, detail });
      startDate.setDate(startDate.getDate() + 1); // 1日進める
    }
    return {
      calendarData
    };
  },
  methods: {
    getRowClassName({row}) {
      // 土曜日または日曜日の場合は 'saturday-or-sunday' クラスを返す
      if (row.day === '土' || row.day === '日') {
        return 'saturday-or-sunday';
      }
      return ''; // それ以外の行は何も返さない
    },

    handleRowDblClick(row) {
      this.$refs.myCalendarTable.toggleRowExpansion(row);
    },
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