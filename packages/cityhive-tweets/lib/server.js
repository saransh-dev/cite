Meteor.methods({
  'getTweets'(count) {
    if(!count){
      count = 1;
    }
    const Twit = new TwitMaker({
      consumer_key: Telescope.settings.get('TwitterConsumerKey'),
      consumer_secret: Telescope.settings.get('TwitterConsumerSecretKey'),
      access_token: Telescope.settings.get('TwitterAccessToken'),
      access_token_secret: Telescope.settings.get('TwitterAccessTokenSecret')
    });

    const getTweets = Meteor.wrapAsync(Twit.get, Twit);

    return getTweets('statuses/user_timeline', {
      screen_name: Telescope.settings.get('TwitterUser'),
      count: count
    });

  },
    'getFeeds'(){
    try {
        const result = HTTP.call('GET', 'https://flipboard.com/@armaganamcalar/the-guild-daily-scfdbe70y?rss');
        var xml = xml2js.parseStringSync(result.content);
        return xml.rss.channel[0].item;
      } catch (e) {
        return false;
      }
    }
});
