import Image from "next/image";

import aleximage from "@/public/testimonials/alex.jpeg";
import loriimage from "@/public/testimonials/lori.webp";
import chloeimage from "@/public/testimonials/chloe.jpg";
import mikeimage from "@/public/testimonials/mike.jpg";
import vatanyutaimage from "@/public/testimonials/vatanyuta.png";

export default function Testimonials() {
  return (
    <div className="bg-white py-24">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
        <h2 className="text-balance text-4xl">
          Trusted by our users.
          <br />
          <span className="text-gray-500">
            Here&apos;s what some of our customers have to say about us.
          </span>
        </h2>
        <div className="flex w-full justify-center bg-white">
          <div className="flex w-full max-w-7xl py-12">
            <div className="flex w-full justify-center rounded-3xl bg-white">
              <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-3">
                {/* Column 1 */}
                <div className="flex flex-col items-center">
                  {/* Image container */}
                  <div className="flex flex-col items-center overflow-hidden rounded-3xl bg-white border shadow-sm">
                    {/* Image container */}
                    <Image
                      className="h-80 w-full object-cover"
                      src={chloeimage}
                      alt="Testimonial 1"
                    />
                    {/* Text content */}
                    <div className="p-8 border-t">
                      <blockquote className="text-lg text-gray-700">
                        <p>
                          Simpleteam truly understands the needs of consulting firms.
                          Their platform has transformed how we manage and track our
                          team&apos;s skills, making it easier to match the right
                          consultants with the right projects. The days of inefficient resource management are over!
                        </p>
                      </blockquote>
                      <figcaption className="mt-4">
                        <div className="font-semibold">Jaski</div>
                        <div className="text-sm text-gray-500">
                          Founder, (Private Consulting Firm)
                        </div>
                      </figcaption>
                    </div>
                  </div>
                </div>
                {/* Column 2 (duplicate of Column 1) */}
                <div className="flex flex-col items-center">
                  {/* Image container */}
                  {/* Image container */}
                  <div className="flex flex-col items-center overflow-hidden rounded-3xl bg-white border shadow-sm">
                    {/* Image container */}
                    <Image
                      className="h-80 w-full object-cover"
                      src={loriimage}
                      alt="Testimonial 1"
                    />
                    {/* Text content */}
                    <div className="p-8 border-t">
                      <blockquote className="text-lg text-gray-700">
                        <p>
                          Simpleteam has become our go-to tool for organizing and tracking
                          our consultants&apos; skills. The platform&apos;s ability to manage
                          skills data and analytics has significantly improved our project outcomes.
                          It&apos;s a game-changer for consulting firms like ours!
                        </p>
                      </blockquote>
                      <figcaption className="mt-4">
                        <div className="font-semibold">Vatanyuta</div>
                        <div className="text-sm text-gray-500">
                          Manager, (Private Consulting Firm)
                        </div>
                      </figcaption>
                    </div>
                  </div>
                </div>
                {/* Column 3 (duplicate of Column 1) */}
                <div className="flex flex-col items-center">
                  <div className="flex flex-col items-center overflow-hidden rounded-3xl bg-white border shadow-sm">
                    <Image
                      className="h-80 w-full object-cover"
                      src={mikeimage}
                      alt="Testimonial 1"
                    />

                    <div className="p-8 border-t">
                      <blockquote className="text-lg text-gray-700">
                        <p>
                          Switching to Simpleteam was seamless, and it&apos;s now an indispensable
                          part of our operations. We can efficiently manage our team&apos;s skills
                          and ensure that our consultants are always ready to meet client needs.
                          The custom branding and domains are just icing on the cake!
                        </p>
                      </blockquote>
                      <figcaption className="mt-4">
                        <div className="font-semibold">Alex</div>
                        <div className="text-sm text-gray-500">
                          Partner at (Private Consulting Firm)
                        </div>
                      </figcaption>
                    </div>
                  </div>
                </div>
                {/* <div className="flex flex-col items-center">
                  <div className="flex flex-col items-center overflow-hidden rounded-3xl bg-white shadow-xl">
                    <Image
                      className="h-80 w-full object-cover"
                      src={dominikimage}
                      alt="Testimonial 1"
                    />

                    <div className="p-8">
                      <blockquote className="text-lg text-gray-700">
                        <p>
                          I am using Simpleteam daily sharing documents to LPs
                          and viewing the pitch decks from founders.
                        </p>
                      </blockquote>
                      <figcaption className="mt-4 ">
                        <div className="font-semibold">Dominik</div>
                        <div className="text-sm text-gray-500">
                          Partner at VC Fund
                        </div>
                      </figcaption>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
