
@extends('web.layouts.master')
@section('body')

    <!--================ Start Banner Area =================-->
    {{-- <section class="banner_area">
        <div class="banner_inner d-flex align-items-center">
            <div class="container">
                <div class="banner_content text-center">
                    <h2>Services</h2>
                    <div class="page_link">
                        <a href="index.html">Home</a>
                        <a href="services.html">Services</a>
                    </div>
                </div>
            </div>
        </div>
    </section> --}}
    <!--================ End Banner Area =================-->

	<!--================ Start Features Area =================-->
	<section class="features_area section_gap_top">
        <div class="container" style="max-width: unset;">
            <div class="row justify-content-center">
                <div class="col-lg-8 text-center">
                    <div class="main_title">
                        <h2>service offers </h2>
                        {{-- <p>
                            Is give may shall likeness made yielding spirit a itself togeth created
                            after sea <br> is in beast beginning signs open god you're gathering ithe
                        </p> --}}
                    </div>
                </div>
            </div>
            <div class="row feature_inner">
				<div class="col-lg-2 col-md-6">
					<div class="feature_item">
						<img src="/assets/img/services/s1.png" alt="">
						<h4>Web developing</h4>
						<p>Websites serve as the global face of organizations. Develop stunning, tailor-made websites with our services, ensuring quality, excellence, and virtue in delivery.</p>
					</div>
				</div>
                <div class="col-lg-2 col-md-6">
					<div class="feature_item">
						<img src="/assets/img/services/s2.png" alt="">
						<h4>Api's Development</h4>
						<p>Expertise in developing and optimizing mobile APIs across projects, ensuring seamless integration and enhanced functionality. Contribute to improved user experiences with efficient, tailored API solutions for mobile platforms.</p>
					</div>
				</div>
				<div class="col-lg-2 col-md-6">
					<div class="feature_item">
						<img src="/assets/img/services/s4.png" alt="">
						<h4>Hosting</h4>
						<p>Shared Hosting, Virtual Private Server, Cloud Based Hosting, and Dedicated Hosting.</p>
					</div>
				</div>
				<div class="col-lg-2 col-md-6">
					<div class="feature_item">
						<img src="/assets/img/services/s3.png" alt="">
						<h4>Design and Branding</h4>
						<p>An inventive logo,brochure,business card acquaints you with your customers and business accomplices with no clarification. Brochure design, Logo Design, Banners Design, Business Card Design, Layout design.</p>
					</div>
				</div>
				<div class="col-lg-2 col-md-6">
					<div class="feature_item">
						<img src="/assets/img/services/s2.png" alt="">
						<h4>seo optimize</h4>
						<p>Enhance your online visibility and search engine rankings with our expert SEO optimization services. We employ effective strategies to ensure your website stands out in search results and attracts more visitors.</p>
					</div>
				</div>
                <div class="col-lg-2 col-md-6">
					<div class="feature_item">
						<img src="/assets/img/services/s4.png" alt="">
						<h4>Consultation</h4>
						<p>We provide online and onsite IT consulting services to organizations and individuals in Qatar to assist them through the technology crossroads. We can help you to navigate through the difficult IT choices you may have to make in your organization.</p>
					</div>
				</div>
			</div>
        </div>
    </section>
    <!--================ End Features Area =================-->

	<!--================ Start Testimonial Area =================-->
	{{-- <div class="testimonial_area section_gap_bottom">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-8 text-center">
                    <div class="main_title">
                        <h2>client say about me</h2>
                        <p>Is give may shall likeness made yielding spirit a itself togeth created after sea is in beast <br>
                                beginning signs open god you're gathering ithe</p>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="testi_slider owl-carousel">
                    <div class="testi_item">
                        <div class="row">
                            <div class="col-lg-4">
                                <img src="/assets/img/testimonials/t1.jpg" alt="">
                            </div>
                            <div class="col-lg-8">
                                <div class="testi_text">
                                    <h4>Elite Martin</h4>
                                    <p>Him, made can't called over won't there on divide there male fish beast own his day third seed sixth seas unto. Saw from </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="testi_item">
                        <div class="row">
                            <div class="col-lg-4">
                                <img src="/assets/img/testimonials/t2.jpg" alt="">
                            </div>
                            <div class="col-lg-8">
                                <div class="testi_text">
                                    <h4>Davil Saden</h4>
                                    <p>Him, made can't called over won't there on divide there male fish beast own his day third seed sixth seas unto. Saw from </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="testi_item">
                        <div class="row">
                            <div class="col-lg-4">
                                <img src="/assets/img/testimonials/t1.jpg" alt="">
                            </div>
                            <div class="col-lg-8">
                                <div class="testi_text">
                                    <h4>Elite Martin</h4>
                                    <p>Him, made can't called over won't there on divide there male fish beast own his day third seed sixth seas unto. Saw from </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="testi_item">
                        <div class="row">
                            <div class="col-lg-4">
                                <img src="/assets/img/testimonials/t2.jpg" alt="">
                            </div>
                            <div class="col-lg-8">
                                <div class="testi_text">
                                    <h4>Davil Saden</h4>
                                    <p>Him, made can't called over won't there on divide there male fish beast own his day third seed sixth seas unto. Saw from </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="testi_item">
                        <div class="row">
                            <div class="col-lg-4">
                                <img src="/assets/img/testimonials/t1.jpg" alt="">
                            </div>
                            <div class="col-lg-8">
                                <div class="testi_text">
                                    <h4>Elite Martin</h4>
                                    <p>Him, made can't called over won't there on divide there male fish beast own his day third seed sixth seas unto. Saw from </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="testi_item">
                        <div class="row">
                            <div class="col-lg-4">
                                <img src="/assets/img/testimonials/t2.jpg" alt="">
                            </div>
                            <div class="col-lg-8">
                                <div class="testi_text">
                                    <h4>Davil Saden</h4>
                                    <p>Him, made can't called over won't there on divide there male fish beast own his day third seed sixth seas unto. Saw from </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> --}}
    <!--================ End Testimonial Area =================-->

    <!--================ Start Newsletter Area =================-->
    {{-- <section class="newsletter_area">
        <div class="container">
            <div class="row justify-content-center align-items-center">
                <div class="col-lg-12">
                    <div class="subscription_box text-center">
                        <h2 class="text-uppercase text-white">get update from anywhere</h2>
                        <p class="text-white">
                            Bearing Void gathering light light his eavening unto dont afraid.
                        </p>
                        <div class="subcribe-form" id="mc_embed_signup">
                            <form target="_blank" novalidate="true" action="https://spondonit.us12.list-manage.com/subscribe/post?u=1462626880ade1ac87bd9c93a&amp;id=92a4423d01" method="get" class="subscription relative">
                                <input name="EMAIL" placeholder="Email address" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Email address'" required="" type="email">
                                <div style="position: absolute; left: -5000px;">
                                    <input name="b_36c4fd991d266f23781ded980_aefe40901a" tabindex="-1" value="" type="text">
                                </div>
                                <button class="primary-btn hover d-inline">Get Started</button>
                                <div class="info"></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section> --}}
    <!--================ End Newsletter Area =================-->

@endsection
