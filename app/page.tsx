import Image from "next/image";
import Link from "next/link";

import {
  RefreshCw as ArrowPathIcon,
  BarChart3Icon,
  Settings as Cog6ToothIcon,
  PaletteIcon,
  ServerIcon,
  SlidersIcon,
} from "lucide-react";

import ProductHuntIcon from "@/components/shared/icons/producthunt";
import TwitterIcon from "@/components/shared/icons/twitter";
import { Button } from "@/components/ui/button";
import Footer from "@/components/web/footer";
import ImageSwitcher from "@/components/web/landing-page/imageswitcher";
import { LogoCloud } from "@/components/web/landing-page/logo-cloud";
import Navbar from "@/components/web/navbar";
import Testimonials from "@/components/web/testimonials/testimonials2";
import { cn } from "@/lib/utils";
import { it } from "node:test";
import { APP_SETTINGS } from "@/lib/constants";

const features = [
  {
    name: "Performance reviews",
    description:
      "Control who can view your documents and for how long. Revoke access at any time.",
    icon: SlidersIcon,
  },
  {
    name: "Employee resumes",
    description:
      "Receive page-by-page analytics on your visitors and get notified in real-time.",
    icon: ArrowPathIcon,
  },
  {
    name: "Team optimizer",
    description:
      "Connect your domain and bring your own brand to customize your viewers' experience.",
    icon: PaletteIcon,
  },
  {
    name: "Skills classifier",
    description:
      "Dive into detailed analytics and understand how your documents are being viewed.",
    icon: BarChart3Icon,
  },
  {
    name: "AI-powered",
    description: "Chat with your document using large language models.",
    icon: Cog6ToothIcon,
  },
  {
    name: "Self-host",
    description: "Simpleteam is open-source. Run it on your own infrastructure.",
    icon: ServerIcon,
  },
];

interface IndustryStatement {
  industry: string;
  statement: string;
}

const industryStatements: IndustryStatement[] = [
  {
    industry: "Consulting",
    statement: "Centralize and showcase your team's expertise and skills",
  },
  {
    industry: "Engineering",
    statement: "Track and manage certifications and technical proficiencies",
  },
  {
    industry: "Education",
    statement: "Organize and highlight faculty skills and teaching credentials",
  },
  {
    industry: "IT Services",
    statement: "Ensure your team’s skills are up-to-date and match project requirements",
  },
  {
    industry: "Healthcare",
    statement: "Manage and track staff qualifications and training records",
  },
  {
    industry: "Legal",
    statement: "Organize and display attorney specializations and experience",
  },
];

const firstRowIndustryStatements = // take first three from industryStatements
  industryStatements.slice(0, 3);

const secondRowIndustryStatements = // take last three from industryStatements
  industryStatements.slice(3, 6);


