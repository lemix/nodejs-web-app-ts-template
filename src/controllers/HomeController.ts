import { Controller, Inject, Route, HttpGet } from 'express-mvc-ts';

@Inject
@Route('')
export class HomeController extends Controller {
    @HttpGet
    public index() {
        return this.view();
    }
}