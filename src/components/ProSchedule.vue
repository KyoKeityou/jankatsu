<template>
  <h4>プロスケジュール&nbsp;&nbsp;&nbsp;{{ getCurrentYearMonth }}</h4>
  <div class="pro-schedule">
    <el-table 
      :data="scheduleData" 
      :border="true" 
      :show-header="false" 
      style="width: 100%; font-family: 'Meiryo', sans-serif; font-size: 14px;" 
      :row-class-name="getRowClassName"
      highlight-current-row
      @row-dblclick="handleRowDblClick"
    >
      <el-table-column prop="date" width="45"></el-table-column>
      <el-table-column prop="day" width="45"></el-table-column>
      <el-table-column prop="time" width="150">
        <template #default="{ row }">
          <div v-if="row.time">{{ row.time[0] }}</div>
          <div v-if="row.time && row.time[1]">{{ row.time[1] }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="title">
        <template #default="{ row }">
          <div v-if="row.title">{{ row.title[0] }}</div>
          <div v-if="row.title && row.title[1]">{{ row.title[1] }}</div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { ref } from 'vue';
export default {
  setup() {
    const scheduleData = ref([]);
    const startDate = new Date();
    startDate.setDate(1); // 1日からスタート
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + 1); // 1ヶ月後まで
    endDate.setDate(0); // 月末の前日
    var i = 0;
    var time = [];
    var title = [];
    while (startDate <= endDate) {
      const date = startDate.getDate();
      const day = ['日', '月', '火', '水', '木', '金', '土'][startDate.getDay()];
      if (i <= 4) {
        time = ['10:00～12:00', '13:00～15:00'];
        title = ['予定1', '予定2'];
      } else {
        time = [];
        title = [];
      }
      scheduleData.value.push({ date, day, time, title });
      startDate.setDate(startDate.getDate() + 1); // 1日進める
      i++;
    }
    return {
      scheduleData,
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
  },
  computed: {
    getCurrentYearMonth() {
      // 現在の年と月を取得
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      // "YYYY年M月"のフォーマットに変換して返す
      return `${year}年${month}月`;
    }
  }
};
</script>

<style>
/* テーブルのセル（行）のスタイル */
.pro-schedule .el-table__row {
  height: 50px; /* セルの高さを指定 */
  padding: 0; /* セルの余白（パディング）をなくす */
}

/* テーブルのヘッダーセルのスタイル */
.pro-schedule .el-table__header th {
  padding: 0; /* ヘッダーセルの余白（パディング）をなくす */
}

/* テーブルのセル（データ）のスタイル */
.pro-schedule .el-table__body td {
  padding: 0; /* セル（データ）の余白（パディング）をなくす */
}

/* 土曜日または日曜日の行のスタイル */
.pro-schedule .saturday-or-sunday {
  background-color: #CCFFFF; /* 背景色を #CCFFFF に設定 */
}

/* 選択行のスタイル */
.el-table__body tr.current-row > td {
  background: #28A458 !important;
}
</style>
