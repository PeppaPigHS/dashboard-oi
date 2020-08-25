import React from 'react'

import { PageLayout } from 'components/Layout'
import { Table } from 'components/Table'

const Checklist = () => {
  return (
    <PageLayout page="checklist">
      <div className="flex flex-col px-20 py-4 overflow-auto">
        <Table />
      </div>
    </PageLayout>
  )
}

export default Checklist
