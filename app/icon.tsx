import { ImageResponse } from 'next/server'
import WizardSurvey from './icons/WizardSurvey'

export const runtime = 'edge'

export const alt = 'About Acme'
export const size = {
    width: 1200,
    height: 630,
}

export const contentType = 'image/png'

export default async function Image() {

    return new ImageResponse(
        (
            <WizardSurvey width='100%' height='100%' color='#974EC3' />
        ),
        {
            ...size,
        }
    )
}