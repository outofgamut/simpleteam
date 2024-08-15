import { useTeam } from "@/context/team-context";
import {
  type CredentialCreationOptionsJSON,
  create,
} from "@github/webauthn-json";
import { toast } from "sonner";
import { mutate } from "swr";

import AppLayout from "@/components/layouts/app";
import DeleteTeam from "@/components/settings/delete-team";
import { SettingsHeader } from "@/components/settings/settings-header";
import Passkey from "@/components/shared/icons/passkey";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { BRAND_SETTINGS, STAGGER_CHILD_VARIANTS } from "@/lib/constants";
import { CheckCircleIcon, GraduationCapIcon, SignalIcon, SignalMediumIcon, ThumbsUpIcon, Users2Icon } from "lucide-react";
import { motion } from "framer-motion";

export default function Skills() {
  const teamInfo = useTeam();

  async function registerPasskey() {
    const createOptionsResponse = await fetch("/api/passkeys/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ start: true, finish: false, credential: null }),
    });

    const { createOptions } = await createOptionsResponse.json();

    // Open "register passkey" dialog
    const credential = await create(
      createOptions as CredentialCreationOptionsJSON,
    );

    const response = await fetch("/api/passkeys/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ start: false, finish: true, credential }),
    });

    if (response.ok) {
      toast.success("Registered passkey successfully!");
      return;
    }
    // Now the user has registered their passkey and can use it to log in.
  }

  return (
    <AppLayout>
      <main className="relative mx-2 mb-10 mt-4 space-y-8 overflow-hidden px-1 sm:mx-3 md:mx-5 md:mt-5 lg:mx-7 lg:mt-8 xl:mx-10">
        <SettingsHeader />

        <div className="mb-4 flex items-center justify-between md:mb-8 lg:mb-12">
          <div className="space-y-1">
            <h3 className="text-2xl font-semibold tracking-tight text-foreground">
              Skills
            </h3>
            <p className="text-sm text-muted-foreground">Manage how your team records skills</p>
          </div>
        </div>
        <div className="space-y-6">
          <motion.div
            variants={STAGGER_CHILD_VARIANTS}
            className="grid w-full text-center grid-cols-1 divide-y divide-border rounded-md border border-border text-foreground md:grid-cols-3 md:divide-x"
          >
            <button
              onClick={() =>
                alert("This feature is not available yet. Please check back later.")
              }
              className="flex min-h-[200px] flex-col items-center justify-center space-y-5 overflow-hidden p-5 transition-colors hover:bg-gray-200 hover:dark:bg-gray-800 md:p-10"
            >
              <ThumbsUpIcon className="pointer-events-none h-auto w-12 sm:w-12" />
              <div className="space-y-2">
                <p className="font-bold">Yes/No</p>
                <p className="text-sm text-muted-foreground">You either have a skill or do not.</p>
              </div>
            </button>
            <button
              onClick={() =>
                alert("This feature is not available yet. Please check back later.")
              }
              className="flex min-h-[200px] flex-col items-center justify-center space-y-5 overflow-hidden p-5 transition-colors hover:bg-gray-200 hover:dark:bg-gray-800 md:p-10"
            >
              <SignalMediumIcon className="pointer-events-none h-auto w-12 sm:w-12" />
              <div className="space-y-2">
                <p className="font-bold">Lichert (1-3)</p>
                <p className="text-sm text-muted-foreground">Attributed skills are given a level from 1 to 3.</p>
              </div>
            </button>
            <button
              onClick={() =>
                alert("This feature is not available yet. Please check back later.")
              }
              className="flex min-h-[200px] flex-col items-center justify-center space-y-5 overflow-hidden p-5 transition-colors hover:bg-gray-200 hover:dark:bg-gray-800 md:p-10"
            >
              <SignalIcon className="pointer-events-none h-auto w-12 sm:w-12" />
              <div className="space-y-2">
                <p className="font-bold">Lichert (1-5)</p>
                <p className="text-sm text-muted-foreground">Attributed skills are given a level from 1 to 5.</p>
              </div>            </button>
          </motion.div>
          <p>TODO: Let people create their own skills?</p>
          <p>TODO: Enforce that skills only be added in the context of experience (vs randomly)</p>
          <p>TODO: Customize lichert skill labels?</p>
          <Form
            title="Skills Measurement"
            description={`The method in which people's skills are measured on ${BRAND_SETTINGS.productName}.`}
            inputAttrs={{
              name: "name",
              defaultValue: teamInfo?.currentTeam?.name,
              placeholder: "My Personal Team",
              maxLength: 32,
            }}
            helpText="Max 32 characters."
            handleSubmit={(updateData) =>
              fetch(`/api/teams/${teamInfo?.currentTeam?.id}/update-name`, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(updateData),
              }).then(async (res) => {
                if (res.status === 200) {
                  await Promise.all([
                    mutate(`/api/teams/${teamInfo?.currentTeam?.id}`),
                    mutate(`/api/teams`),
                  ]);
                  toast.success("Successfully updated team name!");
                } else {
                  const { error } = await res.json();
                  toast.error(error.message);
                }
              })
            }
          />

          <div className="rounded-lg border border-muted p-10">
            <div className="space-y-6">
              <div className="space-y-3">
                <h2 className="text-xl font-medium">Register a passkey</h2>
                <p className="mt-3 text-sm text-secondary-foreground">
                  Never use a password or oauth again. Register a passkey to
                  make logging in easy.
                </p>
              </div>
              <Button
                onClick={() => registerPasskey()}
                className="flex items-center justify-center space-x-2"
              >
                <Passkey className="h-4 w-4" />
                <span>Register a new passkey</span>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </AppLayout>
  );
}
