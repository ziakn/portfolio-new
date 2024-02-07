<?php

namespace App\Http\Controllers\WEB;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\contactU;
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
        $data = Blog::orderBy("created_at", "desc")->paginate(10);
        return view("web.blog.index",[
            "data" =>$data
        ]);
    }
    public function blogDetail()
    {
        return view("web.blog.detail");
    }
    public function contactUs()
    {
        return view("web.contact.index");
    }


    public function sendMail(Request $request)
    {

        // dd('hi');

        // $recaptcha=$this->checkValidate($request);
        // if (!$recaptcha) {
        //     return redirect()->back()->with('recaptcha','');
        // }

        // $request->merge(['contact_email' => config("app.contact_email")]);

// dd($request->all());
            $data['email'] =$request->email;
            $data['name'] =$request->name;
            $data['subject'] =$request->subject;
            // $data['mobile'] =$request->mobile;
            $data['text'] =$request->message;
            // Mail::send('mail.mailview', $data, function($message) use ($request) {
            //     $message->to($request->contact_email , $request->name )
            //     ->subject($request->subject);
            // });

            contactU::create([
                "name" =>$request->name,
                "email" =>$request->email,
                "subject" =>$request->subject,
                "message" =>$request->message
            ]);



            // $targetUrl = back()->getTargetUrl();
            // $prefix='?s=1';
            // if(str_contains($targetUrl, 'd=1'))
            // {
            //     $prefix='&s=1';
            // }
            // return redirect($targetUrl.$prefix);
            return redirect()->back();
    }

}
