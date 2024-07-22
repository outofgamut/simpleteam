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
    descriptionfaq: "FAQs: AssessTEAM",
    subtitlecta: "Try AssessTEAM Now",
    imageUrl: "https://www.assessteam.com/images/logo.png",
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
    descriptionfaq: "FAQs: PerformYard",
    subtitlecta: "Get Started with PerformYard",
    imageUrl: "https://www.performyard.com/images/logo.png",
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
    descriptionfaq: "FAQs: 15Five",
    subtitlecta: "Try 15Five for Free",
    imageUrl: "https://www.15five.com/images/logo.png",
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
    descriptionfaq: "FAQs: Lattice",
    subtitlecta: "Get Started with Lattice",
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
    slug: "workday",
    metadescription: "Workday is a leading cloud-based performance management solution that helps organizations manage talent and improve workforce productivity.",
    metatitle: "Workday - Talent and Performance Management",
    title: "Workday",
    description: "Workday offers a comprehensive cloud-based performance management solution designed to help organizations manage talent, improve productivity, and drive business success.",
    subtitlecompare: "Why Choose Workday?",
    descriptioncompare: "Workday stands out for its robust features, scalability, and integration capabilities, making it a preferred choice for large enterprises.",
    subtitlefeatures: "Key Features",
    descriptionfeatures: "Talent management, performance reviews, goal setting, and workforce planning.",
    descriptionfaq: "FAQs: Workday",
    subtitlecta: "Learn More About Workday",
    imageUrl: "https://www.workday.com/images/logo.png",
    name: "Workday",
    price: "Contact for pricing",
    feature1: "Talent management",
    feature2: "Performance reviews",
    feature3: "Goal setting",
    feature4: "Workforce planning",
    feature5: "Analytics and reporting",
    feature6: "Scalability",
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
