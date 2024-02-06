<?php

namespace App\Http\Controllers\WEB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        return view("web.home.index");
    }

    public function aboutUs()
    {
        return view("web.about.index");
    }
    public function services()
    {
        return view("web.services.index");
    }
    public function portfolio()
    {
        return view("web.portfolio.index");
    }
    public function blog()
    {
        return view("web.blog.index");
    }
    public function blogDetail()
    {
        return view("web.blog.detail");
    }
    public function contactUs()
    {
        return view("web.contact.index");
    }
}
