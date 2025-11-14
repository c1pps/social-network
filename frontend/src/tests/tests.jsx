import React from 'react'
import {render, screen} from '@testing-library/react'
import Home from '../pages/Home'

test('click on a post', async () => {
    render(<Home />)

    const post = await screen.findByText(/Introduction au routing React/i)

    await userEvent.click(post)
})