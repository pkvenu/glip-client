class Posts {
  constructor (rc) {
    this.rc = rc
  }

  post (options) {
    return this.rc.platform().post('/glip/posts', options).then((response) => response.json())
  }

  get (options) {
    if (options && options.postId) {
      return this.rc.platform().get(`/glip/posts/${options.postId}`).then((response) => response.json())
    } else {
      return this.rc.platform().get('/glip/posts', options).then((response) => response.json())
    }
  }

  subscribe (callback) {
    this.subscription = this.rc.createSubscription()
    this.subscription.on(this.subscription.events.notification, (notification) => {
      callback(notification.body)
    })
    this.subscription.setEventFilters(['/restapi/v1.0/account/~/extension/~/glip/posts']).register()
  }

  webhook(options) {
    return this.rc.platform().post('/subscription', {
      eventFilters: [
        "/restapi/v1.0/account/~/extension/~/glip/posts"
      ],
      deliveryMode: {
        transportType: options.delivery_mode_transport_type,
        address: options.delivery_mode_address
      }
    }).then(function (response) {
      console.log('Subscription Response: ', response.json());
    }).catch(function (e) {
      console.error(e);
      throw e;
    });
  }


}

module.exports = Posts
