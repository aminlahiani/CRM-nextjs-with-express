/*!

=========================================================
* NextJS Material Dashboard v1.1.0 based on Material Dashboard React v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/nextjs-material-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/nextjs-material-dashboard/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import App from "next/app";
import Head from "next/head";
import Router from "next/router";

import PageChange from "components/PageChange/PageChange.js";

import "assets/css/nextjs-material-dashboard.css?v=1.1.0";
import wrapper from "../store/store";

import { currentUserSuccess } from "../store/currentUser/currentUserSlice";
import axios from "../utils/axios";


Router.events.on("routeChangeStart", (url) => {
  console.log(`Loading: ${url}`);
  document.body.classList.add("body-page-transition");
  ReactDOM.render(
    <PageChange path={url} />,
    document.getElementById("page-transition")
  );
});
Router.events.on("routeChangeComplete", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  document.body.classList.remove("body-page-transition");
});
Router.events.on("routeChangeError", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  document.body.classList.remove("body-page-transition");
});

const MyApp = ({Component, pageProps}) => {
 

    const Layout = Component.layout || (({ children }) => <>{children}</>);

    return (
      <React.Fragment>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <title>NextJS Material Dashboard by Creative Tim</title>
          <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY_HERE"></script>
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </React.Fragment>
    );
  
}

MyApp.getInitialProps = wrapper.getServerSideProps(async (ctx) => {
  const response  = await axios.get("/users/me", {
    headers: ctx.req && ctx.req.headers
  });
  console.log(response)
  ctx.store.dispatch(currentUserSuccess(response.data.currentUser));
  console.log(response.data.currentUser)
	//ctx.store.dispatch(currentUserSuccess({ _id: "akjbfkjabf" }));
	return {};
});

export default wrapper.withRedux(MyApp);
