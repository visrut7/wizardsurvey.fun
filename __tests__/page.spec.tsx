import { render, screen } from '@testing-library/react'
import Home from "@/app/page"

describe('Home', () => {
    it('should renders a heading', () => {
        render(<Home />)

        const heading = screen.getByRole('heading', {
            name: /WIZARD SURVEY/i,
        })

        expect(heading).toBeInTheDocument()
    });

    it('should renders 3 links', () => {
        render(<Home />)

        const links = screen.getAllByRole('link');
        expect(links.length).toBe(3);
    });
});
