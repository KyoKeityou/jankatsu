// scheduleData.js
const daysOfWeek = ['日', '月', '火', '水', '木', '金', '土'];
const categories = ['常勤', 'ゲスト', 'タイトル戦', 'プライベート', '-']; // 最後の空文字列は「空白」のカテゴリを表す
const titles = [
  'ドラゴン🐲雀荘渋谷店',
  '麻雀BAR🍾銀座',
  '🀄雀荘池袋店銀座',
  '麻雀BAR🍾新橋',
  'プロクイーン予選',
  '女流雀王選',
  'スーパー買い物',
  '予定なし',
];
const times = [
  '15-22.5時',
  '18-24時',
  '17-23時',
  '18-23.5時',
  '',
];

const generateRandomData = (date) => {
  const day = daysOfWeek[new Date(date.getFullYear(), date.getMonth(), date.getDate()).getDay()]; // 当月の曜日
  const category = categories[Math.floor(Math.random() * categories.length)]; // ランダムなカテゴリ
  let title = '';
  let time = '';

  // categoryに応じてtitleとtimeを設定
  switch (category) {
    case '常勤':
      title = titles[Math.floor(Math.random() * 2)]; // パターン1かパターン2のタイトルをランダムに選択
      time = times[Math.floor(Math.random() * 2)]; // パターン1かパターン2の時間をランダムに選択
      break;
    case 'ゲスト':
      title = titles[Math.floor(Math.random() * 2) + 2]; // パターン3かパターン4のタイトルをランダムに選択
      time = times[Math.floor(Math.random() * 2) + 2]; // パターン3かパターン4の時間をランダムに選択
      break;
    case 'タイトル戦':
      title = titles[Math.floor(Math.random() * 2) + 4]; // パターン5かパターン6のタイトルをランダムに選択
      break;
    case 'プライベート':
      title = 'スーパー買い物'; // パターン7のタイトル
      time = '9-19時'; // パターン7の時間
      break;
    default:
      title = '予定なし'; // 空白のカテゴリの場合は"予定なし"を設定
  }

  return { date: date.getDate(), day, category, title, time };
};

// scheduleDataの配列を生成
const scheduleData = [];
const currentDate = new Date();
const firstDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
const lastDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
for (let date = firstDate; date <= lastDate; date.setDate(date.getDate() + 1)) {
  scheduleData.push(generateRandomData(date));
}

export { scheduleData };
