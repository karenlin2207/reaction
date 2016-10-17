import moment from "moment";
import { Template } from "meteor/templating";
import { Orders, Shops } from "/lib/collections";

/**
 * dashboardOrdersList helpers
 *
 */
Template.dashboardOrdersList.helpers({
  orderStatus() {
    if (this.workflow.status === "coreOrderCompleted") {
      return true;
    }
  },
  orders(data) {
    if (data.hash.data) {
      return data.hash.data;
    }
    return Orders.find({}, {
      sort: {
        createdAt: -1
      },
      limit: 25
    });
  },
    allpaycheckout : function(payment){
    if (payment == "AllPay"){
      return true;
    }
    else{
      return false;
    }
  },
  allpaycheckoutform(){
      var allpaycheckout;
      var strUrl = location.search;
      var getPara, ParaVal;
      var aryPara = [];
      if (strUrl.indexOf("?") != -1) {
        var getSearch = strUrl.split("?");
        getPara = getSearch[1].split("&");
        for (i = 0; i < getPara.length; i++) {
          ParaVal = getPara[i].split("=");
          aryPara.push(ParaVal[1]);
          aryPara[ParaVal[1]] = ParaVal[2];
        }
      }
      var order = Orders.findOne({ cartId: aryPara[0] });
      var items = order.items;
      var Items = new Array();
      items.forEach(function(data){
        var item = { name : data.title, price: parseInt(data.variants.price) ,currency : "NTD", quantity: data.quantity};
        Items.push(item);
      })
      var date = new Date();
      let cartInfo={
        MerchantTradeNo : aryPara[0],
        MerchantTradeDate: moment(date).format("YYYY/MM/DD HH:mm:ss"),
        TotalAmount: parseInt(order.billing[0].paymentMethod.amount),
        TradeDesc: "test",
        Items:  Items,
        ReturnURL: "https://ec2-52-43-22-203.us-west-2.compute.amazonaws.com/receive",
        ChoosePayment: "ALL"
      };

      allpaycheckout = Meteor.call("checkoutMac", cartInfo,function(err, result){
        allpaycheckout = result.html;
        Session.set("allpaycheckout", result.html);
      });
    
      return Session.get('allpaycheckout');
  },  
  orderAge() {
    return moment(this.createdAt).fromNow();
  },
  shipmentTracking() {
    return this.shipping[0].shipmentMethod.tracking;
  },
  shopName() {
    const shop = Shops.findOne(this.shopId);
    return shop !== null ? shop.name : void 0;
  }
});

Template.dashboardOrdersList.events({
  'click #allpaybutton': function(event){
    var form = document.getElementById("_allpayForm");
    form.submit();
  }
});