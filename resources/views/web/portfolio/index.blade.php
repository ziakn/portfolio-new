
@extends('web.layouts.master')
@section('body')
	 <!--================ Start Banner Area =================-->
     {{-- <section class="banner_area">
        <div class="banner_inner d-flex align-items-center">
            <div class="container">
                <div class="banner_content text-center">
                    <h2>Portfolio</h2>
                    <div class="page_link">
                        <a href="index.html">Home</a>
                        <a href="portfolio.html">Portfolio</a>
                    </div>
                </div>
            </div>
        </div>
    </section> --}}
    <!--================ End Banner Area =================-->

	<!--================Start Portfolio Area =================-->
	<section class="portfolio_area section_gap_top" id="portfolio">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="main_title text-left">
                        <h2>quality work <br>
                            Recently done project </h2>
                    </div>
                </div>
            </div>
            <div class="filters portfolio-filter">
                <ul>
                    <li class="active" data-filter="*">all</li>
                    {{-- <li data-filter=".popular">popular</li>
                    <li data-filter=".latest"> latest</li>
                    <li data-filter=".following">following</li>
                    <li data-filter=".upcoming">upcoming</li> --}}
                </ul>
            </div>

            <div class="filters-content">
				<div class="row portfolio-grid justify-content-center">
					<div class="col-lg-4 col-md-6 all latest">
						<div class="portfolio_box">
							<div class="single_portfolio">
								{{-- <img class="img-fluid w-100" src="/assets/img/portfolio/p1.jpg" alt=""> --}}
								<div class="overlay"></div>
								<a href="img/portfolio/p1.jpg" class="img-gal">
									<div class="icon">
										<span class="lnr lnr-cross"></span>
									</div>
								</a>
							</div>
							<div class="short_info">
								<h4><a href="#">Al sharq News Paper</a></h4>
								<p>
                               Al Sharq  is a daily Arabic newspaper published in Qatar. Established in 1980, Al Sharq is one of the leading newspapers in Qatar and covers various topics, including local and international news, politics, business, sports, culture, and more. It has a significant readership and is known for its informative and comprehensive coverage of current affairs in Qatar and beyond.</p>
							</div>
						</div>
					</div>
					<div class="col-lg-4 col-md-6 all popular">
						<div class="portfolio_box">
							<div class="single_portfolio">
								{{-- <img class="img-fluid w-100" src="/assets/img/portfolio/p2.jpg" alt=""> --}}
								<div class="overlay"></div>
								<a href="img/portfolio/p2.jpg" class="img-gal">
									<div class="icon">
										<span class="lnr lnr-cross"></span>
									</div>
								</a>
							</div>
							<div class="short_info">
								<h4><a href="#">The Peninsula Qatar English News Paper</a></h4>
								<p>
                                    "The Peninsula" is an English-language daily newspaper based in Qatar. It covers a wide range of topics, including local and international news, business, politics, sports, entertainment, and more. "The Peninsula" is known for its comprehensive coverage of events in Qatar and the Gulf region, providing readers with timely and accurate information. It serves as a prominent source of news and analysis for residents of Qatar as well as expatriates and individuals interested in developments in the Gulf.</p>
							</div>
						</div>
					</div>
					<div class="col-lg-4 col-md-6 all latest">
						<div class="portfolio_box">
							<div class="single_portfolio">
								{{-- <img class="img-fluid w-100" src="/assets/img/portfolio/p3.jpg" alt=""> --}}
								<div class="overlay"></div>
								<a href="img/portfolio/p3.jpg" class="img-gal">
									<div class="icon">
										<span class="lnr lnr-cross"></span>
									</div>
								</a>
							</div>
							<div class="short_info">
								<h4><a href="#">Lusail News Arabic News Paper</a></h4>
								<p>"Lusail News" is an Arabic-language newspaper based in Qatar. It covers various topics, including local and international news, politics, business, sports, culture, and more. As an Arabic newspaper, "Lusail News" caters to Arabic-speaking readers in Qatar and the broader Arab world. It provides comprehensive coverage of events and developments, offering analysis and insights into issues relevant to its audience. "Lusail News" contributes to the media landscape in Qatar by providing a platform for Arabic-language journalism and facilitating communication and information dissemination within the community.</p>
							</div>
						</div>
					</div>
					<div class="col-lg-4 col-md-6 all popular">
						<div class="portfolio_box">
							<div class="single_portfolio">
								{{-- <img class="img-fluid w-100" src="/assets/img/portfolio/p4.jpg" alt=""> --}}
								<div class="overlay"></div>
								<a href="img/portfolio/p4.jpg" class="img-gal">
									<div class="icon">
										<span class="lnr lnr-cross"></span>
									</div>
								</a>
							</div>
							<div class="short_info">
								<h4><a href="#">Alwaraq
                                    Printing Press</a></h4>
								<p>"Alwaraq" is a printing press based in Qatar. As a printing press, Alwaraq provides various printing services, including commercial printing, offset printing, digital printing, and more. It caters to a wide range of clients, including businesses, government agencies, educational institutions, and individuals, offering solutions for printing needs such as brochures, flyers, posters, business cards, stationery, books, magazines, and other printed materials.

                                </p>
							</div>
						</div>
					</div>
					<div class="col-lg-4 col-md-6 all following">
						<div class="portfolio_box">
							<div class="single_portfolio">
								{{-- <img class="img-fluid w-100" src="/assets/img/portfolio/p6.jpg" alt=""> --}}
								<div class="overlay"></div>
								<a href="img/portfolio/p5.jpg" class="img-gal">
									<div class="icon">
										<span class="lnr lnr-cross"></span>
									</div>
								</a>
							</div>
							<div class="short_info">
								<h4><a href="#">Top Solutions Qatar event planner
                                </a></h4>
								<p>
                                    "Top Solutions Qatar" specializes in event planning and management services tailored to your needs. From corporate gatherings to social celebrations, exhibitions, and weddings, we handle everything from venue selection to logistics, ensuring a seamless and memorable experience. Let us bring your vision to life with creativity, professionalism, and attention to detail.</p>
							</div>
						</div>
					</div>
					<div class="col-lg-4 col-md-6 all upcoming">
						<div class="portfolio_box">
							<div class="single_portfolio">
								{{-- <img class="img-fluid w-100" src="/assets/img/portfolio/p5.jpg" alt=""> --}}
								<div class="overlay"></div>
								<a href="img/portfolio/p6.jpg" class="img-gal">
									<div class="icon">
										<span class="lnr lnr-cross"></span>
									</div>
								</a>
							</div>
							<div class="short_info">
								<h4><a href="#">Dar Al Sharq Group
                                    Corporate</a></h4>
								<p>"Dare Al Sharq Group" is a prominent corporate entity in Qatar, renowned for its diverse range of businesses and unwavering commitment to excellence. With a focus on innovation and customer satisfaction, we strive to make a positive impact across various industries, including media, hospitality, real estate, and more. Our dedication to quality and integrity drives us to exceed expectations and contribute positively to the growth and development of Qatar's economy.</p>
							</div>
						</div>
					</div>
					<div class="col-lg-4 col-md-6 all upcoming following">
						<div class="portfolio_box">
							<div class="single_portfolio">
								{{-- <img class="img-fluid w-100" src="/assets/img/portfolio/p7.jpg" alt=""> --}}
								<div class="overlay"></div>
								<a href="img/portfolio/p7.jpg" class="img-gal">
									<div class="icon">
										<span class="lnr lnr-cross"></span>
									</div>
								</a>
							</div>
							<div class="short_info">
								<h4><a href="#">Alsharq Technology
                                    Corporate</a></h4>
								<p>"Alsharq Technology" is a forward-thinking corporate entity based in Qatar, dedicated to providing innovative technological solutions. With expertise in areas such as IT services, software development, and digital transformation, we empower businesses to thrive in the digital age. Our commitment to excellence and customer satisfaction drives us to deliver tailored solutions that meet the unique needs of our clients, driving growth and success in today's competitive landscape.</p>
							</div>
						</div>
					</div>
					<div class="col-lg-4 col-md-6 all following">
						<div class="portfolio_box">
							<div class="single_portfolio">
								{{-- <img class="img-fluid w-100" src="/assets/img/portfolio/p8.jpg" alt=""> --}}
								<div class="overlay"></div>
								<a href="img/portfolio/p8.jpg" class="img-gal">
									<div class="icon">
										<span class="lnr lnr-cross"></span>
									</div>
								</a>
							</div>
							<div class="short_info">
								<h4>Al mahbrah
                                    E-Commerce</h4>
								<p>"Al Mahbrah" is a leading e-commerce platform in Qatar, providing customers with convenient access to a wide selection of products and services. From electronics and fashion to home goods and groceries, we offer a seamless shopping experience with secure payment options and reliable delivery services. Our commitment to customer satisfaction and quality ensures that shoppers can find what they need with ease and confidence, making "Al Mahbrah" the preferred choice for online shopping in Qatar.</p>
							</div>
						</div>
					</div>
					<div class="col-lg-4 col-md-6 all upcoming">
						<div class="portfolio_box">
							<div class="single_portfolio">
								{{-- <img class="img-fluid w-100" src="/assets/img/portfolio/p9.jpg" alt=""> --}}
								<div class="overlay"></div>
								<a href="img/portfolio/p9.jpg" class="img-gal">
									<div class="icon">
										<span class="lnr lnr-cross"></span>
									</div>
								</a>
							</div>
							<div class="short_info">
								<h4><a href="#">Eaqaqa
                                    Research And Innovation</a></h4>
								<p>"Eaqaqa" is a groundbreaking research and innovation hub in Qatar, committed to pushing the boundaries of knowledge and discovery. Through collaborative partnerships and cutting-edge research initiatives, we strive to address complex challenges and drive positive change across various sectors. Our focus on innovation fuels our quest to develop groundbreaking solutions that have a meaningful impact on society, positioning "Eaqaqa" as a catalyst for progress and advancement in Qatar and beyond.</p>
							</div>
						</div>
					</div>
                    <div class="col-lg-4 col-md-6 all upcoming">
						<div class="portfolio_box">
							<div class="single_portfolio">
								{{-- <img class="img-fluid w-100" src="/assets/img/portfolio/p9.jpg" alt=""> --}}
								<div class="overlay"></div>
								<a href="img/portfolio/p9.jpg" class="img-gal">
									<div class="icon">
										<span class="lnr lnr-cross"></span>
									</div>
								</a>
							</div>
							<div class="short_info">
								<h4><a href="#">Billing CRM
                                    Billing</a></h4>
								<p>"Billing CRM" is a sophisticated billing software that simplifies invoicing and payment collection for businesses. With features such as automated billing, invoice generation, and payment tracking, it enables businesses to manage their billing processes efficiently. "Billing CRM" also offers customization options to suit the specific needs of different industries and businesses, making it a versatile solution for managing finances effectively. Whether it's recurring billing, subscription management, or payment reminders, "Billing CRM" ensures accuracy and reliability in financial transactions, ultimately enhancing the overall billing experience for both businesses and their customers.</p>
							</div>
						</div>
					</div>
                    <div class="col-lg-4 col-md-6 all upcoming">
						<div class="portfolio_box">
							<div class="single_portfolio">
								{{-- <img class="img-fluid w-100" src="/assets/img/portfolio/p9.jpg" alt=""> --}}
								<div class="overlay"></div>
								<a href="img/portfolio/p9.jpg" class="img-gal">
									<div class="icon">
										<span class="lnr lnr-cross"></span>
									</div>
								</a>
							</div>
							<div class="short_info">
								<h4><a href="#">Tiollo
                                    Food And Restaurants</a></h4>
								<p>"Tiollo" is a cutting-edge platform that redefines the food and restaurant experience. By seamlessly connecting diners with a diverse range of culinary offerings, Tiollo offers unparalleled convenience and choice. From discovering new eateries to ordering food for delivery or pickup, Tiollo provides a hassle-free way to explore and enjoy the vibrant culinary scene. With its user-friendly interface and robust features, Tiollo caters to food enthusiasts and restaurants alike, fostering a dynamic ecosystem that celebrates culinary creativity and gastronomic delight.</p>
							</div>
						</div>
					</div>
                    <div class="col-lg-4 col-md-6 all upcoming">
						<div class="portfolio_box">
							<div class="single_portfolio">
								{{-- <img class="img-fluid w-100" src="/assets/img/portfolio/p9.jpg" alt=""> --}}
								<div class="overlay"></div>
								<a href="img/portfolio/p9.jpg" class="img-gal">
									<div class="icon">
										<span class="lnr lnr-cross"></span>
									</div>
								</a>
							</div>
							<div class="short_info">
								<h4><a href="#">Almass Water distrbution system
                                    Marketing and Graphic Design</a></h4>
								<p>"Almass Water Distribution System" serves as the backbone of water supply infrastructure, ensuring reliable and efficient distribution of water to homes, businesses, and institutions. Through a network of pipes, pumps, reservoirs, and treatment facilities, Almass delivers clean and safe water to meet the needs of the population. With a focus on sustainability and quality, Almass plays a crucial role in safeguarding public health and supporting economic development by providing access to essential water resources.</p>
							</div>
						</div>
					</div>
                    <div class="col-lg-4 col-md-6 all upcoming">
						<div class="portfolio_box">
							<div class="single_portfolio">
								{{-- <img class="img-fluid w-100" src="/assets/img/portfolio/p9.jpg" alt=""> --}}
								<div class="overlay"></div>
								<a href="img/portfolio/p9.jpg" class="img-gal">
									<div class="icon">
										<span class="lnr lnr-cross"></span>
									</div>
								</a>
							</div>
							<div class="short_info">
								<h4><a href="#">Ajt Qatar Properties
                                    Real Estate</a></h4>
								<p>"Ajt Qatar Properties" is a prominent player in the real estate sector, renowned for its expertise in property development and management. With a diverse portfolio of residential, commercial, and mixed-use projects, Ajt Qatar Properties is committed to delivering high-quality developments that meet the needs of modern lifestyles and businesses. From luxury residences to state-of-the-art office spaces and retail destinations, Ajt Qatar Properties sets the standard for excellence in the Qatari real estate market, providing innovative solutions and exceptional service to investors, tenants, and stakeholders alike.</p>
							</div>
						</div>
					</div>
                    <div class="col-lg-4 col-md-6 all upcoming">
						<div class="portfolio_box">
							<div class="single_portfolio">
								{{-- <img class="img-fluid w-100" src="/assets/img/portfolio/p9.jpg" alt=""> --}}
								<div class="overlay"></div>
								<a href="img/portfolio/p9.jpg" class="img-gal">
									<div class="icon">
										<span class="lnr lnr-cross"></span>
									</div>
								</a>
							</div>
							<div class="short_info">
								<h4><a href="#">SSR Qatar
                                    Recruitement Agency</a></h4>
								<p>SSR is a recruitment agency in Qatar. It is one of the fastest growing recruitment agencies in Qatar duly licensed and approved by the Ministry of Labor, Government of Qatar, managed by a team of highly experienced and motivated HR professionals.SSR provides recruiting services for the diffrent trades and industries. Like Information Technology, Human Resource, Engineering, Oil & Gas, Construction, Medical, HVAC, Household.</p>
							</div>
						</div>
					</div>

				</div>
			</div>
        </div>
    </section>
    <!--================End Portfolio Area =================-->

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
