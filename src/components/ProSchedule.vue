<!-- ProSchedule.vue -->
<template>
  <div>
    <div class="schedule-header">
      <el-button type="primary" :icon="prevIcon" @click="prevMonth" plain class="prev-button"></el-button>
      <h4 class="year-month">{{ currentYear }}年{{ currentMonth }}月</h4>
      <el-button type="primary" :icon="nextIcon" @click="nextMonth" plain class="next-button"></el-button>
      <el-icon class="custom-image" :size="30" color="#409eff"><Plus /></el-icon>
      <img src="../assets/Twitter.png" alt="Twitter" class="custom-image" />
    </div>
    <div class="pro-schedule">
      <el-table 
        :data="scheduleData" 
        :border="false" 
        :show-header="false" 
        style="width: 100%; font-family: 'Meiryo', sans-serif; font-size: 12px;" 
        :row-class-name="getRowClassName"
        highlight-current-row
        @row-dblclick="handleRowDblClick"
      >
        <el-table-column prop="date" width="40"></el-table-column>
        <el-table-column prop="day" width="40"></el-table-column>
        <el-table-column prop="title" width="400"></el-table-column>
        <el-table-column prop="time"></el-table-column>

      </el-table>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElIcon } from 'element-plus';
import { ArrowLeftBold, ArrowRightBold } from '@element-plus/icons-vue';

export default {
  setup() {
    const currentYear = ref(new Date().getFullYear());
    const currentMonth = ref(new Date().getMonth() + 1);
    const scheduleData = ref([]);
    const updateScheduleData = () => {
      const startDate = new Date(currentYear.value, currentMonth.value - 1, 1);
      const endDate = new Date(startDate);
      endDate.setMonth(startDate.getMonth() + 1);
      endDate.setDate(0);
      var i = 0;
      var time = [];
      var title = [];
      scheduleData.value = [];
      while (startDate <= endDate) {
        const date = startDate.getDate();
        const day = ['日', '月', '火', '水', '木', '金', '土'][startDate.getDay()];
        if (i <= 4) {
          time = ['13-17'];
          title = ['雀荘新宿店'];
        } else {
          time = [];
          title = [];
        }
        scheduleData.value.push({ date, day, time, title });
        startDate.setDate(startDate.getDate() + 1); // 1日進める
        i++;
      }
    };
    updateScheduleData();
    return {
      currentYear,
      currentMonth,
      scheduleData,
    };
  },
  computed: {
    getCurrentYearMonth() {
      // 現在の年と月を取得して返す
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      // "YYYY年M月"のフォーマットに変換して返す
      return `${year}年${month}月`;
    },
    prevIcon() {
      return ArrowLeftBold;
    },
    nextIcon() {
      return ArrowRightBold;
    },
    ElIcon,
  },
  methods: {
    getRowClassName({row}) {
      // 土曜日または日曜日の場合は 'saturday-or-sunday' クラスを返す
      if (row.day === '土' || row.day === '日') {
        return 'saturday-or-sunday';
      }
      return ''; // それ以外の行は何も返さない
    },
    handleRowDblClick(date) {
      const router = useRouter();
      // titleをクエリパラメータとして渡してCreateSchedule.vueに遷移
      router.push({ name: 'CreateSchedule', query: { date } });
    },
    updateScheduleData() {
      const scheduleData = ref([]);
      const startDate = new Date(this.currentYear, this.currentMonth - 1, 1);
      const endDate = new Date(startDate);
      endDate.setMonth(startDate.getMonth() + 1);
      endDate.setDate(0);
      var i = 0;
      var time = [];
      var title = [];
      this.scheduleData = [];
      while (startDate <= endDate) {
        const date = startDate.getDate();
        const day = ['日', '月', '火', '水', '木', '金', '土'][startDate.getDay()];
        if (i <= 4) {
          time = ['13:00～24:00'];
          title = ['雀荘新宿店'];
        } else {
          time = [];
          title = [];
        }
        scheduleData.value.push({ date, day, time, title });
        startDate.setDate(startDate.getDate() + 1); // 1日進める
        i++;
      }
    },
    data() {
      return {
        currentYear: new Date().getFullYear(),
        currentMonth: new Date().getMonth() + 1,
        scheduleData: [],
      }
    }
  }
};
</script>

<style>
.schedule-header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px; /* 年月の左右に固定の間隔を設定 */
  font-family: 'Meiryo', sans-serif; 
}
.prev-button {
  margin-right: 20px; /* 前月ボタンと年月の間隔を設定 */
  width: 70px;
}
.next-button {
  margin-left: 20px; /* 翌月ボタンと年月の間隔を設定 */
  width: 70px;
}
.year-month {
  text-align: center; /* 年月を中央寄せ */
}
.custom-image {
  /* 画像に適用したいスタイルを指定 */
  cursor: pointer;
  display: block;
  margin-left: 100px;
}
.pro-schedule .el-table__row {
  padding: 0;
}
.pro-schedule .el-table__header th {
  padding: 0;
}
.pro-schedule .el-table__body td {
  padding: 0; 
}
/* 土曜日または日曜日の行のスタイル */
.pro-schedule .saturday-or-sunday {
  background-color: #d8e9f5;
}
/* 選択行のスタイル */
.el-table__body tr.current-row > td {
  background: #36dacc !important;
}
</style>
