export const WeekMap = {
  1: '一',
  2: '二',
  3: '三',
  4: '四',
  5: '五',
  6: '六',
  7: '日',
}

export const VipLevelMap = {
  1: '普通客户',
  2: 'VIP客户',
}

export const CustomerSourceMap = {
  1: '线上',
  2: '线下',
  3: '转介绍',
  4: 'walk-in',
  5: '其他',
}

export const GenderMap = {
  0: '未知',
  1: '男',
  2: '女',
}

export const CardTypeMap = {
  1: '次卡',
  2: '充值卡',
  3: '折扣卡',
}

export const TimesCardTypeMap = {
  0: '非次卡',
  1: '有限次卡',
  2: '不限次卡',
  3: '通卡',
}

export const BookingStatusMap = {
  1: '待服务',
  2: '服务中',
  3: '已完成',
  4: '已取消',
}

export const PayStatusMap = {
  1: '待支付',
  2: '已支付',
  3: '已取消',
  4: '已退费',
}

export const GoodsTypeMap = {
  1: '服务',
  2: '产品',
  3: '会员卡',
  4: '预约',
}

export const CardRechargeMap = {
  1: '折扣卡',
  2: '充值卡',
  3: '通卡',
  4: '有限次卡',
  5: '不限次卡',
  6: '充值',
}

/**
 * 1: 'bg_ck',
 * 2: 'bg_czk',
 * 3: 'bg_zkk',
 */
export const CardRechargeBgMap = {
  1: 'bg_zkk',
  2: 'bg_czk',
  3: 'bg_ck',
  4: 'bg_ck',
  5: 'bg_ck',
  6: 'bg_czk',
}

export const CardRechargeMap2 = {
  1: '折扣卡',
  2: '充值卡',
  3: '次卡',
  4: '次卡',
  5: '次卡',
  6: '充值卡',
}

export const cardImgMap = {
  1: 'list-cika',
  2: 'list-chongzhi',
  3: 'list-zhekou',
}

/**
 * MakeOrder 开单, MakeCard 开卡, Recharge 充值, Booking 预约
 */
export enum PayModeEnum {
  MakeOrder = 1,
  MakeCard = 2,
  Recharge = 3,
  Booking = 4,
}

// export const PayTypesMap = {
//   1: '现金',
//   2: '银行卡',
//   3: '移动支付',
//   4: '微信(手工)',
//   5: '支付宝(手工)',
//   6: '其他',
//   7: '储值卡',
//   8: '美团',
//   9: '抖音',
//   10: '线下收款',
// }

// export const refundTypesMap = {
//   20: '原路退回',
//   1: '现金',
//   4: '微信',
//   5: '支付宝',
// }
