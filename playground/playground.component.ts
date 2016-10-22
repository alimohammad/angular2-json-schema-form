import {
  AfterViewInit, Component, OnInit, ViewChild, ViewContainerRef
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  FormArray, FormControl, FormGroup, FormBuilder, NgForm, Validators
} from '@angular/forms';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import * as _ from 'lodash';

import { JsonPointer } from '../json-schema-form/utilities/jsonpointer';
import { forOwnDeep } from '../json-schema-form/utilities/utility-functions';

@Component({
  moduleId: module.id,
  selector: 'playground',
  templateUrl: 'playground.component.html',
  styleUrls: [ 'playground.component.css' ]
})
export class PlaygroundComponent implements OnInit, AfterViewInit {
  private examples: any = {
    exampleSetList: ['ng2jsf', 'rjsf', 'asf', 'jsf'],
    exampleSets: {
      'ng2jsf': 'Angular 2 JSON Schema Form examples',
      'rjsf': 'React JSON Schema Form compatibility examples',
      'asf': 'Angular Schema Form compatibility examples',
      'jsf': 'JSONForm compatibility examples',
    },
    exampleList: {
      'ng2jsf': [ 'ng2jsf-json-schema-draft04', 'ng2jsf-json-schema-draft03', ],
      'rjsf': [
        'rjsf-simple', 'rjsf-nested', 'rjsf-arrays', 'rjsf-numbers', 'rjsf-widgets',
        'rjsf-ordering', 'rjsf-references', 'rjsf-errors', 'rjsf-large',
        'rjsf-date-and-time', 'rjsf-validation', 'rjsf-files',
        // Note: 'rjsf-custom' not supported
      ],
      'asf': [
        'asf-simple', 'asf-basic-json-schema-type',
        'asf-bootstrap-grid', 'asf-complex-key-support', 'asf-array',
        'asf-tab-array', 'asf-titlemap-examples', 'asf-kitchen-sink',
        'asf-hack-conditional-required',
      ],
      'jsf': [
        'jsf-gettingstarted',
        'jsf-schema-basic', 'jsf-schema-morecomplex', 'jsf-schema-array',
        'jsf-schema-required', 'jsf-schema-default', 'jsf-schema-inlineref',
        'jsf-fields-common', 'jsf-fields-password', 'jsf-fields-textarea', 'jsf-fields-autocomplete',
        'jsf-fields-ace', 'jsf-fields-color', 'jsf-fields-checkbox', 'jsf-fields-checkboxes',
        'jsf-fields-select', 'jsf-fields-radios', 'jsf-fields-radiobuttons',
        'jsf-fields-range', 'jsf-fields-imageselect', 'jsf-fields-fieldset',
        'jsf-fields-advancedfieldset', 'jsf-fields-authfieldset', 'jsf-fields-section',
        'jsf-fields-actions', 'jsf-fields-array', 'jsf-fields-tabarray',
        'jsf-fields-tabarray-maxitems', 'jsf-fields-tabarray-value',
        'jsf-fields-selectfieldset', 'jsf-fields-selectfieldset-key', 'jsf-fields-submit',
        'jsf-fields-help', 'jsf-fields-hidden', 'jsf-fields-questions',
        'jsf-templating-idx', 'jsf-templating-value', 'jsf-templating-values',
        'jsf-templating-tpldata', 'jsf-events', 'jsf-previousvalues', 'jsf-previousvalues-multidimensional',
      ],
    },
    examples: {
      'ng2jsf': {
        'ng2jsf-json-schema-draft04': 'JSON Meta-Schema - Version 4',
        'ng2jsf-json-schema-draft03': 'JSON Meta-Schema - Version3',
      },
      'rjsf': {
        'rjsf-simple': 'Simple',
        'rjsf-nested': 'Nested',
        'rjsf-arrays': 'Arrays',
        'rjsf-numbers': 'Numbers',
        'rjsf-widgets': 'Widgets',
        'rjsf-ordering': 'Ordering',
        'rjsf-references': 'References',
        'rjsf-custom': 'Custom',
        'rjsf-errors': 'Errors',
        'rjsf-large': 'Large',
        'rjsf-date-and-time': 'Date & Time',
        'rjsf-validation': 'Validation',
        'rjsf-files': 'Files',
      },
      'asf': {
        'asf-simple': 'Simple',
        'asf-basic-json-schema-type': 'Basic JSON Schema Type',
        'asf-bootstrap-grid': 'Bootstrap Grid',
        'asf-complex-key-support': 'Complex Key Support',
        'asf-array': 'Array',
        'asf-tab-array': 'Tab Array',
        'asf-titlemap-examples': 'TitleMap Examples',
        'asf-kitchen-sink': 'Kitchen Sink',
        'asf-hack-conditional-required': 'Hack: Conditional Required',
      },
      'jsf': {
        'jsf-gettingstarted': 'Getting started',
        'jsf-schema-basic': 'JSON Schema - A basic example',
        'jsf-schema-morecomplex': 'JSON Schema - Slightly more complex example',
        'jsf-schema-array': 'JSON Schema - Arrays',
        'jsf-schema-required': 'JSON Schema - Required field',
        'jsf-schema-default': 'JSON Schema - Default values',
        'jsf-schema-inlineref': 'JSON Schema - Inline $ref to definitions',
        'jsf-fields-common': 'Fields - Common properties',
        'jsf-fields-password': 'Fields - Gathering secrets: the password type',
        'jsf-fields-textarea': 'Fields - Large text: the textarea type',
        'jsf-fields-autocomplete': 'Fields - text field with jquery-ui autocomplete',
        'jsf-fields-ace': 'Fields - Code (JavaScript, JSON...): the ace type',
        'jsf-fields-color': 'Fields - Color picker: the color type',
        'jsf-fields-checkbox': 'Fields - Boolean flag: the checkbox type',
        'jsf-fields-checkboxes': 'Fields - Multiple options: the checkboxes type',
        'jsf-fields-select': 'Fields - Selection list: the select type',
        'jsf-fields-radios': 'Fields - A list of radio buttons: the radios type',
        'jsf-fields-radiobuttons': 'Fields - Radio buttons as real buttons: the radio buttons type',
        'jsf-fields-range': 'Fields - Number: the range type',
        'jsf-fields-imageselect': 'Fields - Image selector: the imageselect type',
        'jsf-fields-fieldset': 'Fields - Grouping: the fieldset type',
        'jsf-fields-advancedfieldset': 'Fields - Advanced options section: the advancedfieldset type',
        'jsf-fields-authfieldset': 'Fields - Authentication settings section: the authfieldset type',
        'jsf-fields-section': 'Fields - Generic group: the section type',
        'jsf-fields-actions': 'Fields - Group of buttons: the actions type',
        'jsf-fields-array': 'Fields - Generic array: the array type',
        'jsf-fields-tabarray': 'Fields - Arrays with tabs: the tabarray type',
        'jsf-fields-tabarray-maxitems': 'Fields - Arrays with tabs: the tabarray type w/ maxItems',
        'jsf-fields-tabarray-value': 'Fields - Arrays with tabs: the tabarray type w/ default & legend',
        'jsf-fields-selectfieldset': 'Fields - Alternative: the selectfieldset type',
        'jsf-fields-selectfieldset-key': 'Fields - Alternative with schema key',
        'jsf-fields-submit': 'Fields - Submit the form: the submit type',
        'jsf-fields-help': 'Fields - Guide users: the help type',
        'jsf-fields-hidden': 'Fields - Hidden form values: the hidden type',
        'jsf-fields-questions': 'Fields - Series of questions: the questions type',
        'jsf-templating-idx': 'Templating - item index with idx',
        'jsf-templating-value': 'Templating - tab legend with value and valueInLegend',
        'jsf-templating-values': 'Templating - values.xxx to reference another field',
        'jsf-templating-tpldata': 'Templating - Using the tpldata property',
        'jsf-events': 'Using event handlers',
        'jsf-previousvalues': 'Using previously submitted values',
        'jsf-previousvalues-multidimensional': 'Using previously submitted values - Multidimensional arrays',
      },
    },
  };
  private selectedSet: string = 'asf';
  private selectedExample: string = 'asf-basic-json-schema-type';