export default function Home() {
  return (
    <>
      <Navbar />
      <div className="flex flex-1 flex-col bg-white text-black">

        <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
          <div className="pt-24">
            <h1 className="text-balance font-semibold text-6xl md:text-8xl tracking-tight">
              Team management for the modern consulting firm.
            </h1>
            <p className="mt-8 max-w-3xl text-balance text-2xl">
              Simpleteam reimagines people management for firms who care about their people.
            </p>
            <div className="space-x-2 pt-8">
              <Link
                href={APP_SETTINGS.bookDemoLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  className="rounded-3xl border-black bg-transparent text-base"
                >
                  Book a demo
                </Button>
              </Link>
              <Link href="/login">
                <Button className="rounded-3xl text-base">Grow my team</Button>
              </Link>
            </div>
            {/* <div className="mx-auto mt-24 w-full">
              <video
                width="100%"
                id="video1"
                style={{ borderRadius: "6px" }}
                aria-hidden="true"
                playsInline
                autoPlay
                muted
                loop
                controls
              >
                <source
                  src="https://assets.simpleteam.co/short-video.mp4"
                  type="video/mp4"
                />
              </video>
            </div> */}
          </div>

          <div className="mx-auto mt-24 w-full">
            <ImageSwitcher />
          </div>

          <div className="mt-20 grid gap-16 md:gap-24 lg:gap-32">
            <div className="mx-auto mt-4 w-full px-0 lg:px-8 xl:p-0">
              <LogoCloud />
            </div>
          </div>
        </div>

        <div className="mt-24 w-full overflow-x-hidden bg-gray-50">
          <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
            <h2 className="text-balance pb-20 pt-20 text-4xl">
              Manage your team, with ease.{" "}
              <span className="text-gray-500">
                {/* Fine-tune access control. Receive real-time page analytics.
                Customize the experience with your brand and domain. Papermark
                is 100% open source. */}
              </span>
            </h2>
          </div>
          <div className="mx-4 mb-6 gap-6 text-balance sm:mx-0 sm:flex sm:translate-x-[-30px] sm:flex-nowrap lg:mb-10 lg:gap-10">
            {
              firstRowIndustryStatements.map((item, index) => (
                <div key={index} className="mb-6 flex-none rounded-xl bg-gray-200 p-6 sm:mb-0 sm:max-w-[300px] sm:p-6 md:max-w-[360px] lg:max-w-[500px] lg:p-8 xl:max-w-[560px] xl:p-10 2xl:max-w-[640px]">
                  <p className="font-380 text-base leading-none tracking-tight text-black/90 lg:text-base xl:text-base 2xl:-ml-0.5 2xl:text-lg">
                    {item.industry}
                  </p>
                  <p className="font-380 -ml-0.5 text-xl leading-tight tracking-tighter text-black/90 md:-ml-0.5 md:text-2xl md:leading-none lg:-ml-0.5 lg:text-4xl xl:-ml-0.5 xl:text-4xl">
                    {item.statement}
                  </p>
                </div>
              ))
            }
          </div>
          <div className="mx-4 mb-6 gap-6 text-balance sm:mx-0 sm:flex sm:translate-x-[50px] sm:flex-nowrap lg:mb-10 lg:gap-10">
            {
              secondRowIndustryStatements.map((item, index) => (
                <div key={index} className="mb-6 flex-none rounded-xl bg-black/80 p-6 sm:mb-0 sm:max-w-[300px] sm:p-6 md:max-w-[360px] lg:max-w-[500px] lg:p-8 xl:max-w-[560px] xl:p-10 2xl:max-w-[640px]">
                  <p className="font-380 text-base leading-none tracking-tight text-gray-50 lg:text-base xl:text-base 2xl:-ml-0.5 2xl:text-lg">
                    {item.industry}
                  </p>
                  <p className="font-380 -ml-0.5 text-xl leading-tight tracking-tighter text-gray-50 md:-ml-0.5 md:text-2xl md:leading-none lg:-ml-0.5 lg:text-4xl xl:-ml-0.5 xl:text-4xl">
                    {item.statement}
                  </p>
                </div>
              ))
            }
          </div>
        </div>

        <div
          className="mx-auto w-full max-w-7xl px-4 py-20 md:px-8"
          id="features"
        >
          <h2 className="max-w-3xl text-balance pb-20 pt-12 text-4xl">
            Built for modern teams.{" "}
            <span className="text-gray-500">
              Share your teams&apos; skills and experience with confidence and ease.
            </span>
          </h2>
          <div className="">
            <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 leading-7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
              {features.map((feature) => (
                <div
                  key={feature.name}
                  className="flex flex-col justify-start space-y-2"
                >
                  <feature.icon
                    className="h-10 w-10 text-gray-800"
                    aria-hidden="true"
                  />
                  <dt className="inline text-2xl text-gray-800">
                    {feature.name}
                  </dt>{" "}
                  <dd className="inline text-balance text-base">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div>
          <Testimonials />
        </div>

        <div className="bg-primary">
          <div className="mx-auto w-full max-w-7xl px-4 py-32 md:px-8">
            <h2 className="text-balance text-4xl">
              Sharing with Simpleteam is secure, fast, and free.
            </h2>
            <div className="space-x-2 pt-8">
              <Link
                href={APP_SETTINGS.bookDemoLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  className="rounded-3xl border-black bg-transparent text-base"
                >
                  Book a demo
                </Button>
              </Link>
              <Link href="/login">
                <Button className="rounded-3xl text-base">
                  Start for free
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
