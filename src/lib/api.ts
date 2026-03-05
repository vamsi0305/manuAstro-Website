// Re-export the shared axios instance so both import paths work:
//   import api from '../../lib/api'   ← used by services/ folder
//   import api from '../api/axios'    ← used by api/ folder
export { default } from '../api/axios';
