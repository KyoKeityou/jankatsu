<template>
  <el-table :data="tableData" :border="true">
    <el-table-column type="expand">
      <template #default="props">
        <div m="4">
          <el-table :data="props.row.detail" :border="true" :row-class-name="detailRowStyle">
            <el-table-column label="#" prop="no" width="48"/>
            <el-table-column label="時刻" prop="time" width="230"/>
            <el-table-column label="麻雀プロ／ゲスト" prop="puro" width="200"/>
            <el-table-column label="場所" prop="location"/>
            <el-table-column label="" prop="">
                <el-button size="small" @click="handleTwitter(scope.$index, scope.row)">Twitter</el-button>
            </el-table-column>
          </el-table>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="日付" prop="date" width="180" />
    <el-table-column label="曜日" prop="week" width="50" />
    <el-table-column label="予定" prop="puros" />
  </el-table>
</template>

<style>
.el-table .detail-row {
  background-color: lightblue
}
</style>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: '2023-08-01',
          week: '(火)',
          puros: '春子プロ(雀荘新宿店)、夏子プロ(ヒガシ麻雀BAR)',
          detail: [
            {
              no: '1',
              time: '15:00～19:00',
              puro: '春子プロ',
              location: '雀荘新宿店'
            },
            {
              no: '2',
              time: '18:00～24:00',
              puro: '夏子プロ',
              location: 'ヒガシ麻雀BAR'
            }
          ]
        },
        {
          date: '2023-08-02',
          week: '(水)',
          puros: '秋子プロ(雀荘新橋点)、冬子プロ(雀荘池袋店)、花子ゲスト(みなみ銀座BAR)',
          detail: [
            {
              no: '1',
              time: '13:00～16:00',
              puro: '秋子プロ',
              location: '雀荘新橋点'
            },
            {
              no: '2',
              time: '19:00～22:00',
              puro: '冬子プロ',
              location: '雀荘池袋店'
            },
            {
              no: '3',
              time: '20:00～23:00',
              puro: '花子ゲスト',
              location: 'みなみ銀座BAR'
            }
          ]
        },
        {
          date: '2023-08-03',
          week: '(木)',
          puros: '予定なし'
        },
        {
          date: '2023-08-04',
          week: '(金)',
          puros: '春子プロ(雀荘新宿店)、夏子プロ(ヒガシ麻雀BAR)',
          detail: [
            {
              no: '1',
              time: '15:00～19:00',
              puro: '春子プロ',
              location: '雀荘新宿店'
            },
            {
              no: '2',
              time: '18:00～24:00',
              puro: '夏子プロ',
              location: 'ヒガシ麻雀BAR'
            }
          ]
        }
      ]
    }
  },
  methods: {
    detailRowStyle() {
      return 'detail-row'
    }
  }
}
</script>
