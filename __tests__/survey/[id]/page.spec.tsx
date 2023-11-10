import { render, screen } from '@testing-library/react'
import FillSurvey from '@/app/survey/[id]/page'
import { QuestionType } from '@/app/models/types'
import React from 'react'
import { AppProvider } from '@/app/context/AppContext'
import { act } from 'react-dom/test-utils'
import { AppRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import mockRouter from 'next-router-mock'

describe('Fill Survey', () => {
  beforeAll(() => {
    jest.spyOn(React, 'useEffect').mockImplementation(React.useLayoutEffect)

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            _id: '64ed68321d0e29aa036b7c5c',
            surveyName: 'Test Survey 1',
            questions: [
              { question: 'Test question 1', type: QuestionType.STAR_5 },
              { question: 'Test question 2', type: QuestionType.NUMBER }
            ],
            creatorIpHash: 'test-hash-123',
            uuid: 'test-uuid-123'
          })
      })
    ) as jest.Mock
  })

  it('should renders a all questions for survey', async () => {
    render(
      <AppRouterContext.Provider value={mockRouter as any}>
        <AppProvider>
          <FillSurvey params={{ id: '123' }} />
        </AppProvider>
      </AppRouterContext.Provider>
    )

    await screen.findByText('Test Survey 1')

    const question1 = screen.getByText('Test question 1')
    expect(question1).toBeInTheDocument()

    const buttons = screen.getAllByRole('button')
    const ratingButtons = buttons.filter((button) => button.classList.contains('star'))
    act(() => ratingButtons[0].click())

    const question2 = screen.getByText('Test question 2')
    expect(question2).toBeInTheDocument()

    const inputNumber = screen.getByPlaceholderText('Ex: 37') as HTMLInputElement
    expect(inputNumber.value).toBe('0')
  })
})
