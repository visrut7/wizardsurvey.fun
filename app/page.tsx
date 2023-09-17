import { Patrick_Hand } from 'next/font/google'
import WizardSurvey from './icons/WizardSurvey'
import Link from 'next/link'

const patrickHand = Patrick_Hand({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-patrick-hand',
  display: 'fallback'
})

export default function Home() {
  return (
    <main className={`h-screen flex flex-col items-center justify-center gap-y-6`}>
      <section className='flex flex-col md:flex-row gap-x-3 items-center justify-center'>
        <WizardSurvey width='200' height='200' color='#3e4782' />
        <h1
          className={`${patrickHand.className} text-5xl md:text-7xl lg:text-8xl 2xl:text-9xl text-[#3e4782] main-title`}
        >
          WIZARD SURVEY
        </h1>
      </section>
      <section className='flex flex-col md:flex-row justify-center gap-x-10 gap-y-4 flex-wrap w-1/2 xl:w-1/3 2xl:w-1/3'>
        <Link className='btn btn-primary' href='/create-survey'>
          Create Manually
        </Link>
        <Link className='btn btn-gradient border-none' href='/create-survey/ai'>
          Generate with AI
        </Link>
        <Link
          className='btn btn-primary flex justify-center gap-x-2'
          href='https://github.com/visrut-at-incubyte/wizardsurvey.fun'
          target='_blank'
        >
          <img src='/github-mark.svg' width={20} height={30} alt='' />
          <span>Source Code</span>
        </Link>
      </section>
    </main>
  )
}
