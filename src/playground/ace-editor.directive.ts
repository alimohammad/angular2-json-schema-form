import {
  Directive, EventEmitter, Output, ElementRef, Input
} from '@angular/core';

import 'brace';
import 'brace/theme/chrome';
import 'brace/mode/javascript';
import 'brace/mode/json';

declare var ace: any;

@Directive({
  selector: '[ace-editor]'
})
export class AceEditorDirective {
  private _options: any = { };
  private _readOnly: boolean = false;
  private _theme: string = 'chrome';
  private _mode: string = 'javascript';
  private _autoUpdateContent: boolean = true;
  private editor: any;
  private oldText: any;
  @Output( 'textChanged' ) textChanged = new EventEmitter();

  constructor( elementRef: ElementRef ) {
    let el = elementRef.nativeElement;
    ace.config.set( 'basePath', '/node_modules/brace' );
    this.editor = ace['edit']( el );
    this.init();
    this.initEvents();
  }

  init() {
    this.editor.getSession().setUseWorker( false );
    this.editor.setOptions( this._options );
    this.editor.setTheme( `ace/theme/${this._theme}` );
    this.editor.getSession().setMode( `ace/mode/${this._mode}` );
    this.editor.setReadOnly( this._readOnly );
    this.editor.$blockScrolling = Infinity;
  }

  initEvents() {
    this.editor.on( 'change', () => {
      let newVal = this.editor.getValue();
      if ( newVal === this.oldText ) return;
      if ( typeof this.oldText !== 'undefined' ) {
        this.textChanged.emit( newVal );
      }
      this.oldText = newVal;
    } );
  }

  @Input() set options( options: any ) {
    this._options = options;
    this.editor.setOptions( options || { } );
  }

  @Input() set readOnly( readOnly: any ) {
    this._readOnly = readOnly;
    this.editor.setReadOnly( readOnly );
  }

  @Input() set theme( theme: any ) {
    this._theme = theme;
    this.editor.setTheme( `ace/theme/${theme}` );
  }

  @Input() set mode( mode: any ) {
    this._mode = mode;
    this.editor.getSession().setMode( `ace/mode/${mode}` );
  }

  @Input() set text( text: any ) {
    if ( !text ) { text = ''; }

    if ( this._autoUpdateContent === true ) {
      this.editor.setValue( text );
      this.editor.clearSelection();
      this.editor.focus();
      this.editor.moveCursorTo( 0, 0 );
    }
  }

  @Input() set autoUpdateContent( status: any ) {
    this._autoUpdateContent = status;
  }
}
