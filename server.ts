import 'zone.js/node';
import 'reflect-metadata';

// hack to let the server forward a cookie in CookieServerInterceptor
// @ts-ignore
import * as XHR2 from 'xhr2';
XHR2.prototype._restrictedHeaders.cookie = false;

import { ngExpressEngine } from '@nguniversal/express-engine';

import * as compression from 'compression';
import * as express from 'express';

import {extname, join} from 'path';

import { APP_BASE_HREF } from '@angular/common';
import {enableProdMode} from '@angular/core';
import { REQUEST, RESPONSE } from '@nguniversal/express-engine/tokens';
import { AppServerModule } from './src/main.server';
import {lookup} from 'mime-types';

const cookieParser = require('cookie-parser');

enableProdMode();

// The Express app is exported so that it can be used by serverless Functions.
export function app() {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/browser');

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }) as any);

  server.set('view engine', 'html');
  server.set('views', distFolder);

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
        },
      ],
    }, (err, html) => {
      if (err) {
        console.error(err);
        res.send('An error occured: ' + err.message);
      }
      return res.send(html);
    });
  });

  return server;
}

function run() {
  const port = process.env.PORT || 3080;

  // Start up the Node server
  const server = app();

  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
