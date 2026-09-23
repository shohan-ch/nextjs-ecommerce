"use client";

import { Box, Grid, Stack } from "@mui/material";
import React from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

type Props = {
  images: string[];
  videos: string[];
};

const ImageContainer = ({ images, videos }: Props) => {
  const media = React.useMemo(() => {
    return [...images, ...videos];
  }, [images, videos]);
  const [previewImage, setPreviewImage] = React.useState(media[0]);

  const changeImage = (image: string) => {
    setPreviewImage(image);
  };

  const isVideo = (path: string) => {
    return path.toLowerCase().includes(".mp4");
  };

  if (!media.length) return null;
  return (
    <>
      <Grid container spacing={2} sx={styles.gridWrapper}>
        {/* Image selection */}
        <Grid
          size={{ xs: 12, sm: 2, lg: 2 }}
          sx={{ height: "100%", order: { xs: 2, sm: 1 } }}
        >
          <Stack
            direction={{ xs: "row", sm: "column" }}
            spacing={2}
            sx={styles.thumbnailWrapper}
          >
            {media.length > 0 &&
              media.map((i) => (
                <>
                  <Box
                    sx={{
                      width: 43,
                      height: 50,
                      cursor: "pointer",
                      padding: 0.3,
                      border: "1px solid",
                      borderColor: previewImage == i ? "blue.main" : "#e5e5e5",
                      borderRadius: 3,
                      flexShrink: 0,
                      position: "relative",
                    }}
                    onMouseMove={() => changeImage(i)}
                  >
                    {isVideo(i) ? (
                      <>
                        <video
                          style={{
                            borderRadius: 10,
                            objectFit: "cover",
                          }}
                          src={`${i}#t=0.5`}
                          width="100%"
                          height="100%"
                          muted
                          playsInline
                          preload="metadata"
                        />
                        <PlayArrowIcon
                          sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            color: "#fff",
                            filter: "drop-shadow(0 0 2px rgba(0,0,0,0.7))",
                            fontSize: 20,
                            pointerEvents: "none",
                          }}
                        />
                      </>
                    ) : (
                      <img
                        style={{
                          borderRadius: 7,
                          objectFit: "cover",
                        }}
                        width={"100%"}
                        height="100%"
                        src={i}
                        alt={"imag"}
                      />
                    )}
                  </Box>
                </>
              ))}
          </Stack>
        </Grid>

        {/* Image preview  */}
        <Grid
          size={{ xs: 12, sm: 10, lg: 10 }}
          sx={{ order: { xs: 1, sm: 2 } }}
        >
          <Box
            sx={{
              width: "100%",
              height: {
                xs: "200px",
                sm: "300px",
                md: "360px",
                lg: "420px",
                xl: "550px",
              },

              bgcolor: "secondary.light",
              p: 1,
              borderRadius: 2,
            }}
          >
            {isVideo(previewImage) ? (
              <video
                src={previewImage}
                width="100%"
                height="100%"
                controls
              ></video>
            ) : (
              <img
                width="100%"
                height="100%"
                style={{
                  objectFit: "contain",
                  objectPosition: "center",
                }}
                src={previewImage}
                alt="image"
              />
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ImageContainer;

const styles = {
  gridWrapper: {
    height: {
      sm: "300px",
      md: "360px",
      lg: "420px",
      xl: "550px",
    },
  },

  thumbnailWrapper: {
    height: "100%",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
    scrollbarWidth: "none",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
};

// "use client";

// import { Box, Grid, Stack } from "@mui/material";
// import React from "react";

// type Props = {
//   images: string[];
//   videos: string[];
// };

// const ImageContainer = ({ images, videos }: Props) => {
//   const media = React.useMemo(() => [...images, ...videos], [images, videos]);

//   const [previewImage, setPreviewImage] = React.useState(media[0] ?? "");

//   const isVideo = (src: string) => {
//     return src.toLowerCase().split("?")[0].endsWith(".mp4");
//   };

//   const changePreview = (src: string) => {
//     setPreviewImage(src);
//   };

//   if (!media.length) {
//     return null;
//   }

//   return (
//     <Grid
//       container
//       spacing={{ xs: 1.5, sm: 2 }}
//       sx={{
//         width: "100%",
//       }}
//     >
//       {/* Thumbnails */}
//       <Grid
//         size={{ xs: 12, sm: 2, md: 2 }}
//         sx={{
//           order: { xs: 2, sm: 1 },
//           minWidth: 0,
//         }}
//       >
//         <Stack
//           direction={{ xs: "row", sm: "column" }}
//           spacing={{ xs: 1, sm: 1.5 }}
//           sx={{
//             width: "100%",
//             maxHeight: { xs: "80px", sm: "100%" },
//             overflowX: { xs: "auto", sm: "hidden" },
//             overflowY: { xs: "hidden", sm: "auto" },
//             scrollbarWidth: "none",

//             "&::-webkit-scrollbar": {
//               display: "none",
//             },
//           }}
//         >
//           {media.map((item) => {
//             const video = isVideo(item);
//             const active = previewImage === item;

//             return (
//               <Box
//                 key={item}
//                 onClick={() => changePreview(item)}
//                 sx={{
//                   width: {
//                     xs: 60,
//                     sm: 55,
//                     md: 65,
//                     lg: 70,
//                   },
//                   height: {
//                     xs: 65,
//                     sm: 65,
//                     md: 75,
//                     lg: 80,
//                   },

//                   flexShrink: 0,
//                   cursor: "pointer",
//                   padding: "3px",

//                   border: "1px solid",
//                   borderColor: active ? "primary.main" : "#e5e5e5",
//                   borderRadius: 2,

//                   overflow: "hidden",

//                   transition: "border-color 0.2s ease",

//                   "&:hover": {
//                     borderColor: "primary.main",
//                   },
//                 }}
//               >
//                 {video ? (
//                   <video
//                     src={item}
//                     muted
//                     playsInline
//                     preload="metadata"
//                     style={{
//                       width: "100%",
//                       height: "100%",
//                       objectFit: "cover",
//                       borderRadius: "6px",
//                       display: "block",
//                     }}
//                   />
//                 ) : (
//                   <img
//                     src={item}
//                     alt="Product thumbnail"
//                     loading="lazy"
//                     style={{
//                       width: "100%",
//                       height: "100%",
//                       objectFit: "contain",
//                       borderRadius: "6px",
//                       display: "block",
//                     }}
//                   />
//                 )}
//               </Box>
//             );
//           })}
//         </Stack>
//       </Grid>

//       {/* Main Preview */}
//       <Grid
//         size={{ xs: 12, sm: 10, md: 10 }}
//         sx={{
//           order: { xs: 1, sm: 2 },
//           minWidth: 0,
//         }}
//       >
//         <Box
//           sx={{
//             width: "100%",

//             /*
//              * Keeps the preview proportional on every screen.
//              * 1 / 1 = square.
//              */
//             aspectRatio: {
//               xs: "1 / 1",
//               sm: "4 / 3",
//               md: "4 / 3",
//               lg: "4 / 3",
//             },

//             bgcolor: "secondary.light",
//             borderRadius: 2,
//             overflow: "hidden",
//             p: { xs: 0.5, sm: 1 },

//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           {isVideo(previewImage) ? (
//             <video
//               key={previewImage}
//               src={previewImage}
//               controls
//               playsInline
//               style={{
//                 width: "100%",
//                 height: "100%",
//                 objectFit: "contain",
//                 display: "block",
//                 borderRadius: "6px",
//               }}
//             />
//           ) : (
//             <img
//               key={previewImage}
//               src={previewImage}
//               alt="Product preview"
//               style={{
//                 width: "100%",
//                 height: "100%",
//                 objectFit: "contain",
//                 objectPosition: "center",
//                 display: "block",
//                 borderRadius: "6px",
//               }}
//             />
//           )}
//         </Box>
//       </Grid>
//     </Grid>
//   );
// };

// export default ImageContainer;
