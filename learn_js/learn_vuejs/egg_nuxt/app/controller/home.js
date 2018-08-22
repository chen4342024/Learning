'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi, egg 123123 ' + this.app.nuxt;
  }
}

module.exports = HomeController;
