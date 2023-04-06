import embeddings from './embeddings.json'
import extensions from './extensions.json'
import history from './history.json'
import objectInfo from './object_info.json'
import queue from './queue.json'

export default {
  'GET /object_info': objectInfo,
  'GET /queue': queue,
  'GET /embeddings': embeddings,
  'GET /history': history,
  'GET /extensions': extensions,
  'GET /prompt': { exec_info: { queue_remaining: 0 } },
  'POST /prompt': { result: 'true' },
  'POST /upload/image': { name: 'mock.png' },
}
