import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
import * as hbs from 'hbs';

import { sortable, sortableTrash, sum } from './app.helper';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  await app.listen(3000);

  app.useStaticAssets(join(__dirname, '..', './src/public'));
  app.setBaseViewsDir(join(__dirname, '..', './src/views'));
  app.setViewEngine('hbs');
  hbs.registerHelper('sum', sum);
  hbs.registerHelper('sortable', sortable);
  hbs.registerHelper('sortableTrash', sortableTrash);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
