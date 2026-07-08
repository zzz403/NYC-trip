// NYC 三日行程数据 — 坐标为真实经纬度 [lat, lng]
// reservation: 'required' 需预约 | 'suggested' 建议预约 | 'free' 免费无需预约 | 'optional' 可选 | null 无

export const HOTEL = {
  id: 'hotel',
  nameZh: 'Moxy NYC 时代广场酒店',
  nameEn: 'Moxy NYC Times Square',
  addr: '485 7th Ave & 36th St, NY 10018',
  coord: [40.7523, -73.9891],
  note: '三天的起点与终点 · 离帝国大厦步行5分钟',
}

export const DAYS = [
  {
    id: 1,
    label: 'Day 01',
    zone: '中城 Midtown',
    date: '8月1日 周六',
    color: '#C25A34', // 赤陶 terracotta
    ink: '#8C3A1E',
    dateNote: '航班落地 EWR 后进城，约 13:30 抵店，下午+晚上压缩版',
    flight: {
      dir: '去程',
      text: 'Porter PD2125 · YTZ 09:10 → EWR 10:40 · 落地后海关+行李+进城预留约 2h',
    },
    stops: [
      { id: 'd1-lunch', time: '13:30', nameZh: '熊猫快餐 午餐', nameEn: 'Panda Express', coord: [40.7519, -73.9884], note: '先到酒店寄存行李，就近解决午饭，不用挑时间', reservation: null, kind: 'food' },
      { id: 'd1-esb', time: '14:30', nameZh: '帝国大厦', nameEn: 'Empire State Building', coord: [40.7484, -73.9857], note: '走路5分钟，86层观景台。选 14:30 左右场次', reservation: 'required', kind: 'sight' },
      { id: 'd1-nypl', time: '16:00', nameZh: '纽约公共图书馆 + 布莱恩特公园', nameEn: 'NY Public Library + Bryant Park', coord: [40.7532, -73.9823], note: '免费参观，门口狮子雕像打卡', reservation: 'free', kind: 'sight' },
      { id: 'd1-times', time: '17:00', nameZh: '时代广场', nameEn: 'Times Square', coord: [40.7580, -73.9855], note: '逛街 + 晚饭，霓虹灯核心区', reservation: null, kind: 'sight' },
      { id: 'd1-caroline', time: '20:00', nameZh: "Caroline's 喜剧俱乐部", nameEn: "Caroline's on Broadway", coord: [40.7610, -73.9840], note: '1626 Broadway · 20:00 或 21:30 场，走路可达。周末易满', reservation: 'required', kind: 'night' },
    ],
  },
  {
    id: 2,
    label: 'Day 02',
    zone: '下城 Downtown',
    date: '8月2日 周日',
    color: '#2E6E85', // 褪色青 faded teal
    ink: '#1E4E5E',
    dateNote: '全天下城，海港+纪念馆+爵士夜',
    flight: null,
    stops: [
      { id: 'd2-ferry', time: '09:00', nameZh: '自由女神官方渡轮码头', nameEn: 'Statue City Cruises · Battery Park', coord: [40.7019, -74.0165], note: '09:00 出发，官方渡轮登船口', reservation: 'required', kind: 'transit' },
      { id: 'd2-liberty', time: '09:30', nameZh: '自由女神像（底座票）', nameEn: 'Statue of Liberty · Pedestal', coord: [40.6892, -74.0445], note: '跳过埃利斯岛省 1.5–2h；皇冠票已售罄，底座票只比普通贵 $1.2，性价比最高', reservation: 'required', kind: 'sight' },
      { id: 'd2-911', time: '13:30', nameZh: '9/11 纪念馆 + 博物馆', nameEn: '9/11 Memorial & Museum', coord: [40.7116, -74.0133], note: '180 Greenwich St · 户外纪念广场免费，室内博物馆必须提前订时段票', reservation: 'required', kind: 'sight' },
      { id: 'd2-bull', time: '15:00', nameZh: '华尔街 · 铜牛', nameEn: 'Charging Bull', coord: [40.7056, -74.0134], note: '顺路拍照；证交所内部不对公众开放，只能外面拍', reservation: 'free', kind: 'sight' },
      { id: 'd2-siferry', time: '16:00', nameZh: '史泰登岛免费渡轮', nameEn: 'Staten Island Ferry', coord: [40.7011, -74.0131], note: 'Whitehall Terminal · 免费看日落，自由女神远景 + 曼哈顿天际线，随到随上', reservation: 'free', kind: 'transit' },
      { id: 'd2-vanguard', time: '20:00', nameZh: 'Village Vanguard 爵士俱乐部', nameEn: 'Village Vanguard', coord: [40.7360, -74.0017], note: '178 7th Ave S · 1935年开业老牌。备选 Blue Note / Smalls，看阵容再订', reservation: 'required', kind: 'night' },
    ],
  },
  {
    id: 3,
    label: 'Day 03',
    zone: '上城 Uptown',
    date: '8月3日 周一',
    color: '#5E7A38', // 橄榄绿 olive
    ink: '#3F5623',
    dateNote: '上城半天 · 15:00–15:15 前必须离店去机场',
    flight: {
      dir: '回程',
      text: 'Porter PD2142 · EWR 19:25 → YTZ 21:00 · 只需普通 TSA 安检，酒店最晚 15:15 出发',
    },
    stops: [
      { id: 'd3-columbia', time: '08:45', nameZh: '哥伦比亚大学', nameEn: 'Columbia University', coord: [40.8075, -73.9626], note: '自由参观校园无需预约；时间紧张这站可跳过', reservation: 'optional', kind: 'sight' },
      { id: 'd3-central', time: '10:00', nameZh: '中央公园', nameEn: 'Central Park', coord: [40.7826, -73.9656], note: '从哥大附近往南穿公园走，约 35 分钟', reservation: 'free', kind: 'sight' },
      { id: 'd3-met', time: '11:00', nameZh: '大都会艺术博物馆', nameEn: 'The Met', coord: [40.7794, -73.9632], note: '1000 5th Ave · 8月旺季建议订免排队时段票，压缩到 2–2.5h', reservation: 'suggested', kind: 'sight' },
      { id: 'd3-levain', time: '13:45', nameZh: 'Levain Bakery 曲奇', nameEn: 'Levain Bakery', coord: [40.7815, -73.9793], note: '351 Amsterdam Ave · 打包带走不坐下吃', reservation: null, kind: 'food' },
    ],
  },
]

export const RESERVATION_META = {
  required: { label: '需预约', short: '预约', tone: '#A8341F' },
  suggested: { label: '建议预约', short: '建议', tone: '#B9812B' },
  free: { label: '免费 · 无需预约', short: '免费', tone: '#5E7A38' },
  optional: { label: '可选站点', short: '可选', tone: '#7A6A55' },
}

// 需提前预约清单（按紧急程度）
export const BOOKING_LIST = [
  { t: '自由女神像渡轮（Pedestal Reserve）', d: '皇冠票已售罄，底座票也尽快订', day: 2 },
  { t: '帝国大厦时段票', d: '选 14:30 左右场次', day: 1 },
  { t: '9/11 纪念馆博物馆（室内）', d: '户外免费，室内必须提前订', day: 2 },
  { t: "Caroline's on Broadway", d: '周末场次容易订满', day: 1 },
  { t: '爵士俱乐部（Vanguard / Blue Note / Smalls）', d: '官网看阵容再订', day: 2 },
  { t: 'The Met 时段票', d: '非强制但建议订', day: 3 },
]
