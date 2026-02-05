import { StatisticsService } from '../statistics/statistics.service';
import { createTestModule } from '../../test/test-utils';

describe('StatisticsService', () => {
  let service: StatisticsService;

  beforeEach(async () => {
    const { moduleRef } = await createTestModule();
    service = moduleRef.get(StatisticsService);
  });

  it('returns statistics summary object', async () => {
    const statistics = await service.getStatistics();

    expect(statistics).toEqual(
      expect.objectContaining({
        totalSeats: expect.any(Number),
        totalReserved: expect.any(Number),
        totalCanceled: expect.any(Number),
      }),
    );
  });
});
