import { EdmsPage } from './app.po';

describe('edms App', () => {
  let page: EdmsPage;

  beforeEach(() => {
    page = new EdmsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
