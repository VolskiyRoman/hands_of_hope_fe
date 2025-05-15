import React, { useState, useEffect } from 'react'

import PageTitle from 'components/Typography/PageTitle'
import SectionTitle from 'components/Typography/SectionTitle'
import {
  Table,
  TableHeader,
  TableCell,
  TableContainer,
} from '@roketid/windmill-react-ui'
import Layout from 'containers/Layout'

function Tables() {

  return (
    <Layout>
      <PageTitle>Tables</PageTitle>
      <SectionTitle>Simple table</SectionTitle>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Client</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
            </tr>
          </TableHeader>
        </Table>
      </TableContainer>

      <SectionTitle>Table with actions</SectionTitle>
    </Layout>
  )
}

export default Tables
