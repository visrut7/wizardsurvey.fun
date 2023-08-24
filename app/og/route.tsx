import { ImageResponse } from 'next/server'
import WizardSurvey from '../icons/WizardSurvey'


export const runtime = 'edge'

const size = {
    width: 80,
    height: 80,
}

export async function GET() {

    return new ImageResponse(
        (
            <WizardSurvey width='100%' height='100%' color='#974EC3' />
        ),
        {
            ...size,
        }
    )
}