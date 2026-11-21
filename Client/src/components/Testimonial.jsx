
import React from "react";

function Testimonial() {
    const testimonials = [
        {
            name: "Akshay Shetye",
            role: "Shop Owner",
            image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100",
            review:
                "Amazing car rental experience! The booking process was simple, the car was clean, and the overall journey was very comfortable.",
        },
        {
            name: "Daksh Jage",
            role: "Video-Grapher",
            image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
            review:
                "TravelSphere made our road trip memorable. Great collection of cars, affordable prices, and excellent customer service.",
        },
        {
            name: "Tatya Vinchu",
            role: "Accountant",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
            review:
                "Very smooth and hassle-free experience. Easy pickup, well-maintained vehicles, and a perfect choice for comfortable travel.",
        },
    ];

    return (
        <section className="px-5 md:px-12 lg:px-20 py-16">
            <div className="text-center mb-12">
                <p className="text-orange-500 font-semibold uppercase tracking-widest text-sm">
                    Testimonials
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">
                    What Our Customers Say
                </h2>
                <p className="text-gray-500 mt-3 max-w-xl mx-auto">
                    Discover why travelers trust TravelSphere for comfortable and
                    memorable journeys.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 max-w-6xl mx-auto">
                {testimonials.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm
            hover:shadow-xl hover:-translate-y-2 hover:border-orange-300
            transition-all duration-300 ease-in-out"
                    >
                        <div className="flex items-center gap-4 mb-5">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-14 h-14 rounded-full object-cover border-2 border-orange-400"
                            />

                            <div>
                                <h3 className="font-semibold text-gray-800 text-lg">
                                    {item.name}
                                </h3>
                                <p className="text-gray-500 text-sm">{item.role}</p>
                            </div>
                        </div>

                        <div className="text-orange-500 text-lg tracking-wider mb-4">
                            ★★★★★
                        </div>

                        <p className="text-gray-600 text-sm leading-7">
                            "{item.review}"
                        </p>

                        <div className="mt-5 pt-4 border-t border-gray-100 flex justify-between items-center">
                            <span className="text-sm text-gray-500">
                                Verified Customer
                            </span>
                            <span className="text-orange-500 text-xl">❝</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Testimonial;
