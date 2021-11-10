import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import * as compression from 'compression';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { enableProdMode } from '@angular/core';
import { REQUEST, RESPONSE } from '@nguniversal/express-engine/tokens';

enableProdMode();

const port = 4000;
const server = express();
const cookieParser = require('cookie-parser');
const distFolder = join(process.cwd(), 'dist/browser');

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
// temp fix issues for Angular 9 https://github.com/angular/universal/issues/1210
server.engine('html', ngExpressEngine({
  bootstrap: AppServerModule
}) as any);

server.set('view engine', 'html');
server.set('views', distFolder);

// Example Express Rest API endpoints
// server.get('/api/**', (req, res) => { });
// Serve static files from /browser
server.get('*.*', express.static(distFolder, {
  maxAge: '1y'
}));

// All regular routes use the Universal engine
server.get('*', (req, res) => {
  res.render('index', {
    req,
    providers: [
      { provide: APP_BASE_HREF, useValue: req.baseUrl },
      // for http and cookies
      {
        provide: REQUEST,
        useValue: req,
      },
      {
        provide: RESPONSE,
        useValue: res,
      }
    ]
  });
});

// gzip
server.use(compression());

// cookies
server.use(cookieParser());

server.listen(port, () => {
  console.log(`Node Express server listening on http://localhost:${port}`);
});

export * from './src/main.server';
