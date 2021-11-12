import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import * as compression from 'compression';
import {extname, join} from 'path';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { enableProdMode } from '@angular/core';
import { REQUEST, RESPONSE } from '@nguniversal/express-engine/tokens';
import { lookup } from 'mime-types';

enableProdMode();

const port = 3090;
const server = express();
const cookieParser = require('cookie-parser');
const distFolder = join(process.cwd(), 'dist/browser');

server.use('*.*', (req, res, next) => {
  const indexParams = req.url.indexOf('?');
  if (indexParams !== - 1) {
    req.url = req.url.substring(0, indexParams) + '.gz' + req.url.substring(indexParams);
  } else {
    req.url = req.url + '.gz';
  }
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', lookup(extname(req.originalUrl)) as any);
  next();
});

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

// gzip
server.use(compression());

// cookies
server.use(cookieParser());

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

server.listen(port, () => {
  console.log(`Node Express server listening on http://localhost:${port}`);
});

export * from './src/main.server';
