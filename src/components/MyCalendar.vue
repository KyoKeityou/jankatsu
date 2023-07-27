<template>
  <h3>マイカレンダー(プロ)&nbsp;&nbsp;&nbsp;{{ getCurrentYearMonth }}</h3>
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
      <el-table-column type="expand" width="40px">
        <template #default="props">
          <el-table 
            :data="props.row.detail" 
            :border="false"
            style="font-family: 'Meiryo', sans-serif; font-size: 10px;" 
          >
            <el-table-column width="127px" />
            <el-table-column prop="time" width="100" />
            <el-table-column prop="plan" />
            <el-table-column label="" prop="">
              <template #default="{ row }">
                <img src="../assets/Twitter.png" alt="Twitter" class="custom-image" v-if="row && row.plan !== '買い物(プライベート予定)'" />
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column label="日付" prop="date" width="40px"></el-table-column>
      <el-table-column label="曜日" prop="day" width="35px"></el-table-column>
      <el-table-column label="予定" prop="schedule">
        <template #default="{ row }">
          <span>{{ concatPlans(row.detail) }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const getRandomData = (selectedOptions) => {
      const options = [
        { time: '13:00～15:00', plan: '雀荘新宿店' },
        { time: '15:00～16:00', plan: '買い物(private)' },
        { time: '16:00～18:00', plan: '雀荘上野店' },
        { time: '18:00～20:00', plan: '新橋麻雀BAR' },
        { time: '22:00～24:00', plan: '銀座麻雀BAR' }
      ];
      // 選択されたオプションのインデックスを配列で保持する
      const selectedIndexes = selectedOptions.map((option) => options.indexOf(option));
      // ランダムなインデックスを選択し、すでに選ばれたものであれば再選択する
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * options.length);
      } while (selectedIndexes.includes(randomIndex));
      return options[randomIndex];
    };

    const calendarData = ref([]);
    const startDate = new Date();
    startDate.setDate(1); // 1日からスタート
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + 1); // 1ヶ月後まで
    endDate.setDate(0); // 月末の前日
    const selectedOptions = []; // 選択されたオプションの配列
    while (startDate <= endDate) {
      const date = startDate.getDate();
      const day = ['日', '月', '火', '水', '木', '金', '土'][startDate.getDay()];
      const detail = ref([]);
      const detailCount = 2;
      var i = 1;
      while (i <= detailCount) {
        const newData = getRandomData(selectedOptions); // 選択されたオプションを渡して再選択する
        selectedOptions.push(newData); // 選択されたオプションを配列に追加
        detail.value.push(newData);
        i++;
      }
      calendarData.value.push({ date, day, detail });
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

    // 「plan」列の文字列を連結して返す関数
    concatPlans(detail) {
      if (!detail || detail.length === 0) {
        return '';
      }
      return detail.map(item => item.plan).join('、');
    }
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

.custom-image {
  /* 画像に適用したいスタイルを指定 */
  cursor: pointer;
  display: block;
  margin: auto;
  text-align: center;
}
</style>