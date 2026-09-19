import { Card, CardMedia } from "@mui/material";

type Props = {
  video: {
    title: string;
    url: string;
  };
};

const SingleVideo = ({ video }: Props) => {
  return (
    <>
      <Card
        sx={{
          width: {
            xs: 182,
            sm: 270,
          },
          height: {
            xs: 325,
            sm: 450,
          },
          flexShrink: 0,
          borderRadius: 5,
        }}
      >
        <CardMedia
          src={video.url}
          component={"video"}
          controls
          // width={"100%"}
          // height={"100%"}
        />

        {/* <video src={video.url} width="full" height="100%" controls></video> */}
      </Card>
    </>
  );
};

export default SingleVideo;
