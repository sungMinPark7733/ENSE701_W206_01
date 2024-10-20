import { ArticlesController } from './article.controller';
import { ArticlesService } from './article.service';

describe('ArticlesController', () => {
  let articlesController: ArticlesController;
  let articlesService: ArticlesService;

  beforeEach(() => {
    // Create a mock service with Jest
    articlesService = {
      test: jest.fn().mockReturnValue('Test success'),
      findAll: jest.fn().mockResolvedValue([{ id: '1', title: 'Test Article' }]),
      searchArticles: jest.fn().mockResolvedValue([{ id: '2', title: 'Search Result' }]),
      verifyArticle: jest.fn().mockResolvedValue({ id: '1', verified: true }),
    } as unknown as ArticlesService;

    // Directly instantiate the controller with the mock service
    articlesController = new ArticlesController(articlesService);
  });

  it('should return "Test success" for test() endpoint', () => {
    expect(articlesController.test()).toBe('Test success');
  });

  it('should return an array of articles for findAll()', async () => {
    const result = await articlesController.findAll();
    expect(result).toEqual([{ id: '1', title: 'Test Article' }]);
    expect(articlesService.findAll).toHaveBeenCalled();
  });

  it('should return search results for searchArticles()', async () => {
    const result = await articlesController.searchArticles('title', 'practice', '2024');
    expect(result).toEqual([{ id: '2', title: 'Search Result' }]);
    expect(articlesService.searchArticles).toHaveBeenCalledWith('title', 'practice', '2024');
  });

  it('should verify an article by ID', async () => {
    const result = await articlesController.verifyArticle('1');
    expect(result).toEqual({ id: '1', verified: true });
    expect(articlesService.verifyArticle).toHaveBeenCalledWith('1');
  });
});