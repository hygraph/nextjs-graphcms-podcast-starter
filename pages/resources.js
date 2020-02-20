import React from "react";
import Head from "next/head";
import Halftone from "../components/Halftone";
import { Markdown, MdHero, Label } from "../components/markdown-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
const PAGE = "Resources";

const About = ({ page, resources }) => {
  return page ? (
    <div>
      <div className="container relative z-10">
        <Head>
          <title>{PAGE}</title>
        </Head>

        <div className="flex flex-wrap items-start">
          <div className="flex flex-wrap content-center w-full md:w-1/2">
            <Label>It's time for</Label>
            <MdHero>{page.content}</MdHero>
          </div>
        </div>
      </div>
      <div className="absolute left-0 w-full -mt-20 overflow-hidden text-darkgray-800 bg-darkgray-700">
        <div className="flex" style={{ width: 1800, height: 375 }}>
          <Halftone width="600px" style={{ transform: "rotate(180deg)" }} />
          <Halftone width="600px" style={{ transform: "rotate(180deg)" }} />
          <Halftone width="600px" style={{ transform: "rotate(180deg)" }} />
        </div>
      </div>
      <div className="bg-darkgray-800">
        <div className="container relative z-10">
          <div className="flex flex-wrap -mx-4">
            {resources &&
              resources.map((resource, index) => {
                return (
                  <a
                    href={resource.url}
                    key={index}
                    className="w-full px-4 py-8 md:w-1/2 lg:w-1/3"
                  >
                    <div className="flex flex-col items-center h-full px-4 py-6 mb-4 text-xl leading-loose text-gray-100 border border-gray-100 rounded-sm hover:bg-darkgray-900">
                      <div className="w-full h-full">
                        <div className="border-b h-half border-darkgray-400">
                          <p className="pb-6 text-lg text-current">
                            <span className="font-bold underline">
                              {resource.label}
                            </span>
                            {resource.description
                              ? resource.description.replace(resource.label, "")
                              : ""}
                          </p>
                        </div>
                        <p className="pt-6 text-lg text-current">
                          As seen on{" "}
                          {resource.episodes.map((value, index, arr) => {
                            let last = index === arr.length - 1;
                            let parsedTitle = (
                              <Markdown
                                options={{
                                  overrides: {
                                    h1: props => <span {...props} />,
                                    p: props => <span {...props} />
                                  }
                                }}
                                children={value.title + (last ? "" : ", ")}
                              />
                            );

                            return parsedTitle;
                          })}
                        </p>
                      </div>
                      <div className="w-full mt-auto text-right">
                        <FontAwesomeIcon
                          width="14"
                          icon={faArrowRight}
                          className="ml-auto"
                        />
                      </div>
                    </div>
                  </a>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export async function unstable_getServerProps(context) {
  const { GraphQLClient } = require("graphql-request");
  const query = `
        query PageContent($label: String){
          page(where: {
              label: $label
          }) {
              content
              }
              resources {
                label
                url
                description
                episodes {
                    title
                    episodeNumber
                }
            }
          }
        `;

  const graphQLClient = new GraphQLClient(`${process.env.URL}/api/graphql`);
  const { page, resources } = await graphQLClient.request(query, {
    label: PAGE
  });

  return { props: { page, resources } };
}

export default About;
