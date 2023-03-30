import React from "react";
import { useRouter } from "next/router";
import {
  Accordion,
  Breadcrumb,
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Row,
} from "react-bootstrap";
import Image from "next/image";
import Shirt from "public/shirt.png";
import border from "public/border.png";
import Counter from "components/Counter";
import ReactImageMagnify from "react-image-magnify";
import BreadcrumbNav from "components/BreadcrumbNav";

const { Client, Environment, ApiError } = require("square");

const squareClient = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: Environment.Sandbox,
});

const { catalogApi } = squareClient;

const ProductDetails = ({ catalogObjects }) => {
  const { object: { itemData }, relatedObjects: [ image ] } = catalogObjects

  const smallImage = {
    alt:"picture of shirt",
    src: image.imageData.url,
    width: Shirt.width,
    height: Shirt.height,
    isFluidWidth: false
  }
  
  const largeImage = {
    alt:"picture of shirt",
    src: image.imageData.url,
    width: Shirt.width * 2,
    height: Shirt.height * 2,
    // isFluidWidth: true
  }


  return (
    <Container>
      <BreadcrumbNav />


    </Container>
  );
};

export default ProductDetails;

export async function getServerSideProps(context) {
  const { params: { slug }} = context
  
  var catalogObjects = await (async () => {
    try {
      let catalogResponse = await catalogApi.retrieveCatalogObject(slug, true);
      let parsedObject = catalogResponse.result;

      console.log(parsedObject)

      return parsedObject;
    } catch (error) {
      if (error instanceof ApiError) {
        error.result.errors.forEach(function (e) {
          console.log(e.category);
          console.log(e.code);
          console.log(e.detail);
        });
      } else {
        console.log("Unexpected error occurred: ", error);
      }
    }
  })();

  return {
    props: { catalogObjects },
  };
}

