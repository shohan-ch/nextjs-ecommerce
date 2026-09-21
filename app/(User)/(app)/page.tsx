import Image from "next/image";
import Link from "next/link";
import Carousel from "../components/Carousel/Carousel";
import { Box, Container } from "@mui/material";
import SinglePolicy from "../components/Homepage/Policy/SinglePolicy";
import Policy from "../components/Homepage/Policy/Policy";
import FeatureProduct from "../components/Homepage/FeatureProduct/FeatureProduct";
import Banner from "../components/Homepage/Banner/Banner";
import HomeCategory from "../components/Homepage/HomeCategory/HomeCategory";
import VideoList from "../components/Homepage/VideoList/VideoList";
import Footer from "./footer";

const carouselImages = [
  {
    path: "https://images.pexels.com/photos/6224289/pexels-photo-6224289.jpeg?_gl=1*p1n2jx*_ga*MjkyNDY0ODU1LjE3ODk0NzMxMDI.*_ga_8JE65Q40S6*czE3ODk0NzMxMDIkbzEkZzEkdDE3ODk0NzMxMzgkajI0JGwwJGgw",
    title: "Image 1",
    description: "sss",
  },
  {
    path: "https://images.pexels.com/photos/37808158/pexels-photo-37808158.jpeg",
    title: "Image 2",
    description: "dffdsf",
  },
  {
    path: "https://images.pexels.com/photos/1502311/pexels-photo-1502311.jpeg",
    title: "Image 3",
    description: "sdfds",
  },
];

const bannerImage =
  "https://cdn.shopify.com/s/files/1/2287/9679/files/New-GV-strip-banner_jpg_e282a120-5f3e-4cdc-8781-e1baeca433de.jpg?v=1786964158";

export default function Page() {
  return (
    <>
      <Box sx={{ mx: "-20px", mt: "-20px" }}>
        <Carousel images={carouselImages} />
      </Box>
      <Container maxWidth="xl">
        <Policy />
        <FeatureProduct />
        <Banner image={bannerImage} />
        <HomeCategory />
        <VideoList />
      </Container>
    </>
  );
}
