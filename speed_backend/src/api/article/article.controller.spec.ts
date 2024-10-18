import { ArticlesController } from './article.controller';
import { ArticlesService } from './article.service';
import { CreateArticleDto } from './submit-article.dto';
import { Article } from './article.schema';

describe('ArticlesController', () => {
  let controller: ArticlesController;
  let service: ArticlesService;

  beforeEach(() => {
    // Create a mock service
    service = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      searchByTitle: jest.fn(),
      findByStatus: jest.fn(),
      test: jest.fn(),
    } as unknown as ArticlesService;

    // Inject the mock service into the controller
    controller = new ArticlesController(service);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all articles', async () => {
    const result: Article[] = [];
    jest.spyOn(service, 'findAll').mockResolvedValue(result);

    expect(await controller.findAll()).toBe(result);
  });

  it('should search articles by title', async () => {
    const result: Article[] = [];
    const title = 'Test Title';
    jest.spyOn(service, 'searchByTitle').mockResolvedValue(result);

    expect(await controller.searchByTitle(title)).toBe(result);
    expect(service.searchByTitle).toHaveBeenCalledWith(title);
  });

  it('should return one article by id', async () => {
    const result: Article = {} as Article;
    const id = 'test-id';
    jest.spyOn(service, 'findOne').mockResolvedValue(result);

    expect(await controller.findOne(id)).toBe(result);
    expect(service.findOne).toHaveBeenCalledWith(id);
  });

  it('should create a new article', async () => {
    const createArticleDto: CreateArticleDto = { title: 'Test Article' } as CreateArticleDto;
    const result: Article = {} as Article;
    jest.spyOn(service, 'create').mockResolvedValue(result);

    expect(await controller.create(createArticleDto)).toBe(result);
    expect(service.create).toHaveBeenCalledWith(createArticleDto);
  });

  it('should update an article', async () => {
    const updateArticleDto: CreateArticleDto = { title: 'Updated Article' } as CreateArticleDto;
    const result: Article = {} as Article;
    const id = 'test-id';
    jest.spyOn(service, 'update').mockResolvedValue(result);

    expect(await controller.update(id, updateArticleDto)).toBe(result);
    expect(service.update).toHaveBeenCalledWith(id, updateArticleDto);
  });

  it('should delete an article', async () => {
    const result: Article = {} as Article;
    const id = 'test-id';
    jest.spyOn(service, 'delete').mockResolvedValue(result);

    expect(await controller.delete(id)).toBe(result);
    expect(service.delete).toHaveBeenCalledWith(id);
  });

  it('should return unmoderated articles', async () => {
    const result: Article[] = [];
    jest.spyOn(service, 'findByStatus').mockResolvedValue(result);

    expect(await controller.findUnmoderatedArticles()).toBe(result);
    expect(service.findByStatus).toHaveBeenCalledWith('Unmoderateds');
  });

  it('should return test message', () => {
    const result = 'Test Message';
    jest.spyOn(service, 'test').mockReturnValue(result);

    expect(controller.test()).toBe(result);
    expect(service.test).toHaveBeenCalled();
  });
});