import React from "react";

import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { BRAND_SETTINGS } from "@/lib/constants";

export default function InvalidDomain({
  domain = "simpleteam.co",
  invalidDays = 14,
}: {
  domain: string;
  invalidDays: number;
}) {
  return (
    <Html>
      <Head />
      <Preview>Invalid Domain Configuration</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-10 w-[465px] p-5">
            <Text className="mx-0 mb-8 mt-4 p-0 text-center text-2xl font-normal">
              <span className="font-bold tracking-tighter">Simpleteam</span>
            </Text>
            <Text className="mx-0 my-7 p-0 text-center text-xl font-semibold text-black">
              {invalidDays >= 14
                ? `Invalid Domain Configuration`
                : `Finish configuring your domain`}
            </Text>
            <Text className="text-sm leading-6 text-black">
              Your domain <code className="text-purple-600">{domain}</code> for
              your Simpleteam account{" "}
              {invalidDays >= 14
                ? `has been invalid for ${invalidDays} days.`
                : `is still unconfigured.`}
            </Text>
            <Text className="text-sm leading-6 text-black">
              If your domain remains unconfigured for 30 days, it will be
              automatically deleted from Simpleteam. Please click the link below
              to configure your domain.
            </Text>
            <Section className="my-8 text-center">
              <Button
                className="rounded bg-black text-center text-xs font-semibold text-white no-underline"
                href={`https://www.simpleteam.co/settings/domains`}
                style={{ padding: "12px 20px" }}
              >
                Configure domain
              </Button>
            </Section>
            <Text className="text-sm leading-6 text-black">
              If you do not want to keep this domain on {BRAND_SETTINGS.productName}, you can{" "}
              <Link
                href={`https://www.simpleteam.co/settings/domains`}
                className="font-medium text-blue-600 no-underline"
              >
                delete it
              </Link>{" "}
              or simply ignore this email.{" "}
              {invalidDays >= 14
                ? `To respect your inbox,${" "} 
                  ${invalidDays < 28
                  ? `we will only send you one more email about this in ${28 - invalidDays
                  } days.`
                  : `this will be the last time we will email you about this.`
                }`
                : ""}
            </Text>
            <Hr />
            <Section className="mt-8 text-gray-400">
              <Text className="text-xs">
                © {new Date().getFullYear()}{" "}
                <a
                  href="https://www.simpleteam.co"
                  className="text-gray-400 no-underline visited:text-gray-400 hover:text-gray-400"
                  target="_blank"
                >
                  simpleteam.co
                </a>
              </Text>
              <Text className="text-xs">
                If you have any feedback or questions about this email, simply
                reply to it. I&apos;d love to hear from you!
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
