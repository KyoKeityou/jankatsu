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
      >
        <!-- @row-dblclick="handleRowDblClick" -->

        <el-table-column prop="date" width="25" style="align-items: center;"></el-table-column>
        <el-table-column prop="day" width="30" style="align-items: center;"></el-table-column>
        <el-table-column prop="category" width="75" style="align-items: center;">
          <template #default="{ row }">
              <el-button v-if="row.category !== ''" class="category-button" :class="getCategoryClass(row.category)" size="mini">
                {{ row.category }}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="title" width="200">
          <template #default="{ row }">
            <div class="title-cell">{{ row.title }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="time" width="auto"></el-table-column>
        <el-table-column width="40">
          <!-- <template #default="{ row }"> -->
            <!-- <el-icon class="edit-icon" @click="handleEditClick(row)" ><Edit /></el-icon> -->
            <el-icon class="edit-icon"><Edit /></el-icon>
          <!-- </template> -->
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
// import { useRouter } from 'vue-router';
import { ElIcon } from 'element-plus';
import { ArrowLeftBold, ArrowRightBold } from '@element-plus/icons-vue';
import { scheduleData } from '../data/scheduleData';

export default {
  setup() {
    const currentYear = ref(new Date().getFullYear());
    const currentMonth = ref(new Date().getMonth() + 1);
    const scheduleDataRef = ref(scheduleData);
    return {
      currentYear,
      currentMonth,
      scheduleData: scheduleDataRef,
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
    // handleRowDblClick(date) {
    //   const router = useRouter();
    //   // titleをクエリパラメータとして渡してCreateSchedule.vueに遷移
    //   router.push({ name: 'CreateSchedule', query: { date } });
    // },
    getCategoryClass(category) {
      if (category === '常勤') {
        return 'category-joukin';
      } else if (category === 'ゲスト') {
        return 'category-guest';
      } else if (category === 'タイトル戦') {
        return 'category-title';
      } else if (category === 'プライベート') {
        return 'category-private';
      } else if (category === '-') {
        return 'category-empty';
      } else {
        return '';
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
  background: #a4e1ec;
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
  margin-left: 60px;
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
.pro-schedule .el-table .cell {
  padding: 0 2px; 
}
.title-cell {
  padding-left: 8px;
}
.el-table__body tr.current-row > td {
  background: #36dacc !important;
}
/* カテゴリーボタンのスタイル */
.category-button {
  pointer-events: none; /* ボタンをクリック不可にする */
  cursor: default; /* マウスカーソルをデフォルトにする */
  border: none; /* ボーダーをなしにする */
  font-family: 'Meiryo', sans-serif;
  font-size: 8px !important;
  width: 100%;
  height: 12px !important; /* ボタンの高さを調整 */
}
/* カテゴリーに応じて背景色とテキスト色を指定 */
.category-button.category-joukin {
  background-color: #08799b; /* category: 常勤 */
  color: white;
}
.category-button.category-guest {
  background-color: #f365d0; /* category: ゲスト */
  color: white;
}
.category-button.category-title {
  background-color: #ff3333; /* category: タイトル戦 */
  color: white;
}
.category-button.category-private {
  background-color: #e7c21d; /* category: プライベート */
  color: white;
}
.category-button.category-empty {
  background-color: #e5e5e5; /* category: 空白 */
  color: black;
}
.edit-icon {
  font-size: 16px;
  margin-left: 8px;
  cursor: pointer;
}
</style>
