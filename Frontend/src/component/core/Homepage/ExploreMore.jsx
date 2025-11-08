import React, { useState } from "react";
import HighlightText from "./HighlightText";
import Card from "./Card";

const allCourses = [
  {
    tag: "Career paths",
    courses: [
      {
        heading: "Next.js",
        description:
          "Learn how to build fast, SEO-friendly React applications using Next.js, covering routing, server-side rendering, API routes, and deployment for real-world career opportunities.",
        level: "Beginner",
        lessonNumber: 6,
      },
      {
        heading: "React.js",
        description:
          "Master the fundamentals of building dynamic user interfaces with React.js, including components, props, state, hooks, and real-world projects to start your career in web development.",
        level: "Beginner",
        lessonNumber: 6,
      },
      {
        heading: "Sanity",
        description:
          "Understand how to use Sanity as a headless CMS, manage structured content, and integrate it into modern web projects for scalable and customizable applications.",
        level: "Beginner",
        lessonNumber: 6,
      },
    ],
  },
  {
    tag: "New to Coding",
    courses: [
      {
        heading: "HTML",
        description:
          "Start your coding journey by learning HTML basics, from structuring webpages to adding images, links, and lists, forming the foundation for all web development work.",
        level: "Beginner",
        lessonNumber: 6,
      },
      {
        heading: "CSS",
        description:
          "Learn how to style and design beautiful web pages with CSS, covering colors, layouts, typography, and responsive design essentials for beginners entering coding.",
        level: "Beginner",
        lessonNumber: 6,
      },
      {
        heading: "Responsive ",
        description:
          "Discover how to create websites that adapt perfectly to mobile, tablet, and desktop devices, using responsive design principles and CSS techniques for beginners in coding.",
        level: "Beginner",
        lessonNumber: 6,
      },
    ],
  },
  {
    tag: "Free",
    courses: [
      {
        heading: "Learn HTML",
        description:
          "Explore HTML for free and gain skills to structure content, add multimedia, and create accessible web pages as your first step into web development.",
        level: "Beginner",
        lessonNumber: 6,
      },
      {
        heading: "Learn CSS",
        description:
          "A free beginner-friendly course on CSS, teaching you how to style HTML elements, create layouts, and improve website appearance with no cost involved.",
        level: "Beginner",
        lessonNumber: 6,
      },
      {
        heading: "Responsive Web design",
        description:
          "Learn responsive web design for free, enabling websites to look great on all devices using CSS techniques, flexible layouts, and media queries.",
        level: "Beginner",
        lessonNumber: 6,
      },
    ],
  },
  {
    tag: "Skills Paths",
    courses: [
      {
        heading: "Flask",
        description:
          "Learn Flask to build lightweight, scalable web applications in Python, covering routing, templates, databases, and deployment as part of your skill growth journey.",
        level: "Beginner",
        lessonNumber: 6,
      },
      {
        heading: "Django",
        description:
          "Master Django's powerful framework features for building secure, scalable web applications in Python, including ORM, admin panel, authentication, and advanced backend skills.",
        level: "Beginner",
        lessonNumber: 6,
      },
      {
        heading: "Fast API",
        description:
          "Get hands-on with FastAPI, a modern Python framework for high-performance APIs, learning request handling, validation, and async capabilities for fast backend development.",
        level: "Beginner",
        lessonNumber: 6,
      },
    ],
  },
  {
    tag: "Most Popular",
    courses: [
      {
        heading: "Java",
        description:
          "Learn Java programming from the ground up, covering syntax, OOP concepts, data structures, and application building, making it one of the most popular career skills.",
        level: "Beginner",
        lessonNumber: 6,
      },
      {
        heading: "Python",
        description:
          "Explore Python programming, from variables and loops to file handling and libraries, making it one of the most versatile and popular languages in tech today.",
        level: "Beginner",
        lessonNumber: 6,
      },
      {
        heading: "SCSS",
        description:
          "Learn SCSS to write cleaner, more maintainable CSS with variables, nesting, and mixins, enhancing styling efficiency in modern web development projects.",
        level: "Beginner",
        lessonNumber: 6,
      },
    ],
  },
];


const tabName = [
  "Career paths",
  "New to Coding",
  "Free",
  "Skills Paths",
  "Most Popular",
];
function ExploreMore() {
  const [currentTab, setCurrentTab] = useState(tabName[0]);
  const [courses, setCourses] = useState(allCourses[0].courses);
  const [currCard, setCurrCard] = useState(allCourses[0].courses[0].heading);
  // console.log(courses);
  const setMyCard = (value) => {
    setCurrentTab(value);
    const result = allCourses.filter((courses) => courses.tag === value);
    console.log("Result is ",result);
    setCourses(result[0].courses);
    setCurrCard(result[0].courses[0].heading);
  };
  return (
    <div>
      <div className="md:text-4xl text-2xl font-semibold text-center ">
        Unlock the <HighlightText text={"power of code"}></HighlightText>
      </div>
      <p className="text-center font-semibold text-sm mt-3">
        Learn to build anything that you think
      </p>
      <div className="flex flex-wrap md:flex-row  gap-x-4 gap-y-2 md:gap-6 bg-slate-800 border-slate-300 rounded-lg p-2 m-8 items-center justify-center  ">
        {tabName.map((element, index) => {
          return (
            <div
              className={`md:text-[16px] text-[13px]
              ${
                currentTab === element
                  ? "bg-black text-white px-2"
                  : "bg-slate-600 text-black px-2"
              } rounded-full `}
              key={index}
              onClick={() => {
                setMyCard(element);
              }}
            >
              {element}
            </div>
          );
        })}
      </div>
      <div className="flex md:flex-row flex-col md:gap-3 gap-y-5 justify-center items-center mb-[-80px]">
        {courses.map((obj, index) => {
          const active = currCard === obj.heading;
          return (
            <Card
              heading={obj.heading}
              description={obj.description}
              lessonNumber={obj.lessonNumber}
              level={obj.level}
              key={index}
              active={active}
            ></Card>
          );
        })}
      </div>
    </div>
  );
}

export default ExploreMore;
