import objectInfo from './object_info.json'
import queue from './queue.json'
export default {
  'GET /object_info': objectInfo,
  'GET /queue': queue,
  'POST /prompt': { result: 'true' },
}
