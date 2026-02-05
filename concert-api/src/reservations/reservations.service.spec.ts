import { ReservationsService } from '../reservations/reservations.service';
import { createTestModule } from '../../test/test-utils';

describe('ReservationsService', () => {
  let service: ReservationsService;

  beforeEach(async () => {
    const { moduleRef } = await createTestModule();
    service = moduleRef.get(ReservationsService);
  });

  it('returns reservation history as an array', async () => {
    const history = await service.findAll();
    expect(Array.isArray(history)).toBe(true);
  });
});
