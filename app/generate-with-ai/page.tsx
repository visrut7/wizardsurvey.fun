const GenerateWithAi = () => {
  return (
    <main className='h-screen flex flex-col items-center justify-center gap-y-4'>
      <label htmlFor='survey-description' className='text-2xl'>
        Enter survey topic or description
      </label>
      <textarea
        className='textarea w-96 h-64'
        autoFocus
        name='survey-description'
        id='survey-description'
        placeholder="Conducting a market research survey for a new fitness app. We want to understand people's fitness goals, preferred workout routines, and pain points in existing fitness apps. Our target audience is health-conscious individuals aged 18-45, both beginners and experienced fitness enthusiasts. The survey should help us design features that cater to their specific needs and preferences."
      />
      <button className='btn btn-primary'>Let&apos;s Go</button>
    </main>
  )
}

export default GenerateWithAi
