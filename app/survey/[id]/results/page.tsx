'use client'

import { Answer } from '@/app/models/types'
import { useEffect, useState } from 'react'
import CsvDownloader from 'react-csv-downloader'

type SurveyResultResponse = {
  questions: string[]
  responses: Answer[]
}

type Column = {
  id: string
  displayName: string
}

export default function SurveyResults({ params }: { params: { id: string } }) {
  const [columns, setColumns] = useState<Column[]>([])
  const [data, setData] = useState<any[]>([])

  const fetchData = async () => {
    const res = await fetch(`results/api?id=${params.id}`)
    const data: SurveyResultResponse = await res.json()

    const questions = data.questions
    const columns = questions.map((q, index) => {
      return { id: `${index}`, displayName: q }
    })
    setColumns([...columns])

    const responses = data.responses
    setData([...responses])
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <main className='h-screen flex justify-center items-center'>
      <CsvDownloader columns={columns} datas={data} filename='results.csv'>
        <button className='btn btn-success'>Download CSV!</button>
      </CsvDownloader>
    </main>
  )
}
