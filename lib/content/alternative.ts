// import { cache } from "react";

type Alternative = {
  id: number;
  slug: string;
  metadescription: string | null;
  metatitle: string | null;
  title: string | null;
  description: string | null;
  subtitlecompare: string | null;
  descriptioncompare: string | null;
  subtitlefeatures: string | null;
  descriptionfeatures: string | null;
  descriptionfaq: string | null;
  subtitlecta: string | null;
  imageUrl: string | null;
  name: string | null;
  price: string | null;
  feature1: string | null;
  feature2: string | null;
  feature3: string | null;
  feature4: string | null;
  feature5: string | null;
  feature6: string | null;
};

// Generate using chat-GPT
const alternatives: Alternative[] = [
  {
    id: 1,
    slug: "assessteam",
    metadescription: "AssessTEAM is an easy-to-use employee performance management software that helps you manage employee performance with real-time feedback.",
    metatitle: "AssessTEAM - Employee Performance Management Software",
    title: "AssessTEAM",
    description: "AssessTEAM provides a simple and effective way to manage employee performance with real-time feedback and continuous performance tracking.",
    subtitlecompare: "Why Choose AssessTEAM?",
    descriptioncompare: "AssessTEAM stands out for its user-friendly interface, comprehensive feedback system, and integration capabilities with other HR tools.",
    subtitlefeatures: "Key Features",
    descriptionfeatures: "Real-time feedback, continuous performance tracking, goal setting, and integration with various HR systems.",
    descriptionfaq: "See why teams are choosing Simpleteam over AssessTEAM",
    subtitlecta: "Try a free alternative to AssessTEAM Now",
    imageUrl: "https://www.assessteam.com/wp-content/uploads/2017/07/logo_assessteam01.svg",
    name: "AssessTEAM",
    price: "Starting at $1 per user per month",
    feature1: "Real-time feedback",
    feature2: "Continuous performance tracking",
    feature3: "Goal setting",
    feature4: "Integration with HR tools",
    feature5: "User-friendly interface",
    feature6: "Comprehensive reporting",
  },
  {
    id: 2,
    slug: "performyard",
    metadescription: "PerformYard provides flexible and streamlined employee performance management solutions to improve productivity and engagement.",
    metatitle: "PerformYard - Performance Management Software",
    title: "PerformYard",
    description: "PerformYard offers customizable performance management tools that help organizations streamline their performance review process and drive employee engagement.",
    subtitlecompare: "Why Choose PerformYard?",
    descriptioncompare: "PerformYard excels in providing customizable performance management solutions tailored to meet the unique needs of any organization.",
    subtitlefeatures: "Key Features",
    descriptionfeatures: "Customizable performance reviews, goal management, continuous feedback, and employee engagement tools.",
    descriptionfaq: "Why Simpleteam is being chosen by many teams over PerformYard",
    subtitlecta: "Get Started with a free alternative to PerformYard",
    imageUrl: "https://cdn.prod.website-files.com/5ec8332c2b50b6c3e1066975/63cf052729a0ab550da897a5_PerformYard-logo_min.svg",
    name: "PerformYard",
    price: "Contact for pricing",
    feature1: "Customizable performance reviews",
    feature2: "Goal management",
    feature3: "Continuous feedback",
    feature4: "Employee engagement tools",
    feature5: "Flexible review cycles",
    feature6: "Detailed analytics",
  },
  {
    id: 3,
    slug: "15five",
    metadescription: "15Five is a performance management software that helps you unlock the potential of your workforce through continuous feedback and goal alignment.",
    metatitle: "15Five - Continuous Performance Management Software",
    title: "15Five",
    description: "15Five provides a continuous performance management solution designed to drive engagement and improve performance through feedback and goal alignment.",
    subtitlecompare: "Why Choose 15Five?",
    descriptioncompare: "15Five is known for its focus on continuous feedback and goal alignment, making it a top choice for organizations looking to foster a feedback-rich culture.",
    subtitlefeatures: "Key Features",
    descriptionfeatures: "Continuous feedback, goal alignment, employee recognition, and performance reviews.",
    descriptionfaq: "Free and feature-rich 15Five alternative",
    subtitlecta: "Try a feature-rich alternative to 15Five for free",
    imageUrl: "https://www.15five.com/wp-content/themes/flynt/dist/Components/Navigation/Assets/15-five-logo-1315876b30.svg",
    name: "15Five",
    price: "Starting at $7 per user per month",
    feature1: "Continuous feedback",
    feature2: "Goal alignment",
    feature3: "Employee recognition",
    feature4: "Performance reviews",
    feature5: "Engagement surveys",
    feature6: "Customizable reporting",
  },
  {
    id: 4,
    slug: "lattice",
    metadescription: "Lattice is a comprehensive performance management platform that helps companies manage goals, performance reviews, and employee engagement.",
    metatitle: "Lattice - Performance and Engagement Management",
    title: "Lattice",
    description: "Lattice provides an integrated performance management and employee engagement platform designed to help organizations achieve their goals and improve employee satisfaction.",
    subtitlecompare: "Why Choose Lattice?",
    descriptioncompare: "Lattice offers a holistic approach to performance management, combining goal setting, performance reviews, and engagement tools in one platform.",
    subtitlefeatures: "Key Features",
    descriptionfeatures: "Goal management, performance reviews, continuous feedback, and employee engagement surveys.",
    descriptionfaq: "Everything you need to know about Simpleteam - Lattice alternative",
    subtitlecta: "Get started with a free alternative to Lattice",
    imageUrl: "https://www.lattice.com/images/logo.png",
    name: "Lattice",
    price: "Contact for pricing",
    feature1: "Goal management",
    feature2: "Performance reviews",
    feature3: "Continuous feedback",
    feature4: "Engagement surveys",
    feature5: "OKR tracking",
    feature6: "Customizable templates",
  },
  {
    id: 5,
    slug: "leapsome",
    metadescription: "Leapsome is an all-in-one platform for performance management, employee engagement, and personalized learning.",
    metatitle: "Leapsome - Performance Management and Employee Engagement",
    title: "Leapsome",
    description: "Leapsome combines performance management, employee engagement, and learning in one easy-to-use platform to help organizations build high-performing and engaged teams.",
    subtitlecompare: "Why Choose Leapsome?",
    descriptioncompare: "Leapsome excels in providing a comprehensive solution for managing performance, engagement, and learning, making it a top choice for organizations aiming for continuous improvement.",
    subtitlefeatures: "Key Features",
    descriptionfeatures: "Performance reviews, goal management, continuous feedback, engagement surveys, and learning modules.",
    descriptionfaq: "Everything you need to know about Simpleteam - alternative to Leapsome",
    subtitlecta: "Try out who others are choosing over Leapsome",
    imageUrl: "https://www.leapsome.com/images/logo.png",
    name: "Leapsome",
    price: "Starting at $8 per user per month",
    feature1: "Performance reviews",
    feature2: "Goal management",
    feature3: "Continuous feedback",
    feature4: "Engagement surveys",
    feature5: "Learning modules",
    feature6: "Customizable reports",
  }
];


// `cache` is a React 18 feature that allows you to cache a function for the lifetime of a request.
// this means getPosts() will only be called once per page build, even though we may call it multiple times
// when rendering the page.
export const getAlternatives = async () => {
  // if (!process.env.CONTENT_BASE_URL) {
  //   return [];
  // }

  // const response = await fetch(
  //   `${process.env.CONTENT_BASE_URL}/api/alternatives`,
  //   {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${process.env.INVESTORS_API_KEY}`,
  //     },
  //   },
  // );
  // if (!response.ok) {
  //   throw new Error("Network response was not ok " + response.statusText);
  // }
  // const data = (await response.json()) as Alternative[];
  // return data;
  return alternatives;
};

export const getAlternative = async (slug: string) => {
  const alternatives = await getAlternatives();
  return alternatives.find((alternative) => alternative.slug === slug);
};
