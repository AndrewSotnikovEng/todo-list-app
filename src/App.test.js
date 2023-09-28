import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('Finish btn goes grey', () => {
  render(<App />);
  const btn = screen.getByRole('button', {
    name: /finished/i
  })
  fireEvent.click(btn)

  // Get the actual style property value
  const actualBackgroundColor = window.getComputedStyle(btn).backgroundColor;

  // Use toHaveStyle to check for the expected style with a custom error message
  expect(actualBackgroundColor).toBe('lightgray');

});

test('Clicking finished button toggles state to "done"', () => {
  render(<App />);
  
  // Find and click the "finished" button
  const finishedButton = screen.getByRole('button', {
    name: /finished/i
  });
  fireEvent.click(finishedButton);

  // Verify that the text reflects the updated state
  const stateText = screen.getByText(/Current state is:/);
  expect(stateText).toHaveTextContent('Current state is: done');
});


test('Clicking finished button twice toggles state between "done" and initial state', () => {
  render(<App />);
  
  // Find the "finished" button
  const finishedButton = screen.getByRole('button', {
    name: /finished/i
  });

  // Get the initial state
  const initialStateText = screen.getByText(/Current state is:/).textContent;

  // Click the "finished" button once
  fireEvent.click(finishedButton);
  
  // Verify that the text reflects the state after the first click
  const stateTextAfterFirstClick = screen.getByText(/Current state is:/);
  expect(stateTextAfterFirstClick).toHaveTextContent('Current state is: done');

  // Click the "finished" button again
  fireEvent.click(finishedButton);

  // Verify that the text reflects the initial state after the second click
  const stateTextAfterSecondClick = screen.getByText(/Current state is:/);
  expect(stateTextAfterSecondClick).toHaveTextContent(initialStateText);
});
