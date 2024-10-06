import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import SearchForm from '../SearchForm.tsx';
import { ERR_MESSAGE } from '../../utils.ts';
import { userEvent } from '@testing-library/user-event';

describe('SearchForm', () => {
  const renderSearchForm = (errormessage?: string) => {
    const mockSetInputValue = vi.fn();
    const mockHandleSubmitForm = vi.fn((e) => e.preventDefault());
    render(
      <SearchForm
        setInputValue={mockSetInputValue}
        handleSubmitForm={mockHandleSubmitForm}
        errormessage={errormessage}
      />,
    );
    return {
      mockSetInputValue,
      mockHandleSubmitForm,
    };
  };

  describe('renders', () => {
    it('should render input field', () => {
      renderSearchForm();
      const input = screen.getByLabelText('Enter Username');
      expect(input).toBeDefined();
    });
    it('should render submit button', () => {
      renderSearchForm();
      const button = screen.getByRole('button', { name: 'Search' });
      expect(button).toBeDefined();
    });
    it('should not display error message', () => {
      renderSearchForm();
      const errorMessage = screen.queryByText(ERR_MESSAGE);
      expect(errorMessage).toBeNull();
    });
    it('should display error message when provided', () => {
      renderSearchForm(ERR_MESSAGE);
      const errorMessage = screen.queryByText(ERR_MESSAGE);
      expect(errorMessage).toBeDefined();
    });
  });

  describe('should call event handlers', () => {
    const user = userEvent.setup();
    it('should change input field value when typed', async () => {
      const { mockSetInputValue } = renderSearchForm();
      const input = screen.getByLabelText('Enter Username');

      await user.type(input, 'mock data');

      expect(mockSetInputValue).toHaveBeenCalledWith('mock data');
    });
    it('should handle submit when button is clicked', async () => {
      const { mockHandleSubmitForm } = renderSearchForm();
      const button = screen.getByRole('button', { name: 'Search' });

      await user.click(button);
      expect(mockHandleSubmitForm).toHaveBeenCalled();
    });
  });
});
