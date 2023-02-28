//就诊类型1找医生 2极速问诊 3开药问诊默认是1
enum ConsutType {
  doctor = 1,
  fast = 2,
  medication = 3
}
//找医生/极速问诊-患病时间1一周内2一月内3半年内4半年以上
enum ConsultTime {
  week = 1,
  mounth,
  halfYear,
  more
}

export { ConsutType, ConsultTime }
