/*
 * This file is used for asynchronous testing
 */

import { setupServer } from 'msw/node';
import { todoHandlers } from './handlers/todo';

// Setup requests interception using the given handlers.
export const server = setupServer(...todoHandlers);
