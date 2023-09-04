import Link from 'next/link'

export default function SurveyLivePage({ params }: { params: { id: string } }) {
  return (
    <main className='h-screen flex flex-col gap-y-5 items-center justify-center'>
      <h1 className='text-white text-5xl'>Your survey is Live</h1>
      <Link href={`/survey/${params.id}`} className='btn-primary'>
        Here
      </Link>
    </main>
  )
}
