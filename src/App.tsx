import * as React from 'react'
import { Button, Font } from '@procore/core-react'
import { ReactTabulator } from 'react-tabulator'

import 'tabulator-tables/dist/css/tabulator.min.css'
import logo from './logo.svg'
import './App.css'

const Tabulator = require('tabulator-tables')

const data = Array(200).fill({
  id: 1,
  name: 'Bob',
  age: '12',
  col: 'red',
  dob: '1/1/2020',
})

const columns = [
  { title: 'Name', field: 'name', width: 150 },
  {
    title: 'Age',
    field: 'age',
    align: 'left',
    formatter: function (
      cell: Tabulator.CellComponent,
      formatterParams: Tabulator.FormatterParams,
      onRendered: () => void
    ) {
      // The function must return the contents of the cell,
      // either the text value of the cell, valid HTML or a DOM node.

      return <Font>`The age is: ${cell.getValue()}`</Font>
    },
  },
  { title: 'Favourite Color', field: 'col' },
  { title: 'Date Of Birth', field: 'dob', align: 'center' },
  {
    title: 'Passed?',
    field: 'passed',
    align: 'center',
    formatter: 'tickCross',
  },
]

function VanillaTabulator(props: any) {
  let refTable: HTMLDivElement | null = null

  React.useEffect(() => {
    new Tabulator(refTable, {
      data,
      reactiveData: true,
      columns: columns,
    })
  }, [refTable])

  return <div ref={(el) => (refTable = el)} style={{ height: '1000px' }} />
}

function ReactTabulatorWrapper(props: any) {
  return (
    <ReactTabulator
      data={data}
      columns={columns}
      options={{ height: '100vh', movableRows: true }}
      // this is the only part of the wrapper that accepts jsx afaik
      footerElement={<Button>Custom Button</Button>}
    />
  )
}

function App() {
  // return <VanillaTabulator />
  return <ReactTabulatorWrapper />
}

export default App
