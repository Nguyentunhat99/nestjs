import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
import * as hbs from 'hbs';
import helmet from 'helmet';

import { sortable, sortableTrash, sum, checkRole } from './app.helper';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  await app.listen(3000);
  0;

  app.useStaticAssets(join(__dirname, '..', './src/public'));
  app.setBaseViewsDir(join(__dirname, '..', './src/views'));
  app.setViewEngine('hbs');
  hbs.registerHelper('sum', sum);
  hbs.registerHelper('sortable', sortable);
  hbs.registerHelper('sortableTrash', sortableTrash);
  hbs.registerHelper('checkRole', checkRole);
  // somewhere in your initialization file
  app.use(
    helmet({
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        directives: {
          imgSrc: [
            `'self'`,
            'data:',
            'apollo-server-landing-page.cdn.apollographql.com',
          ],
          scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
          manifestSrc: [
            `'self'`,
            'apollo-server-landing-page.cdn.apollographql.com',
          ],
          frameSrc: [`'self'`, 'sandbox.embed.apollographql.com'],
        },
      },
    }),
  );

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
