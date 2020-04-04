import { Controller, Inject, Route, HttpGet, HttpPost, FromHeader, FromRoute, FromQuery } from 'express-mvc-ts';
import { User } from '@models/User'
@Inject
@Route()
export class UsersController extends Controller {
    @HttpGet
    public async index() {
        const users = await User.findAll();
        return this.view('list', { users });
    }
}