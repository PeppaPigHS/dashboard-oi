import { ICompetition, IContest, ITask } from '../@types/task'

export const genID = (competitions: ICompetition[], checklist: Object) => {
  let temp: ICompetition[] = [...competitions]
  for (let i = 0; i < competitions.length; i++) {
    for (let j = 0; j < competitions[i].contests.length; j++) {
      for (let k = 0; k < competitions[i].contests[j].tasks.length; k++) {
        const uid =
          competitions[i].id +
          '_' +
          competitions[i].contests[j].id +
          '_' +
          competitions[i].contests[j].tasks[k].id
        temp[i].contests[j].tasks[k].uid = uid
        console.log('-> ', uid)
        if (checklist[uid]) {
          console.log('YES')
          temp[i].contests[j].tasks[k].color = checklist[uid].color
          temp[i].contests[j].tasks[k].msg = checklist[uid].msg
        } else {
          temp[i].contests[j].tasks[k].color = 'white'
          temp[i].contests[j].tasks[k].msg = ''
        }
      }
    }
  }
  return temp
}
