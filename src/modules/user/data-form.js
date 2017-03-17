import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"

export class DataForm {
  @bindable title;
  @bindable readOnly;

  roleColumns = [
    { header: "Code", value: "code" },
    { header: "Name", value: "name" },
    { header: "Description", value: "description" },
  ]
  genderOptions = ["male", "female"];

  constructor() {
    // this.backlogService = new RestService("core", "backlogs");
  }

  async bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.data.profile = this.data.profile || {};
    this.error = this.context.error;

    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;
  }

  @computedFrom("data.id")
  get isEdit() {
    return (this.data.id || '').toString() !== '';
  }
} 
