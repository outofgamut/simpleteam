import Image from "next/image";

import ProductHuntIcon from "@/components/shared/icons/producthunt";
import TwitterIcon from "@/components/shared/icons/twitter";

const testimonials = [
  {
    body: "Simpleteam has truly transformed how we handle skills management. It's refreshing to see a product that understands our needs so well! 😁",
    author: {
      name: "Jonathan Reimer",
      handle: "jonathimer",
      imageUrl:
        "https://pbs.twimg.com/profile_images/1704777684046209024/_JdBcXWp_400x400.jpg",
      link: "https://twitter.com/jonathimer/status/1663651278872891395",
    },
    producthunt: false,
  },
  {
    body: "This is fantastic! The MVP is impressive—especially how roles are auto-suggested. Makes managing skills so much easier! 🤩",
    author: {
      name: "Steven Tey",
      handle: "steventey",
      imageUrl:
        "https://pbs.twimg.com/profile_images/1506792347840888834/dS-r50Je_400x400.jpg",
      link: "https://twitter.com/steventey/status/1663611851807006721",
    },
    producthunt: false,
  },
  {
    body: "Loving all the new features rolling out! Simpleteam is making skills management a breeze. Keep up the great work!",
    author: {
      name: "alana goyal",
      handle: "alanaagoyal",
      imageUrl:
        "https://pbs.twimg.com/profile_images/1679538379070005248/jwGUle5U_400x400.jpg",
      link: "https://twitter.com/alanaagoyal/status/1663522718015270912",
    },
    producthunt: false,
  },
  {
    body: "Simpleteam's approach to managing skills is exactly what we've needed—straightforward and effective. It's a welcome improvement in how we handle our team's expertise.",
    author: {
      name: "Lukas Lunzmann",
      handle: "lucaslunzmann",
      imageUrl:
        "https://www.simpleteam.co/_static/testimonials/chloe.jpg",
      link: "https://twitter.com/lucaslunzmann/status/1673052992541523968",
    },
    producthunt: false,
  },
  {
    body: "We rely on heavily on Simpleteam for skills management. It's a brilliantly simple alternative to the usual complex solutions. The features are spot-on. Excited to see what's next!"
    ,
    author: {
      name: "Brian Orrell",
      handle: "borrell",
      imageUrl:
        "https://www.simpleteam.co/_static/testimonials/mike.jpg",
      link: "https://www.producthunt.com/products/papermark-2#papermark-3",
    },
    producthunt: true,
  },
  {
    body: "True builders listen and deliver. Simpleteam has solved a major pain point in skills management. It's exactly what we've been waiting for!",
    author: {
      name: "Jas Jaski",
      handle: "jaski",
      imageUrl: "https://www.simpleteam.co/_static/testimonials/lori.webp",
      link: "https://twitter.com/Jas_Jaski/status/1731957497487868390",
    },
    producthunt: false,
  },
  // More testimonials...
];

export default function Testimonials() {
  return (
    <div className="bg-white py-24">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
        <h2 className="text-balance text-4xl">
          Loved by our customers and their employees
          <br />
          <span className="text-gray-500">
            Here&apos;s what some of them have to say about us.
          </span>
        </h2>
        <div className="mx-auto mt-8 max-w-2xl lg:max-w-none">
          <div className="space-y-6 py-8 sm:block sm:columns-2 sm:gap-6 lg:columns-3">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.author.handle}
                className="relative flex w-full"
              >
                <div className="relative rounded-lg border border-gray-500 bg-white p-6 text-base leading-6 shadow-lg">
                  <div className="flex flex-col justify-between">
                    <div className="flex items-center justify-between gap-x-4">
                      <div className="flex items-center gap-x-4">
                        <Image
                          className="h-10 w-10 rounded-full bg-gray-50"
                          src={testimonial.author.imageUrl}
                          width={40}
                          height={40}
                          alt={testimonial.author.name}
                        />
                        <div>
                          <div className="font-semibold text-gray-900">
                            {testimonial.author.name}
                          </div>
                          <a
                            className="text-gray-600 hover:text-gray-800"
                            href={testimonial.author.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >{`@${testimonial.author.handle}`}</a>
                        </div>
                      </div>
                      <a
                        href={testimonial.author.link} // Using the link from the testimonial
                        target="_blank"
                        rel="noopener noreferrer"
                        className=""
                      >
                        {testimonial.producthunt ? (
                          <ProductHuntIcon className="h-6 w-6 text-gray-800" />
                        ) : (
                          <TwitterIcon className="h-5 w-5 text-gray-800" />
                        )}
                      </a>
                    </div>

                    <blockquote className="my-4 text-gray-900">
                      <p>{testimonial.body}</p>
                    </blockquote>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
