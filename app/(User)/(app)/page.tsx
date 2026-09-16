import Image from "next/image";
import Link from "next/link";
import Carousel from "../components/carousel/Carousel";
import { Box } from "@mui/material";
import SinglePolicy from "../components/Homepage/Policy/SinglePolicy";
import Policy from "../components/Homepage/Policy/Policy";

export default function Page() {
  return (
    <>
      <Box sx={{ mx: "-20px", mt: "-20px" }}>
        <Carousel
          images={[
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
          ]}
        />
      </Box>
      <Policy />
      <br />
      <Link href={"/counts"}>Count</Link> |<Link href={"/login"}>Login</Link>
    </>
  );
}
