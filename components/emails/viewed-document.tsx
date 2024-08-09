import React from "react";

import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { BRAND_SETTINGS } from "@/lib/constants";

export default function ViewedDocument({
  documentId = "123",
  documentName = "Pitchdeck",
  viewerEmail,
}: {
  documentId: string;
  documentName: string;
  viewerEmail: string | null;
}) {
  return (
    <Html>
      <Head />
      <Preview>See who visited your document</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-10 w-[465px] p-5">
            <Text className="mx-0 mb-8 mt-4 p-0 text-center text-2xl font-normal">
              <span className="font-bold tracking-tighter">Simpleteam</span>
            </Text>
            <Text className="mx-0 my-7 p-0 text-center text-xl font-semibold text-black">
              New Document Visitor
            </Text>
            <Text className="text-sm leading-6 text-black">
              Your document{" "}
              <span className="font-semibold">{documentName}</span> was just
              viewed by{" "}
              <span className="font-semibold">
                {viewerEmail ? `${viewerEmail}` : `someone`}
              </span>
              .
            </Text>
            <Text className="text-sm leading-6 text-black">
              You can get the detailed engagement insights like time-spent per
              page and total duration for this document on {BRAND_SETTINGS.productName}.
            </Text>
            <Section className="my-8 text-center">
              <Button
                className="rounded bg-black text-center text-xs font-semibold text-white no-underline"
                href={`${BRAND_SETTINGS.url}/documents/${documentId}`}
                style={{ padding: "12px 20px" }}
              >
                See my document insights
              </Button>
            </Section>
            <Text className="text-sm leading-6 text-black">
              Stay informed, stay ahead with Papermark.
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
              <Text className="text-xs">
                To stop email notifications for this link, edit the link and
                uncheck &quot;Receive email notification&quot;.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
