var jsonfile = require('jsonfile');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();
var moment = require('moment');
var request = require('request');
var urlParse = require('url-parse');
function doSavePod(filename, url) {
  request(url, function (error, response, body) {
    if (!error) {
      parser.parseString(body, function (err, result) {
        doWriteJson(result);
      });
    } else {
      throw new Exception('Unable to get URL');
    }
  });
  function doWriteJson(feed) {
    var channel = feed.rss.channel[0];
    var items = feed.rss.channel[0].item;
    var customFeed = {};
    customFeed.rssUrl = channel['atom:link'][0].$.href;
    customFeed.title = channel.title[0];
    customFeed.pubDate = moment(channel.pubDate[0]).unix();
    customFeed.lastBuild = moment(channel.lastBuildDate[0]).unix();
    customFeed.summary = channel['itunes:summary'][0];
    customFeed.description = channel.description[0];
    customFeed.image = channel['itunes:image'][0].$.href;
    customFeed.author = channel['itunes:author'][0];
    customFeed.episodes = [];
    feed.rss.channel[0].item.forEach(function (entry) {
      customFeed.episodes.push(recreateItem(entry));
    });
    jsonfile.writeFileSync(filename, customFeed);
  }
  function recreateItem(item) {
    //var n = new url(item.link[0]);
    //var url = new URL(item.link[0]);
    var url = urlParse(item.link[0], true);
    return {
      'title': item.title[0],
      'pubDate': moment(item.pubDate[0]).unix(),
      'guid': item.guid[0]._,
      'link': item.link[0],
      'slug': url.pathname,
      'image': item['itunes:image'][0].$.href,
      'subtitle': item['itunes:subtitle'][0],
      'duration': item['itunes:duration'][0],
      'description': item.description[0],
      'mp3': item.enclosure[0].$
    };
  }
}
doSavePod(process.argv[2], process.argv[3]);