export interface ITask {
  id: string
  name: string
  link: string

  uid?: string
  color?: string
  msg?: string
}

export interface IContest {
  id: string
  name: string
  link: string
  tasks: ITask[]
}

export interface ICompetition {
  id: string
  name: string
  contests: IContest[]
}
