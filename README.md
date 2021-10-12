# Todo List using React Hooks

## Requirement

### UI

- A form to submit your todo item
  - An input text
  - A submit button
- A list of todo that get from API: https://www.mocky.io/v2/5185415ba171ea3a00704eed
- Each todo item has:
  - Name of the item
  - A checkbox to toggling its state
  - A *Delete* button to delete that item

### Interaction

- Form submit
  - Input only accpepts email
  - The submit button is disabled when the input value is empty (user hasn't filled in anything yet, contains space character...)
  - There should be an error message when the user fills in the text and delete them
- Call API when submit item
- Click checkbox to toggle the item's completed status
- Call API when delete the item
