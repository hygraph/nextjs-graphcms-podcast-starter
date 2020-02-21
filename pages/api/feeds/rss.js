import { toXML } from "jstoxml";
import { format } from "date-fns";
const { graphQLClient } = require("../../../clients/_read_client");

const hms = seconds =>
  seconds ? new Date(seconds * 1000).toISOString().substr(11, 8) : "00:00:00";

module.exports = async (req, res) => {
  const query = `
  {
    episodes {
      id
      title
      description
      showNotes
      audioDuration
      guests {
        fullName
      }
      hosts {
        fullName
      }
      image {
        url
      }
      audioFile {
        url
        mimeType
      }
      updatedAt
      createdAt
      tags {
        name
      }
    }
  }
        `;

  const { episodes } = await graphQLClient.request(query);

  const xmlOptions = {
    header: true,
    indent: "  "
  };

  const feed = {
    _name: "rss",
    _attrs: {
      "xmlns:itunes": "http://www.itunes.com/dtds/podcast-1.0.dtd",
      version: "2.0"
    },
    _content: {
      channel: [
        {
          title: "NextJS GraphCMS Podcast Starter"
        },
        {
          link: "https://nextjs-graphcms-podcast-starter.now.sh/"
        },
        {
          language: "en-us"
        },
        {
          copyright: `Copyright ${new Date().getFullYear()}`
        },
        {
          "itunes:subtitle": "The podcast or people who make content."
        },
        {
          "itunes:author": "GraphCMS"
        },
        {
          "itunes:summary":
            "For the developer crowd that creates content technology and works with content technology."
        },
        {
          description:
            "For the developer crowd that creates content technology and works with content technology."
        },
        {
          "itunes:owner": {
            "itunes:name": "GraphCMS",
            "itunes:email": "marketing@graphcms.com"
          }
        },
        {
          _name: "itunes:image",
          _attrs: {
            href: "image.jpg"
          }
        },
        {
          _name: "itunes:category",
          _attrs: {
            text: "Technology"
          },
          _content: {
            _name: "itunes:category",
            _attrs: {
              text: "Gadgets"
            }
          }
        },
        {
          _name: "itunes:category",
          _attrs: {
            text: "Tech News"
          }
        }
      ]
    }
  };

  const payload = episodes.map(episode => {
    const obj = {};
    const item = [];

    item.push({ title: episode.title });
    item.push({ author: "GraphCMS" });
    item.push({ subtitle: "By GaphCMS" });
    item.push({ summary: episode.description });
    item.push({ "itunes:image": episode.image.url });
    item.push({
      _name: "enclosure",
      _attrs: {
        url: episode.audioFile.url,
        length: episode.audioDuration,
        type: episode.audioFile.mimeType
      }
    });
    item.push({ guid: episode.id + episode.updatedAt });
    item.push({
      pubDate: format(
        new Date(episode.createdAt),
        "iiiiiii, dd MMM yyyy hh:mm:ss OOO"
      )
    });
    item.push({ "itunes:duration": hms(episode.audioDuration) });
    item.push({
      "itunes:keywords": episode.tags.map(tag => tag.name).join(", ")
    });

    obj.item = item;
    return obj;
  });

  feed._content.channel = [...feed._content.channel, ...payload];

  const xmlFeed = toXML(feed, xmlOptions);

  try {
    res.setHeader("Content-Type", "text/xml");
    res.status(200).write(xmlFeed.toString());
    res.end();
  } catch ({ status = 500, message }) {
    res.status(status).json({ status, message });
  }
};
