# Todo List using React Hooks

## Requirements

### UI

- A form to submit your todo item
  - An input text
  - A submit button
- A list of todo items get from API
- A status filter
- Each todo item has:
  - Name of the item
  - A checkbox to toggling its state
  - A _Delete_ button to delete that item

### Interaction

- Form submit
  - Input text only accpepts email
  - Input text has focus on mount
  - The submit button is disabled when the input field is empty (user hasn't filled in anything yet, contains only space character...)
  - There should be an error message when the validation fails
- Call API when submit item
- Click checkbox to toggle the item's completed status
- Call API when delete the item

## Test cases

### First render test

- Render heading 1
- Render form
  - Render input text and it has focus
  - Render submit button
- Render todo list from API

### Interaction test

- TodoForm
  - The input field mustn't be empty or contains empty characters
  - The input value must be email.
  - The submit button is disabled if the validation failed
  - The submit button text changes to 'Adding' when the form is submitting
  - When the form is submitted successfully
    - The input field is clear
    - The submit function is called
- TodoList
  - Loading text appears and waits to be removed
  - Render list of todo
- TodoItem
  - Delete todo
  - Toggle todo status
