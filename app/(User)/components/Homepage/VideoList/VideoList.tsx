"use client";
import { Box, Stack, Typography } from "@mui/material";
import SingleVideo from "../../VideoContent/SingleVideo";
import { useEffect, useRef } from "react";

const videos = [
  {
    url: "https://zuqo.shop/cdn/shop/videos/c/vp/a5065cf121454f3aa76fac33db6bb43d/a5065cf121454f3aa76fac33db6bb43d.HD-1080p-7.2Mbps-93884781.mp4?v=0",
    title: "Video 1",
  },
  {
    url: "https://zuqo.shop/cdn/shop/videos/c/vp/a5065cf121454f3aa76fac33db6bb43d/a5065cf121454f3aa76fac33db6bb43d.HD-1080p-7.2Mbps-93884781.mp4?v=0",
    title: "Video 2",
  },
  {
    url: "https://zuqo.shop/cdn/shop/videos/c/vp/a5065cf121454f3aa76fac33db6bb43d/a5065cf121454f3aa76fac33db6bb43d.HD-1080p-7.2Mbps-93884781.mp4?v=0",
    title: "Video 3",
  },
  {
    url: "https://zuqo.shop/cdn/shop/videos/c/vp/a5065cf121454f3aa76fac33db6bb43d/a5065cf121454f3aa76fac33db6bb43d.HD-1080p-7.2Mbps-93884781.mp4?v=0",
    title: "Video 4",
  },
  {
    url: "https://zuqo.shop/cdn/shop/videos/c/vp/a5065cf121454f3aa76fac33db6bb43d/a5065cf121454f3aa76fac33db6bb43d.HD-1080p-7.2Mbps-93884781.mp4?v=0",
    title: "Video 5",
  },
  {
    url: "https://zuqo.shop/cdn/shop/videos/c/vp/a5065cf121454f3aa76fac33db6bb43d/a5065cf121454f3aa76fac33db6bb43d.HD-1080p-7.2Mbps-93884781.mp4?v=0",
    title: "Video 6",
  },
];

export default function VideoList() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const hasMoved = useRef(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    isDragging.current = true;
    hasMoved.current = false;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
    scrollRef.current.style.cursor = "grabbing";
    scrollRef.current.style.userSelect = "none";
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX.current;
    if (Math.abs(walk) > 5) hasMoved.current = true;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    if (!scrollRef.current) return;
    isDragging.current = false;
    scrollRef.current.style.cursor = "grab";
    scrollRef.current.style.userSelect = "";
  };

  // Prevent click on video if user was dragging
  const handleClickCapture = (e: React.MouseEvent) => {
    if (hasMoved.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 20;
    }
  }, []);

  return (
    <Box
      className="pt-7"
      sx={{
        marginRight: {
          xs: "-35px",
          sm: "0",
        },
      }}
    >
      <Typography className="heading pb-3" variant="h3">
        Trending At ShoeStore
      </Typography>
      <Box
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        onClickCapture={handleClickCapture}
        sx={{
          width: "100%",
          overflowX: "auto",
          overflowY: "hidden",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          cursor: "grab",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        <Stack
          className="video-track"
          direction="row"
          spacing={{ xs: 1.5, sm: 2, md: 2.5 }}
          sx={{ width: "max-content", minWidth: "100%" }}
        >
          {videos.map((v) => (
            <Box key={v.title + "ss"} className="video-item">
              <SingleVideo video={v} />
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
