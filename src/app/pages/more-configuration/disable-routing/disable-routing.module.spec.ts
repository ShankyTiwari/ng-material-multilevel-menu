import { DisableRoutingModule } from './disable-routing.module';

describe('DisableRoutingModule', () => {
  let disableRoutingModule: DisableRoutingModule;

  beforeEach(() => {
    disableRoutingModule = new DisableRoutingModule();
  });

  it('should create an instance', () => {
    expect(disableRoutingModule).toBeTruthy();
  });
});
