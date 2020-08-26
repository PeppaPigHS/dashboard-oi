import React from 'react'

export const Card = ({ task }) => {
  return (
    <a href={task.link} target="__blank">
      {task.name}
    </a>
  )
}
