
import Vue from "vue";
import VueRouter from "vue-router";
import WorkspaceShell from "../views/workspace/WorkspaceShell.vue";
import store from '@/store'
import NProgress from 'nprogress'

let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
//重写VueRouter.prototype身上的push方法了
VueRouter.prototype.push = function(location, resolve, reject) {
  if (resolve && reject) {
   
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};
//重写VueRouter.prototype身上replace的方法了
VueRouter.prototype.replace = function(location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};
Vue.use(VueRouter);
const routes = [
  {
    path: "/login",
    name: "login",
    meta:{
      title:'Login - CoDropshipping'
    },
    component: () => import("../views/login/Login.vue"),
  },
  {
    path: "/signUp",
    name: "signUp",
    meta:{
      title:'SignUp - CoDropshipping'
    },
    component: () => import("../views/login/SignUp.vue"),
  },
  {
    path: "/signUpGoogle",
    name: "signUpGoogle",
    meta:{
      title:'SignUp With Google - CoDropshipping'
    },
    component: () => import("../views/login/SignUpGoogle.vue"),
  },
  {
    path: "/verifyEmail",
    name: "verifyEmail",
    meta:{
      title:'Verify Email - CoDropshipping'
    },
    component: () => import("../views/login/VerifyEmail.vue"),
  },
  {
    path: "/forgotPassword",
    name: "forgotPassword",
    meta:{
      title:'Forgot Password - CoDropshipping'
    },
    component: () => import("../views/login/ForgotPassword.vue"),
  },
  {
    path: "/sendToEmail",
    name: "sendToEmail",
    meta:{
      title:'Send to Email - CoDropshipping'
    },
    component: () => import("../views/login/SendToEmail.vue"),
  },
  {
    path: "/resetPassword",
    name: "resetPassword",
    meta:{
      title:'Reset Password - CoDropshipping'
    },
    component: () => import("../views/login/ResetPassword.vue"),
  },
  {
    path: "/loginCode",
    name: "loginCode",
    meta:{
      title:'CoDropshipping'
    },
    component: () => import("../views/login/loginCode.vue"),
  },
  {
    path: "/gpt",
    name: "gpt",
    meta:{
      title:'CoDropshipping'
    },
    component: () => import("../views/gpt/index.vue"),
  },
  {
    path: "/ShopifyVerify",
    name: "ShopifyVerify",
    meta:{
      title:'Shopify Verify - CoDropshipping'
    },
    component: () => import("../views/account/ShopifyVerify.vue"),
  },
  {
    path: "/ShopifyVerifyResult",
    name: "ShopifyVerifyResult",
    meta:{
      title:'Shopify Verify Result - CoDropshipping'
    },
    component: () => import("../views/account/ShopifyVerifyResult.vue"),
  },
  {
    path: "/",
    component: WorkspaceShell,
    redirect: "/main/dashboard",
    meta:{
      title:'CoDropshipping',
    },
    children:[
      {
        path: "/workspace/studio",
        name: "workspaceStudio",
        meta:{ title:'AI Product Studio - CoDropshipping' },
        component: () => import("../views/workspace/Studio.vue"),
      },
      {
        path: "/workspace/cart",
        name: "cart",
        meta: { title: "Sourcing Cart - CoDropshipping" },
        component: () => import("../views/workspace/Cart.vue"),
      },
      {
        path: "/workspace/orders",
        name: "workspace-orders",
        meta: { title: "Orders - CoDropshipping" },
        component: () => import("../views/workspace/Orders.vue"),
      },
      ...['fulfillment', 'inventory', 'finance', 'insights'].map((moduleKey) => ({
        path: `/workspace/${moduleKey}`,
        name: `workspace-${moduleKey}`,
        meta: { title: `${moduleKey.charAt(0).toUpperCase() + moduleKey.slice(1)} - CoDropshipping` },
        component: () => import("../views/workspace/OperationsModule.vue"),
        props: { moduleKey },
      })),
      {
        path: "/main/issus",
        name: "issus",
        meta:{
          title:'feedback - CoDropshipping'
        },
        component: () => import("../views/issus/index.vue"),
      },
      {
        path: "/main/dashboard",
        name: "dashboard",
        meta:{
          title:'Dashboard - CoDropshipping'
        },
        component: () => import("../views/Dashboard.vue"),
      },
      // {
      //   path: "/main/message",
      //   name: "message",
      //   meta:{
      //     title:'Message - CoDropshipping'
      //   },
      //   component: () => import("../views/Message.vue"),
      // },
      // {
      //   path: "/main/quoteList",
      //   name: "quoteList",
      //   meta:{
      //     title:'Quote List - CoDropshipping'
      //   },
      //   component: () => import("../views/quote/QuoteList.vue"),
      // },
      {
        path: "/main/quoteDetail/:id",
        name: "quoteDetail",
        meta:{
          title:'Quote Detail - CoDropshipping'
        },
        component: () => import("../views/quote/QuoteDetail.vue"),
      },
      // {
      //   path: "/main/quoteRequest",
      //   name: "quoteRequest",
      //   meta:{
      //     title:'Quote Request - CoDropshipping'
      //   },
      //   component: () => import("../views/quote/QuoteRequest.vue"),
      // },
      {
        path: "/main/FCL",
        name: "FCL",
        meta:{
          title:'FCL Price - CoDropshipping'
        },
        component: () => import("../views/FCL/priceList.vue"),
      },
      // {
      //   path: "/main/FCLdetail",
      //   name: "FCLdetail",
      //   meta:{
      //     title:'FCL Detail - CoDropshipping'
      //   },
      //   component: () => import("../views/FCL/Detail.vue"),
      // },
      {
        path: "/main/FCLbooking",
        name: "FCLbooking",
        meta:{
          title:'FCL Booking - CoDropshipping'
        },
        component: () => import("../views/FCL/Booking.vue"),
      },
      // {
      //   path: "/main/booking",
      //   name: "shippingList",
      //   meta:{
      //     title:'Booking - CoDropshipping'
      //   },
      //   component: () => import("../views/shipping/ShippingList.vue"),
      // },
      {
        path: "/main/booking",
        name: "shippingList",
        meta:{
          title:'Shipping Calculator - CoDropshipping'
        },
        component: () => import("../views/shipping/Pricelist.vue"),
      },
      {
        path: "/order/shippingOrder",
        name: "shippingOrder",
        meta:{
          title:'Shipping Order - CoDropshipping'
        },
        component: () => import("../views/order/SourcingOrder.vue"),
      },
      {
        path: "/order/booking",
        name: "reqOrder",
        meta:{
          title:'Request Order - CoDropshipping'
        },
        component: () => import("../views/order/ReqOrder.vue"),
      },
      {
        path: "/order/forwardingOrder/:id",
        name: "forwardingOrder",
        meta:{
          title:'Forwarding Order - CoDropshipping'
        },
        component: () => import("../views/order/ForwardingOrder.vue"),
      },
      // {
      //   path: "/order/placeOrder",
      //   name: "placeOrder",
      //   meta:{
      //     title:'Place Order - CoDropshipping'
      //   },
      //   component: () => import("../views/order/PlaceOrder.vue"),
      // },
      {
        path: "/order/tracking",
        name: "tracking",
        meta:{
          title:'Tracking - CoDropshipping'
        },
        component: () => import("../views/order/Tracking.vue"),
      },
      {
        path: "/warehouse/InventoryStatistics",
        name: "inventoryStatistics",
        meta:{
          title:'Warehouse - CoDropshipping'
        },
        component: () => import("../views/warehouse/InventoryStatistics.vue"),
      },
      {
        path: "/warehouse/CargoManagement",
        name: "CargoManagement",
        meta:{
          title:'Cargo Management - CoDropshipping'
        },
        component: () => import("../views/warehouse/CargoManagement.vue"),
      },
      {
        path: "/warehouse/CargoManagements",
        name: "CargoManagements",
        meta:{
          title:'Cargo Management - CoDropshipping'
        },
        component: () => import("../views/warehouse/CargoManagements.vue"),
      },
      {
        path: "/warehouse/InboundManagement",
        name: "InboundManagement",
        meta:{
          title:'Inbound Management - CoDropshipping'
        },
        component: () => import("../views/warehouse/InboundManagement.vue"),
      },
      {
        path: "/warehouse/ApplySpaces",
        name: "ApplySpaces",
        meta:{
          title:'Apply For Storage Space - CoDropshipping'
        },
        component: () => import("../views/warehouse/ApplySpaces.vue"),
      },
      {
        path: "/warehouse/ApplySpace",
        name: "ApplySpace",
        meta:{
          title:'Apply For Storage Space - CoDropshipping'
        },
        component: () => import("../views/warehouse/ApplySpace.vue"),
      },
      {
        path: "/warehouse/OutboundManagement",
        name: "OutboundManagement",
        meta:{
          title:'Outbound Management - CoDropshipping'
        },
        component: () => import("../views/warehouse/OutboundManagement.vue"),
      },
      {
        path: "/warehouse/OutboundDetail",
        name: "OutboundDetail",
        meta:{
          title:'Outbound Management Detail - CoDropshipping'
        },
        component: () => import("../views/warehouse/OutboundDetail.vue"),
      },
      {
        path: "/warehouse/StockList",
        name: "StockList",
        meta:{
          title:'Stock List - CoDropshipping'
        },
        component: () => import("../views/warehouse/StockList.vue"),
      },
      {
        path: "/warehouse/RentCalculation",
        name: "RentCalculation",
        meta:{
          title:'Warehouse Rent Calculation - CoDropshipping'
        },
        component: () => import("../views/warehouse/Rent.vue"),
      },
      {
        path: "/warehouse/SKUManagement",
        name: "SKUManagement",
        meta:{
          title:'SKU Management - CoDropshipping'
        },
        component: () => import("../views/warehouse/SKUManagement.vue"),
      },
      {
        path: "/warehouse/PreloadManagement",
        name: "PreloadManagement",
        meta:{
          title:'Pre-loaded Box Management - CoDropshipping'
        },
        component: () => import("../views/warehouse/PreloadManagement.vue"),
      },
      // {
      //   path: "/warehouse/sourcing",
      //   name: "warehouse",
      //   meta:{
      //     title:'Warehouse - CoDropshipping'
      //   },
      //   component: () => import("../views/warehouse/Warehouse.vue"),
      // },
      // {
      //   path: "/warehouse/logistics",
      //   name: "log_warehouse",
      //   meta:{
      //     title:'Logistics Warehouse - CoDropshipping'
      //   },
      //   component: () => import("../views/warehouse/LogisticsWarehouse.vue"),
      // },
      // {
      //   path: "/warehouse/inboundDetails/:id",
      //   name: "inboundDetails",
      //   meta:{
      //     title:'Inbound Details - CoDropshipping'
      //   },
      //   component: () => import("../views/warehouse/InboundDetail.vue"),
      // },
      {
        path: "/account/profile",
        name: "profile",
        meta:{
          title:'Profile - CoDropshipping'
        },
        component: () => import("../views/Profile.vue"),
      },
      {
        path: "/account/changePassword",
        name: "changePassword",
        meta:{
          title:'Change Password - CoDropshipping'
        },
        component: () => import("../views/ChangePassword.vue"),
      },
      {
        path: "/account/shippingAddresses",
        name: "shippingAddresses",
        meta:{
          title:'Shipping Addresses - CoDropshipping'
        },
        component: () => import("../views/Address.vue"),
      },
      {
        path: "/account/notice",
        name: "notice",
        meta:{
          title:'Notice - CoDropshipping'
        },
        component: () => import("../views/Notice.vue"),
      },
      {
        path: "/account/affiliates",
        name: "affiliates",
        meta:{
          title:'Affiliates - CoDropshipping'
        },
        component: () => import("../views/Affiliates.vue"),
      },
      {
        path: "/account/wallet",
        name: "wallet",
        meta:{
          title:'Wallet - CoDropshipping'
        },
        component: () => import("../views/Wallet.vue"),
      },
      {
        path: "/account/wallet-topup",
        name: "walletTopup",
        meta:{
          title:'Wallet Topup - CoDropshipping'
        },
        component: () => import("../views/WalletTopup.vue"),
      },
      {
        path: "/account/integral",
        name: "integral",
        meta:{
          title:'Integral - CoDropshipping'
        },
        component: () => import("../views/account/Integral.vue"),
      },
      {
        path: "/account/coupons",
        name: "coupons",
        meta:{
          title:'Coupons - CoDropshipping'
        },
        component: () => import("../views/account/Coupons.vue"),
      },
      {
        path: "/account/MemberReview",
        name: "memberReview",
        meta:{
          title:'Member Review - CoDropshipping'
        },
        component: () => import("../views/account/MemberReview.vue"),
      },
      {
        path: "/account/Member",
        name: "member",
        meta:{
          title:'Member - CoDropshipping'
        },
        component: () => import("../views/account/Member.vue"),
      },
      {
        path: "/account/Document",
        name: "document",
        meta:{
          title:'Document - CoDropshipping'
        },
        component: () => import("../views/account/Document.vue"),
      },
      {
        path: "/account/Bill",
        name: "bill",
        meta:{
          title:'Bill - CoDropshipping'
        },
        component: () => import("../views/account/Bill.vue"),
      },
      {
        path: "/account/Shopify",
        name: "shopify",
        meta:{
          title:'Shopify - CoDropshipping'
        },
        component: () => import("../views/account/Shopify.vue"),
      },
      {
        path: "/account/Developer",
        name: "Developer",
        meta:{
          title:'Become a Developer - CoDropshipping'
        },
        component: () => import("../views/account/Developer.vue"),
      },
      {
        path: "/linkStoreCallback",
        name: "linkStoreCallback",
        meta:{
          title:'linkStoreCallback - CoDropshipping'
        },
        component: () => import("../views/account/StoreCallback.vue"),
      },
      {
        path: "/account/ProductList",
        name: "productList",
        meta:{
          title:'Product List - CoDropshipping'
        },
        component: () => import("../views/account/Product.vue"),
      },
      {
        path: "/account/Publish",
        name: "publish",
        meta:{
          title:'Publish - CoDropshipping'
        },
        component: () => import("../views/account/Publish.vue"),
      },
      {
        path: "/account/cart",
        redirect: "/workspace/cart",
      },
      {
        path: "/order",
        name: "orderInfo",
        meta:{
          title:'Order Info - CoDropshipping'
        },
        component: () => import("../views/account/order/create_new.vue"),
      },
      {
        path: "/account/orderDetails",
        name: "orderDetails",
        meta:{
          title:'Order Details - CoDropshipping'
        },
        component: () => import("../views/account/order/details.vue"),
      },
      {
        path: "/account/inventory",
        name: "inventory",
        meta:{
          title:'Inventory Details - CoDropshipping'
        },
        component: () => import("../views/account/order/inventory.vue"),
      },
      {
        path: "/account/outbound",
        name: "outbound",
        meta:{
          title:'Package Information - CoDropshipping'
        },
        component: () => import("../views/account/order/outbound.vue"),
      },
      {
        path: "/account/orderPayment",
        name: "orderPayment",
        meta:{
          title:'Order Payment - CoDropshipping'
        },
        component: () => import("../views/account/order/payment.vue"),
      },
      {
        path: "/account/paymentResult",
        name: "orderPaymentResult",
        meta:{
          title:'Payment Result - CoDropshipping'
        },
        component: () => import("../views/account/order/success.vue"),
      },
      {
        path: "/account/request",
        name: "request",
        meta:{
          title:'Request a Quote - CoDropshipping'
        },
        component: () => import("../views/account/order/request.vue"),
      },
      {
        path: "/account/orderList",
        name: "orderList",
        meta:{
          title:'Order List - CoDropshipping'
        },
        component: () => import("../views/account/order/list_new.vue"),
      },
      {
        path: "/account/storeProduct",
        name: "storeProduct",
        meta:{
          title:'Store Product - CoDropshipping'
        },
        component: () => import("../views/account/StoreProduct.vue"),
      },
      {
        path: "/account/storeOrder",
        name: "storeOrder",
        meta:{
          title:'Store Order - CoDropshipping'
        },
        component: () => import("../views/account/StoreOrder.vue"),
      },
      {
        path: "/account/storeOrderDetails",
        name: "storeOrderDetails",
        meta:{
          title:'Store Order Details - CoDropshipping'
        },
        component: () => import("../views/account/storeOrderDetails.vue"),
      },
      {
        path: "/account/storeOrderPayment",
        name: "storeOrderPayment",
        meta:{
          title:'Store Order Payment - CoDropshipping'
        },
        component: () => import("../views/account/storeOrderPayment.vue"),
      },
      {
        path: "/account/storePaymentResult",
        name: "storePaymentResult",
        meta:{
          title:'Payment Result - CoDropshipping'
        },
        component: () => import("../views/account/storePaymentResult.vue"),
      },
      {
        path: "/account/TopUpResult",
        name: "TopUpResult",
        meta:{
          title:'Top Up Result - CoDropshipping'
        },
        component: () => import("../views/account/TopUpResult.vue"),
      },
      {
        path: "/bindStoreResult",
        name: "bindStoreResult",
        meta:{
          title:'Result - CoDropshipping'
        },
        component: () => import("../views/account/store-bind-result.vue"),
      },
      {
        path: "/main/consolidation",
        name: "consolidation",
        meta:{
          title:'Cargo Consolidation - CoDropshipping'
        },
        component: () => import("../views/consolidation/Index.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to,from,next)=>{
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
});
router.beforeEach((to,from,next)=>{
  if(to.query.ref){
    localStorage.setItem("invitation_code", to.query.ref)
  }
  let token = store.state.user.token
  if(!token || token=='undefined'){
    if(to.path.indexOf('/account')!=-1||to.path.indexOf('/main')!=-1||to.path.indexOf('/order')!=-1
    ||to.path.indexOf('/warehouse')!=-1||to.path.indexOf('/workspace')!=-1){
      // if(to.path == '/main/booking' || to.path == '/main/FCL'){
      if(to.path.indexOf('/account/cart')!=-1 || to.path.indexOf('/warehouse/InventoryStatistics')!=-1
      || to.path.indexOf('/warehouse/RentCalculation')!=-1 || to.path.indexOf('/main/issus')!=-1){
        next()
      }else{
        next({ path: '/login', query: { redirect: to.fullPath } })
      }
    }else{
      next()
    }
  }else{
    next()
  }
});
//   router.beforeEach((to,from,next)=>{
// const key=this.$route.query.key
// if(to.path=='/resetPassword'){
//     await store.dispatch('userLogout');
// }
    
//   });

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})
 
router.afterEach(() => {
  NProgress.done()
})
export default router;
