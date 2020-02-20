import { toXML } from "jstoxml";

const xmlOptions = {
  header: true,
  indent: "  "
};

const feed = toXML(
  {
    _name: "rss",
    _attrs: {
      "xmlns:itunes": "http://www.itunes.com/dtds/podcast-1.0.dtd",
      version: "2.0"
    },
    _content: {
      channel: [
        {
          title: "Title"
        },
        {
          link: "google.com"
        },
        {
          language: "en-us"
        },
        {
          copyright: "Copyright 2011"
        },
        {
          "itunes:subtitle": "Subtitle"
        },
        {
          "itunes:author": "Author"
        },
        {
          "itunes:summary": "Summary"
        },
        {
          description: "Description"
        },
        {
          "itunes:owner": {
            "itunes:name": "Name",
            "itunes:email": "Email"
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
            text: "TV &amp; Film"
          }
        },
        {
          item: [
            {
              title: "Podcast Title"
            },
            {
              "itunes:author": "Author"
            },
            {
              "itunes:subtitle": "Subtitle"
            },
            {
              "itunes:summary": "Summary"
            },
            {
              "itunes:image": "image.jpg"
            },
            {
              _name: "enclosure",
              _attrs: {
                url: "http://example.com/podcast.m4a",
                length: "8727310",
                type: "audio/x-m4a"
              }
            },
            {
              guid: "http://example.com/archive/aae20050615.m4a"
            },
            {
              pubDate: "Wed, 15 Jun 2011 19:00:00 GMT"
            },
            {
              "itunes:duration": "7:04"
            },
            {
              "itunes:keywords": "salt, pepper, shaker, exciting"
            }
          ]
        },
        {
          item: [
            {
              title: "Podcast2 Title"
            },
            {
              "itunes:author": "Author2"
            },
            {
              "itunes:subtitle": "Subtitle2"
            },
            {
              "itunes:summary": "Summary2"
            },
            {
              "itunes:image": "image2.jpg"
            },
            {
              _name: "enclosure",
              _attrs: {
                url: "http://example.com/podcast2.m4a",
                length: "655555",
                type: "audio/x-m4a"
              }
            },
            {
              guid: "http://example.com/archive/aae2.m4a"
            },
            {
              pubDate: "Wed, 15 Jul 2011 19:00:00 GMT"
            },
            {
              "itunes:duration": "11:20"
            },
            {
              "itunes:keywords": "foo, bar"
            }
          ]
        }
      ]
    }
  },
  xmlOptions
);

module.exports = async (req, res) => {
  try {
    res.setHeader("Content-Type", "text/xml");
    res.status(200).write(feed.toString());
    res.end();
  } catch ({ status = 500, message }) {
    res.status(status).json({ status, message });
  }
};
