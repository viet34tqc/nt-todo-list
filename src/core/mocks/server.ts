/*
 * This file is used for asynchronous testing
 */

import { setupServer } from 'msw/node';
import { loginHandlers } from 'src/features/login/handlers/login';
import { todoHandlers } from '../../features/screen1/handlers/todo';

// Setup requests interception using the given handlers.
export const server = setupServer(...todoHandlers, ...loginHandlers);
