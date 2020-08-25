import React, { useMemo } from 'react'

import styled from '@emotion/styled'

import { Heading } from '@chakra-ui/core'

import { genID } from 'utils/genID'

import { useUser } from 'components/UserContext'
import { Card } from 'components/Card'

import { ICompetition, IContest, ITask } from '../@types/task'
import { example } from 'example'

export const Table = () => {
  const { user } = useUser()
  const data = useMemo<ICompetition[]>(() => {
    console.log(user.checklist)
    return genID(example.reverse(), user.checklist)
  }, [user])
  return (
    <React.Fragment>
      {data.map((competition: ICompetition) => {
        return (
          <React.Fragment>
            <Heading my={4}>{competition.name}</Heading>
            <table>
              {competition.contests.map((contest: IContest) => {
                return (
                  <tr>
                    <td>{contest.name}</td>
                    {contest.tasks.map((task: ITask) => {
                      return (
                        <td>
                          <Card task={task} />
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </table>
          </React.Fragment>
        )
      })}
    </React.Fragment>
  )
}
