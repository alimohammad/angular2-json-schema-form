(function (global) {
  System.config({
    paths: { 'npm:': 'node_modules/' },
    map: {
      // Angular 2 JSON Schema Form and demo playground
      'json-schema-form':           'dist',
      'playground':                 'dist/playground',
      // angular bundles
      '@angular/core':              'npm:@angular/core/bundles/core.umd.js',
      '@angular/common':            'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler':          'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/material':          'npm:@angular/material/material.umd.js',
      '@angular/platform-browser':  'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http':              'npm:@angular/http/bundles/http.umd.js',
      '@angular/router':            'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms':             'npm:@angular/forms/bundles/forms.umd.js',
      'rxjs':                       'npm:rxjs',
      'angular-in-memory-web-api':  'npm:angular-in-memory-web-api',
      // other libraries
      'ajv':                        'npm:ajv/dist/ajv.min.js',
      'base64-js':                  'npm:base64-js/base64js.min.js',
      'brace':                      'npm:brace',
      'buffer':                     'npm:buffer',
      'dot':                        'npm:dot/doT.min.js',
      'foreach':                    'npm:foreach',
      'ieee754':                    'npm:ieee754',
      'isarray':                    'npm:isarray',
      'lodash':                     'npm:lodash/lodash.min.js',
      'validator':                  'npm:validator',
      'w3c-blob':                   'npm:w3c-blob',
    },
    packages: {
      'json-schema-form':   { main: './index.js',     defaultExtension: 'js' },
      'playground':         { main: './main.js',      defaultExtension: 'js' },
      'rxjs':               {                         defaultExtension: 'js' },
      'angular2-in-memory-web-api': {
                              main: './index.js',     defaultExtension: 'js' },
      'brace':              { main: './index.js',     defaultExtension: 'js' },
      'buffer':             { main: './index.js',     defaultExtension: 'js' },
      'foreach':            { main: './index.js',     defaultExtension: 'js' },
      'ieee754':            { main: './index.js',     defaultExtension: 'js' },
      'isarray':            { main: './index.js',     defaultExtension: 'js' },
      'validator':          { main: './index.js',     defaultExtension: 'js' },
      'w3c-blob':           { main: './index.js',     defaultExtension: 'js' },
    }
  });
})(this);
