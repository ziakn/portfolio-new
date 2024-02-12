@extends('web.layouts.master')
@section('body')
        <!--================Blog Categorie Area =================-->
        <section class="blog_categorie_area section_gap_top" style="padding-top:100px; padding-bottom: 20px">
                <div class="container">
                        <nav class="navbar navbar-expand-lg navbar-light bg-light">
                                <div class="container-fluid">

                                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                                    @foreach ($category as  $cat)
                                                    <li class="nav-item">
                                                        <a class="nav-link" href="{{url()->current()."?category=".$cat->slug}}">{{$cat->title??""}}</a>
                                                </li>
                                                    @endforeach

                                                </ul>
                                        </div>
                                </div>
                        </nav>
                        {{-- <div class="blog_right_sidebar">
                                <aside class="single_sidebar_widget search_widget">
                                        <div class="input-group">
                                                <input type="text" name="q" value="" class="form-control" placeholder="Search Posts">
                                                <span class="input-group-btn">
                                                        <button class="btn btn-default" type="button"><i
                                                                        class="lnr lnr-magnifier"></i></button>
                                                </span>
                                        </div>
                                </aside>
                        </div> --}}

                </div>
        </section>
        <!--================Blog Categorie Area =================-->

        <!--================Blog Area =================-->
        <section class="blog_area">
                <div class="container">
                        <div class="row">
                                <div class="col-lg-8">
                                        <div class="blog_left_sidebar">
                                                @foreach ($data as $key => $item)
                                                        <article class="row blog_item">
                                                                <div class="col-md-3">
                                                                        <div class="blog_info text-right">
                                                                                <div class="post_tag">
                                                                                        {{-- <a href="#">Food,</a> --}}
                                                                                        <a class="active"
                                                                                                href="{{url()->current()."?category=".$item->category?->slug}}">{{ $item->category?->title }}</a>
                                                                                        {{-- <a href="#">Politics,</a> --}}
                                                                                        {{-- <a href="#">Lifestyle</a> --}}
                                                                                </div>
                                                                                <ul class="blog_meta list">
                                                                                        {{-- <li><a href="#">Mark wiens<i class="lnr lnr-user"></i></a></li> --}}
                                                                                        <li><a href="#">{{ $item->created_at->diffForHumans() }}<i
                                                                                                                class="lnr lnr-calendar-full"></i></a>
                                                                                        </li>
                                                                                        <li><a href="#">{{ $item->viewed }}
                                                                                                        Views<i
                                                                                                                class="lnr lnr-eye"></i></a>
                                                                                        </li>
                                                                                        {{-- <li><a href="#">06 Comments<i class="lnr lnr-bubble"></i></a></li> --}}
                                                                                </ul>
                                                                        </div>
                                                                </div>
                                                                <div class="col-md-9">
                                                                        <a class="blog_post"
                                                                                href="{{ url('blog', $item->slug) }}">
                                                                                <img src="/assets/img/blog/main-blog/m-blog-1.jpg"
                                                                                        alt="">
                                                                                <div class="blog_details">
                                                                                        <a
                                                                                                href="{{ url('blog', $item->slug) }}">
                                                                                                <h2>{{ $item->title }}</h2>
                                                                                        </a>
                                                                                        <p>{!! \Illuminate\Support\Str::words($item->description, 30, $end = '...') !!}</p>
                                                                                        {{-- <a href="{{url("blog", $item->slug)}}" class="primary_btn"><span>View More</span></a> --}}
                                                                                </div>
                                                                        </a>
                                                                </div>
                                                        </article>
                                                @endforeach
                                                <nav class="blog-pagination justify-content-center d-flex">
                                                        <ul class="pagination">
                                                                <li class="page-item">
                                                                        <a href="{{ $data->previousPageUrl() }}"
                                                                                class="page-link" aria-label="Previous">
                                                                                <span aria-hidden="true">
                                                                                        <span
                                                                                                class="lnr lnr-chevron-left"></span>
                                                                                </span>
                                                                        </a>
                                                                </li>
                                                                @foreach ($data->getUrlRange(1, $data->lastPage()) as $page => $url)
                                                                        <li
                                                                                class="page-item {{ $page == $data->currentPage() ? 'active' : '' }}">
                                                                                <a href="{{ $url }}"
                                                                                        class="page-link">{{ $page }}</a>
                                                                        </li>
                                                                @endforeach
                                                                <li class="page-item">
                                                                        <a href="{{ $data->nextPageUrl() }}" class="page-link"
                                                                                aria-label="Next">
                                                                                <span aria-hidden="true">
                                                                                        <span
                                                                                                class="lnr lnr-chevron-right"></span>
                                                                                </span>
                                                                        </a>
                                                                </li>
                                                        </ul>
                                                </nav>

                                        </div>
                                </div>
                                <div class="col-lg-4">
                                        <div class="blog_right_sidebar">
                                                {{-- <aside class="single_sidebar_widget search_widget">
                            <div class="input-group">
                                <input type="text" class="form-control" placeholder="Search Posts">
                                <span class="input-group-btn">
                                    <button class="btn btn-default" type="button"><i class="lnr lnr-magnifier"></i></button>
                                </span>
                            </div>
                            <div class="br"></div>
                        </aside> --}}
                                                {{-- <aside class="single_sidebar_widget author_widget">
                            <img class="author_img rounded-circle" src="/assets/img/blog/author.png" alt="">
                            <h4>Charlie Barber</h4>
                            <p>Senior blog writer</p>
                            <div class="social_icon">
                                <a href="#"><i class="fa fa-facebook"></i></a>
                                <a href="#"><i class="fa fa-twitter"></i></a>
                                <a href="#"><i class="fa fa-github"></i></a>
                                <a href="#"><i class="fa fa-behance"></i></a>
                            </div>
                            <p>Boot camps have its supporters andit sdetractors. Some people do not understand why you should have to spend money on boot camp when you can get. Boot camps have itssuppor ters andits detractors.</p>
                            <div class="br"></div>
                        </aside> --}}
                                                {{-- <aside class="single_sidebar_widget popular_post_widget">
                            <h3 class="widget_title">Popular Posts</h3>
                            <div class="media post_item">
                                <img src="/assets/img/blog/popular-post/post1.jpg" alt="post">
                                <div class="media-body">
                                    <a href="single-blog.html"><h3>Space The Final Frontier</h3></a>
                                    <p>02 Hours ago</p>
                                </div>
                            </div>
                            <div class="media post_item">
                                <img src="/assets/img/blog/popular-post/post2.jpg" alt="post">
                                <div class="media-body">
                                    <a href="single-blog.html"><h3>The Amazing Hubble</h3></a>
                                    <p>02 Hours ago</p>
                                </div>
                            </div>
                            <div class="media post_item">
                                <img src="/assets/img/blog/popular-post/post3.jpg" alt="post">
                                <div class="media-body">
                                    <a href="single-blog.html"><h3>Astronomy Or Astrology</h3></a>
                                    <p>03 Hours ago</p>
                                </div>
                            </div>
                            <div class="media post_item">
                                <img src="/assets/img/blog/popular-post/post4.jpg" alt="post">
                                <div class="media-body">
                                    <a href="single-blog.html"><h3>Asteroids telescope</h3></a>
                                    <p>01 Hours ago</p>
                                </div>
                            </div>
                            <div class="br"></div>
                        </aside> --}}
                                                <aside class="single_sidebar_widget ads_widget">
                                                        <a href="#"><img class="img-fluid" src="/assets/img/blog/add.jpg"
                                                                        alt=""></a>
                                                        <div class="br"></div>
                                                </aside>
                                                <aside class="single_sidebar_widget post_category_widget">
                                                        <h4 class="widget_title">Post Catgories</h4>
                                                        <ul class="list cat-list">
                                                            @foreach ($category as  $cat)
                                                                <li>
                                                                        <a href="{{url()->current()."?category=".$cat->slug}}"
                                                                                class="d-flex justify-content-between">
                                                                                <p>{{$cat->title}}</p>
                                                                                {{-- <p>37</p> --}}
                                                                        </a>
                                                                </li>
                                                                @endforeach
                                                        </ul>
                                                </aside>
                                                {{-- <aside class="single-sidebar-widget newsletter_widget">
                            <h4 class="widget_title">Newsletter</h4>
                            <p>
                            Here, I focus on a range of items and features that we use in life without
                            giving them a second thought.
                            </p>
                            <div class="form-group d-flex flex-row">
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <div class="input-group-text"><i class="fa fa-envelope" aria-hidden="true"></i></div>
                                    </div>
                                    <input type="text" class="form-control" id="inlineFormInputGroup" placeholder="Enter email" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter email'">
                                </div>
                                <a href="#" class="bbtns">Subcribe</a>
                            </div>
                            <p class="text-bottom">You can unsubscribe at any time</p>
                            <div class="br"></div>
                        </aside>
                        <aside class="single-sidebar-widget tag_cloud_widget">
                            <h4 class="widget_title">Tag Clouds</h4>
                            <ul class="list">
                                <li><a href="#">Technology</a></li>
                                <li><a href="#">Fashion</a></li>
                                <li><a href="#">Architecture</a></li>
                                <li><a href="#">Fashion</a></li>
                                <li><a href="#">Food</a></li>
                                <li><a href="#">Technology</a></li>
                                <li><a href="#">Lifestyle</a></li>
                                <li><a href="#">Art</a></li>
                                <li><a href="#">Adventure</a></li>
                                <li><a href="#">Food</a></li>
                                <li><a href="#">Lifestyle</a></li>
                                <li><a href="#">Adventure</a></li>
                            </ul>
                        </aside> --}}
                                        </div>
                                </div>
                        </div>
                </div>
        </section>
        <!--================Blog Area =================-->
@endsection
