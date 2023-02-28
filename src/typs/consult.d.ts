import type { ConsultTime, ConsutType } from '@/enums'

//查询推荐
export type knoledgeType = 'like' | 'recommend' | 'fatReduction' | 'food'

export type consultRows = {
  title: 'string'
  id: 'string'
  coverUrl: string[]
  topics: string[]
  collectionNumber: number
  commentNumber: number
  creatorName: string
  creatorAvatar: string
  creatorHospatalName: string
  creatorDep: string
  creatorTitles: string
  likeFlag: 0 | 1
  content: string
  creatorId: string
}
export type consultRowsArray = consultRows[]
export type consultResponse = {
  pageTotal: number
  total: number
  rows: consultRowsArray
}
//文章查询参数
export type consultQuery = docQuery & {
  type: knoledgeType
}

//关注医生的列表
export type docQuery = {
  current: number
  pageSize: number
}

export type rowsObject = {
  id: string
  name: string
  avatar: string
  hospitalName: string
  gradeName: string
  depName: string
  positionalTitles: string
  likeFlag: 0 | 1
  serviceFee: number
  consultationNum: number
  score: number
  major: string
}

export type rowsArray = rowsObject[]

export type docData = {
  docQuery
  rows: rowsArray
}

//关注的类型
export type FollowType = 'topic' | 'knowledge' | 'doc' | 'disease'

//问诊订单,请求数据
type Imag = {
  id: string
  url: string
}
export type ConsultParams = {
  id: string
  type: ConsutType
  couponId: string
  illnessType: 0 | 1
  patientId: string
  depId: string
  illnessDesc: string
  illnessTime: ConsultTime
  consultFlag: 0 | 1
  pictures: Imag[]
}
//Partial内置，得到    全部可选的类型
export type PartialConsultParams = Partial<ConsultParams>

//选择科室
//二级科室
export type TowDep = {
  id: string
  name: string
  avatar?: string
}
//一级科室
export type TopDep = TowDep & {
  child: TowDep[]
}

export type CounsultIllness = Pick<
  PartialConsultParams,
  'illnessDesc' | 'illnessTime' | 'consultFlag' | 'pictures'
>
