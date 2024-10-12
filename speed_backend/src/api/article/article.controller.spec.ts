import { ArticlesController } from './article.controller';
import { ArticlesService } from './article.service';

describe('ArticlesController - Archive Feature', () => {
  let controller: ArticlesController;
  let service: ArticlesService;

  beforeEach(() => {
    service = {
      archive: jest.fn(),
    } as unknown as ArticlesService;

    controller = new ArticlesController(service);
  });

  it('should archive an article by id', async () => {
    const id = 'test-id';
    const result = { message: 'Article archived' };

    // Simulate the archive function in the service
    jest.spyOn(service, 'archive').mockResolvedValue(result);

    // Call the controller's non-existent archive method
    expect(await controller.archive(id)).toBe(result);
    expect(service.archive).toHaveBeenCalledWith(id);
  });
});