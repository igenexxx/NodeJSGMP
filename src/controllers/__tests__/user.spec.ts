import { myContainer } from '../../config/inversify.config';
import { UserController } from '../user';

describe('User', () => {
  let user: UserController;

  beforeEach(() => {
    user = myContainer.get(UserController);
  });

  it('should be defined', () => {
    expect(user).toBeDefined();
  });
});
