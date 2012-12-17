TimeTravel.Models.Order = Backbone.Model.extend({
  //##initialCode
  initialize: function() {
    if(!this.get("extras")) {
      this.set("extras", new TimeTravel.Collections.Extras([]))
    }
    this.get("extras").on('add', this.calculatePrice, this);
    this.get("extras").on('remove', this.calculatePrice, this);
    this.on("change:hotel", this.calculatePrice, this);
    this.on("change:lengthOfStay", this.calculatePrice, this);
  },
  //##initialCode

  addExtra: function(extra) {
    this.get("extras").add(extra);
  },

  removeExtra: function(extra) {
    this.get("extras").remove(extra);
  },

  hasExtra: function(extra) {
    return this.get("extras").contains(extra);
  },

  toggleExtra: function(extra) {
    if(this.hasExtra(extra)) {
      this.removeExtra(extra);
    } else {
      this.addExtra(extra);
    }
  },
  //##initialCode

  //##hotel
  setHotel: function(hotel) {
    this.set("hotel", hotel)
  },

  setLengthOfStay: function(days) {
    this.set("lengthOfStay", days)
  },

  calculatePrice: function() {
    var prices = this.get("extras").pluck("price");
    var price = _.reduce(prices,
        function(agg, item) { return agg + item },
        0);
    if (this.get("hotel")) {
      price += this.get("hotel").get("price") * this.get("lengthOfStay")
    }
    this.set({price: price})
    return price
  }
  //##hotel
});
