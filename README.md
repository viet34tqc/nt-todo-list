# Todo List using React Hooks

## Requirements

### UI

- A form to submit your todo item
  - An input text
  - A submit button
- A list of todo items get from API
- Each todo item has:
  - Name of the item
  - A checkbox to toggling its state
  - A *Delete* button to delete that item

### Interaction

- Form submit
  - Input text only accpepts email
  - Input text has focus on mount
  - The submit button is disabled when the input value is empty (user hasn't filled in anything yet, contains only space character...)
  - There should be an error message when the user fills in the text and delete them
- Call API when submit item
- Click checkbox to toggle the item's completed status
- Call API when delete the item

## Test cases

### First render test

- Render heading 1
- Render form
  - Render input text and it has focus
  - Render submit button

### Interaction test

- Add todo when form submitted
