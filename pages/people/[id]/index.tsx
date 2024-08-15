import ErrorPage from "next/error";

import { useState } from "react";

import { useTeam } from "@/context/team-context";

import AppLayout from "@/components/layouts/app";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/ui/loading-spinner";

import SkillHeader from "@/components/skills/skill-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeftIcon, BriefcaseIcon, CalendarIcon, CodeIcon, StarIcon, UsersIcon } from "lucide-react";
import Link from "next/link";
import { usePerson } from "@/lib/swr/use-person";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { nFormatter } from "@/lib/utils";
import PersonHeader from "@/components/people/person-header";

export default function PersonPage() {
    const { person, error } = usePerson();
    const teamInfo = useTeam();

    const [isLinkSheetOpen, setIsLinkSheetOpen] = useState<boolean>(false);

    const mockPerson = {
        id: "clzetg0ax000n12j3f09s3b0l",
        firstName: "John",
        lastName: "Doe",
        email: "",
        title: "Senior Associate",
        roles: ["Software Engineer", "Product Manager"],
        skills: ["React", "Node.js", "GraphQL"],
        accountHours: [
            {
                id: "clzetg0ax000n12j3f09s3b0l",
                account: {
                    id: "clzetg0ax000n12j3f09s3b0l",
                    name: "Toyota",
                    domain: "toyota.com",
                },
                hours: 1234,
            },
            {
                id: "clzetg0ax000n12j3f09s3b0m",
                account: {
                    id: "clzetg0ax000n12j3f09s3b0m",
                    name: "Associa",
                    domain: "associaonline.com",
                },
                hours: 789,
            },
        ],
    }

    if (error && error.status === 404) {
        return <ErrorPage statusCode={404} />;
    }

    return (
        <AppLayout>
            <main className="relative mx-2 mb-10 mt-4 space-y-8 overflow-hidden px-1 sm:mx-3 md:mx-5 md:mt-5 lg:mx-7 lg:mt-8 xl:mx-10">
                {person ? (
                    <div className="pb-12">
                        <div className="flex items-center gap-4 mb-4">
                            <Link href="/people" className="flex items-center gap-2 text-muted-foreground">
                                <ArrowLeftIcon className="h-5 w-5" />
                                <span>Return to People</span>
                            </Link>
                        </div>

                        <PersonHeader
                            skill={person}
                            teamId={teamInfo?.currentTeam?.id!}
                            actions={[
                                <Button
                                    key={"create-link"}
                                    className="flex h-8 whitespace-nowrap text-xs lg:h-9 lg:text-sm"
                                    onClick={() => setIsLinkSheetOpen(true)}
                                >
                                    Create Tag
                                </Button>,
                            ]}
                        />
                        <Tabs defaultValue="overview">
                            <TabsList className="">
                                <TabsTrigger value="overview">Overview</TabsTrigger>
                                <TabsTrigger value="experiences">Experiences</TabsTrigger>
                                <TabsTrigger value="documents">Documents</TabsTrigger>
                            </TabsList>

                            <TabsContent value="overview">
                                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 py-4 md:py-6 lg:py-8">
                                    <div className="col-span-1 lg:col-span-2 flex-col space-y-8">
                                        <section className="space-y-6">
                                            <h2 className="text-2xl font-bold">Experiences</h2>
                                            <div className="grid gap-4">
                                                <Card>
                                                    <CardHeader>
                                                        <CardTitle>
                                                            <Link href="#" className="font-semibold hover:underline" prefetch={false}>
                                                                Senior Software Engineer
                                                            </Link>
                                                        </CardTitle>
                                                    </CardHeader>
                                                    <CardContent className="grid gap-2 text-muted-foreground">
                                                        <div className="flex items-center gap-2">
                                                            <CalendarIcon className="h-4 w-4" />
                                                            <span>Jan 2022 - Present</span>
                                                        </div>
                                                        <p>
                                                            Responsible for designing and developing scalable and maintainable web applications using React,
                                                            Node.js, and PostgreSQL. Collaborated with cross-functional teams to deliver high-quality software
                                                            solutions.
                                                        </p>
                                                    </CardContent>
                                                </Card>
                                                <Card>
                                                    <CardHeader>
                                                        <CardTitle>
                                                            <Link href="#" className="font-semibold hover:underline" prefetch={false}>
                                                                Frontend Developer Intern
                                                            </Link>
                                                        </CardTitle>
                                                    </CardHeader>
                                                    <CardContent className="grid gap-2 text-muted-foreground">
                                                        <div className="flex items-center gap-2">
                                                            <CalendarIcon className="h-4 w-4" />
                                                            <span>Jun 2021 - Aug 2021</span>
                                                        </div>
                                                        <p>
                                                            Worked on building responsive and interactive user interfaces using HTML, CSS, and JavaScript. Gained
                                                            experience in version control, task automation, and collaborative development.
                                                        </p>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        </section>
                                        <section className="space-y-6">
                                            <h2 className="text-2xl font-bold">Accounts</h2>
                                            <div className="flex-col space-y-4">
                                                {mockPerson.accountHours.map((accountHour: any) => (
                                                    <div key={accountHour.id}>
                                                        <Card >
                                                            <CardContent className="flex items-center p-4 gap-4">
                                                                <img
                                                                    src={`https://logo.clearbit.com/${accountHour.account.domain}`}
                                                                    width={48}
                                                                    height={48}
                                                                    alt="Company Logo"
                                                                    className="rounded-md"
                                                                    style={{ aspectRatio: "48/48", objectFit: "cover" }}
                                                                />
                                                                <div className="flex-1">
                                                                    <div className="font-semibold">{accountHour.account.name}</div>
                                                                    <div className="text-muted-foreground">{nFormatter(accountHour.hours)} hours worked</div>
                                                                </div>
                                                            </CardContent>
                                                        </Card>
                                                    </div>
                                                ))}

                                            </div>
                                        </section>
                                    </div>
                                    <div className="col-span-1 lg:col-span-1 flex-col space-y-8">
                                        <section className="space-y-6">
                                            <h2 className="text-2xl font-bold">Skills</h2>
                                            <div className="grid gap-2">
                                                <div className="flex items-center justify-between">
                                                    <div>React</div>
                                                    <div className="flex items-center gap-1">
                                                        <StarIcon className="h-4 w-4 fill-primary" />
                                                        <StarIcon className="h-4 w-4 fill-primary" />
                                                        <StarIcon className="h-4 w-4 fill-primary" />
                                                        <StarIcon className="h-4 w-4 fill-muted stroke-muted-foreground" />
                                                        <StarIcon className="h-4 w-4 fill-muted stroke-muted-foreground" />
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div>Node.js</div>
                                                    <div className="flex items-center gap-1">
                                                        <StarIcon className="h-4 w-4 fill-primary" />
                                                        <StarIcon className="h-4 w-4 fill-primary" />
                                                        <StarIcon className="h-4 w-4 fill-primary" />
                                                        <StarIcon className="h-4 w-4 fill-primary" />
                                                        <StarIcon className="h-4 w-4 fill-muted stroke-muted-foreground" />
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div>PostgreSQL</div>
                                                    <div className="flex items-center gap-1">
                                                        <StarIcon className="h-4 w-4 fill-primary" />
                                                        <StarIcon className="h-4 w-4 fill-primary" />
                                                        <StarIcon className="h-4 w-4 fill-primary" />
                                                        <StarIcon className="h-4 w-4 fill-muted stroke-muted-foreground" />
                                                        <StarIcon className="h-4 w-4 fill-muted stroke-muted-foreground" />
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div>Git</div>
                                                    <div className="flex items-center gap-1">
                                                        <StarIcon className="h-4 w-4 fill-primary" />
                                                        <StarIcon className="h-4 w-4 fill-primary" />
                                                        <StarIcon className="h-4 w-4 fill-primary" />
                                                        <StarIcon className="h-4 w-4 fill-primary" />
                                                        <StarIcon className="h-4 w-4 fill-primary" />
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                        <section className="space-y-6">
                                            <h2 className="text-2xl font-bold">Roles</h2>
                                            <div className="grid gap-2">
                                                <div className="flex items-center gap-2">
                                                    <UsersIcon className="h-5 w-5 text-muted-foreground" />
                                                    <div>Software Engineer</div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <BriefcaseIcon className="h-5 w-5 text-muted-foreground" />
                                                    <div>Frontend Developer</div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <CodeIcon className="h-5 w-5 text-muted-foreground" />
                                                    <div>Full-Stack Developer</div>
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                                {/* <div className="grid grid-cols-1 gap-8">
                                    <div className="grid gap-4">
                                        <div>
                                            <h1 className="text-xl font-bold">Skill Description</h1>
                                            <p className="text-muted-foreground">
                                                {person.description}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold mb-4">People with this Skill</h2>
                                        <div className="grid gap-2">
                                            {mockSkill.people.map(
                                                ({ name, firstName, lastName, level }) => (
                                                    <div key={name} className="bg-background rounded-lg border overflow-hidden">
                                                        <div className="flex items-center gap-4 p-4">
                                                            <div className="flex-shrink-0">
                                                                <Avatar>
                                                                    <AvatarImage src={`https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random&bold=true`} />
                                                                    <AvatarFallback>{firstName[0] + lastName[0]}</AvatarFallback>
                                                                </Avatar>
                                                            </div>
                                                            <div className="flex-1">
                                                                <h3 className="text-lg font-medium">{name}</h3>
                                                            </div>
                                                            <p className="text-muted-foreground">{level}</p>
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold mb-4">Related Roles</h2>
                                        <div className="grid gap-2">
                                            {mockSkill.roles.map(({ name, description }) => (
                                                <div key={name} className="bg-background rounded-lg border overflow-hidden">
                                                    <div className="p-4">
                                                        <h3 className="text-lg font-medium">{name}</h3>
                                                        <p className="text-muted-foreground">{description}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold mb-4">Skill Levels</h2>
                                        <div className="grid gap-2">
                                            {mockSkill.levels.map(({ name, description }) => (
                                                <div key={name} className="bg-background rounded-lg border overflow-hidden">
                                                    <div className="p-4">
                                                        <h3 className="text-lg font-medium">{name}</h3>
                                                        <p className="text-muted-foreground">{description}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold mb-4">Skill Tags</h2>
                                        <div className="grid gap-2">
                                            {mockSkill.tags.map(({ id, name }) => (
                                                <div key={name} className="bg-background rounded-lg border overflow-hidden">
                                                    <div className="p-4">
                                                        <h4 className="text-md font-medium">{name}</h4>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div> */}
                            </TabsContent>
                            <TabsContent value="documents">
                                <p>Saved resumes can go here. Or other project artifacts (e.g., design assets)</p>
                            </TabsContent>
                            <TabsContent value="experiences">
                                <p>Placeholder for personal documents</p>
                            </TabsContent>

                        </Tabs>
                        {/* <NavMenu
              navigation={[
                {
                  label: "Overview",
                  href: `/documents/${prismaDocument.id}`,
                  segment: `${prismaDocument.id}`,
                },
                {
                  label: "Settings",
                  href: `/documents/${prismaDocument.id}/settings`,
                  segment: "settings",
                },
              ]}
            /> */}

                        {/* Stats */}
                        {/* <StatsComponent
                            documentId={prismaDocument.id}
                            numPages={primaryVersion.numPages!}
                        /> */}

                        {/* Links */}
                        {/* <LinksTable
                            links={links}
                            targetType={"DOCUMENT"}
                            primaryVersion={primaryVersion}
                        /> */}

                        {/* Visitors */}
                        {/* <VisitorsTable numPages={primaryVersion.numPages!} /> */}

                        {/* <LinkSheet
                            isOpen={isLinkSheetOpen}
                            linkType="DOCUMENT_LINK"
                            setIsOpen={setIsLinkSheetOpen}
                            existingLinks={links}
                        /> */}
                    </div>
                ) : (
                    <div className="flex h-screen items-center justify-center">
                        <LoadingSpinner className="mr-1 h-20 w-20" />
                    </div>
                )}
            </main>
        </AppLayout >
    );
}