  private formActive: boolean = false;
  private aceHeight: number = 600;
  private greatform: any;
  private jsonFormSchema: string;
  private jsonFormValid: boolean = false;
  private jsonFormErrorMessage: string = 'Loading form...';
  private jsonFormObject: any;
  private liveFormData: any = {};
  private formValidationErrors: any;
  private formIsValid: any;
  private submittedFormData: any = {};
  private aceEditorOptions: any = {
    highlightActiveLine: true,
    maxLines: 1000,
    printMargin: false,
    autoScrollEditorIntoView: true,
  };

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: Http,
  ) { }

  ngOnInit() {
    // Checks query string for the name of a form to load
    this.route.queryParams.subscribe(
      params => {
        if (params['set']) this.selectedSet = params['set'];
        if (params['example']) this.selectedExample = params['example'];
      }
    );
  }

  ngAfterViewInit() {
    this.loadSelectedExample();
  }

  onSubmit(data: any) {
    this.submittedFormData = data;
  }

  get prettySubmittedFormData() {
    return JSON.stringify(this.submittedFormData, null, 2);
  }

  onChanges(data: any) {
    this.liveFormData = data;
  }

  get prettyLiveFormData() {
    return JSON.stringify(this.liveFormData, null, 2);
  }

  isValid(data: any) {
    this.formIsValid = data;
  }

  validationErrors(data: any) {
    this.formValidationErrors = data;
  }

  get prettyValidationErrors() {
    if (!this.formValidationErrors) return null;
    let prettyValidationErrors = '';
    for (let i = 0, l = this.formValidationErrors.length; i < l; i++) {
      let error = this.formValidationErrors[i];
      if (error.dataPath.length) {
        prettyValidationErrors += error.dataPath.slice(1) + ' ' + error.message + '\n';
      } else {
        prettyValidationErrors += error.message + '\n';
      }
    }
    return prettyValidationErrors;
  }

  private resizeAceEditor() {
    this.aceHeight = window.innerHeight - 230;
  }

  private loadSelectedSet(selectedSet?: string) {
    if (selectedSet && selectedSet !== this.selectedSet) {
      this.selectedSet = selectedSet;
      this.selectedExample = this.examples.exampleList[selectedSet][0];
      this.router.navigateByUrl('/?set=' + selectedSet + '&example=' + this.selectedExample);
      this.loadSelectedExample();
    }
  }

  // Load and display the selected schema
  // (runs whenever the user selects a schema from the drop-down menu)
  private loadSelectedExample(selectedSet?: string, selectedExample?: string) {
    if (selectedExample && selectedExample !== this.selectedExample) {
      this.selectedSet = selectedSet;
      this.selectedExample = selectedExample;
      this.router.navigateByUrl('/?set=' + selectedSet + '&example=' + selectedExample);
      this.liveFormData = {};
      this.submittedFormData = {};
      this.formIsValid = null;
      this.formValidationErrors = null;
    }
    this.http.get(
      'playground/examples/' + this.selectedExample + '.json'
    ).map(schema => schema.text()).subscribe(schema => {
      this.jsonFormSchema = schema;
      this.generateForm(this.jsonFormSchema);
    });
  };

  // Display the form entered by the user
  // (runs whenever the user changes the jsonform object in the ACE input field)
  private generateForm(newFormString: string) {
    if (!newFormString) { return; }
    this.formActive = false;
    this.liveFormData = {};
    this.submittedFormData = {};

    // Most examples should be written in pure JSON, but if a schema includes
    // a function, the playground will compile it as Javascript instead
    try {

      // Parse entered content as JSON
      this.jsonFormObject = JSON.parse(newFormString);
      this.jsonFormValid = true;
    } catch (jsonError) {
      try {

        // If entered content is not valid JSON,
        // parse as JavaScript instead to include functions
        let newFormObject: any = null;
        eval('newFormObject = ' + newFormString);
        this.jsonFormObject = newFormObject;
        this.jsonFormValid = true;
      } catch (javascriptError) {

        // If entered content is not valid JSON or JavaScript, show error
        this.jsonFormValid = false;
        this.jsonFormErrorMessage =
          'Entered content is not yet a valid JSON Form object.\n' +
          'JavaScript parser returned:\n\n' + jsonError;
        return;
      }
    }
    this.formActive = true;
  };
}