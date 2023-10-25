import Wizard from '@/app/icons/WizardIcon'
import { ImageResponse } from 'next/server'

export const runtime = 'edge'

const size = {
  width: 1200,
  height: 630
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

    const hasTitle = searchParams.has('title')
    const title = hasTitle ? searchParams.get('title')?.slice(0, 100) : 'My default title'

    return new ImageResponse(
      (
        <div
          style={{
            backgroundImage: 'linear-gradient(to bottom, #47026B, #010D40)',
            height: '100%',
            width: '100%',
            display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            flexWrap: 'nowrap'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              justifyItems: 'center'
            }}
          >
            <Wizard />
          </div>
          <div
            style={{
              fontSize: 60,
              fontStyle: 'normal',
              letterSpacing: '-0.025em',
              color: '#3E4782',
              marginTop: 30,
              padding: '0 120px',
              lineHeight: 1.4,
              whiteSpace: 'pre-wrap'
            }}
          >
            {`Wizard Survey: ${title}`}
          </div>
        </div>
      ),
      { ...size }
    )
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500
    })
  }
}
