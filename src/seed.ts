import type { Payload } from 'payload'

export async function seedCMS(payload: Payload, force: boolean = false) {
  payload.logger.info('No seed data configured.')
}
