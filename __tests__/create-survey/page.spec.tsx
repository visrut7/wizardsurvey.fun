import { render, screen } from '@testing-library/react'
import CreateSurvey from '@/app/create-survey/page';

describe('Home', () => {
    it('should renders a survey name input element', async () => {
        render(<CreateSurvey />)

        const surveyNameInput = await screen.findByTestId("survey-name-input") as HTMLInputElement;

        expect(surveyNameInput).toBeInTheDocument()
        expect(surveyNameInput).toHaveAttribute('type', 'text')
        expect(surveyNameInput.value).toBe('Survey App')
    });
});
