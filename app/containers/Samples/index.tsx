import React from "react";
import {
  SiNextdotjs,
  SiFirebase,
  SiMui,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import {
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import PineCone from "@/public/svg/pinecone.svg";
import LangChain from "@/public/svg/langChain.svg";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const Samples = () => {
  return (
    <Box sx={{ px: 2, py: 4 }}>
      <Card
        variant="outlined"
        sx={{
          border: "2px solid",
          borderColor: "transparent",
          background: "linear-gradient(to bottom, red, white) border-box",
          backgroundClip: "padding-box, border-box",
          borderRadius: 2,
          p: 0,
          mb: 4,
          boxShadow: "0 4px 20px 0 rgba(0, 0, 0, 0.05)",
          overflow: "hidden",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -1,
            borderRadius: 2,
            padding: "2px",
            background: "inherit",
            mask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "source-out",
            maskComposite: "subtract",
          },
        }}
      >
        <CardContent
          sx={{
            px: 2,
            py: 4,
            background: "linear-gradient(to bottom, red, white) border-box",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" fontWeight={"bold"} textAlign="center">
                Technologies Used
              </Typography>
            </Grid>
            <Grid
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                "& svg": {
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.1)",
                  },
                },
              }}
              item
              xs={12}
            >
              {[
                {
                  icon: <SiNextdotjs size={40} />,
                  title: "Next.js",
                  color: "black",
                  hoverColor: "black",
                },
                {
                  icon: <SiFirebase size={40} />,
                  title: "Firebase",
                  color: "black",
                  hoverColor: "#FFA611",
                },
                {
                  icon: <SiMui size={40} />,
                  title: "Material-UI",
                  color: "black",
                  hoverColor: "#059BE5",
                },
                {
                  icon: <SiTailwindcss size={40} />,
                  title: "Tailwind CSS",
                  color: "black",
                  hoverColor: "#059BE5",
                },
                {
                  icon: <SiTypescript size={40} />,
                  title: "TypeScript",
                  color: "black",
                  hoverColor: "#059BE5",
                },
                {
                  icon: <PineCone width={40} height={40} />,
                  title: "Pinecone",
                  color: "black",
                  hoverColor: "black",
                },
                {
                  icon: <LangChain width={40} height={40} />,
                  title: "LangChain",
                  color: "black",
                  hoverColor: "black",
                },
              ].map((item, index) => (
                <Tooltip title={item.title} key={index}>
                  <IconButton
                    sx={{
                      color: item.color,
                      "&:hover": {
                        color: item.hoverColor,
                      },
                      m: 1, // Add margin for spacing
                    }}
                  >
                    {item.icon}
                  </IconButton>
                </Tooltip>
              ))}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" fontWeight={"bold"} gutterBottom>
                Chat with PDF Project Overview
              </Typography>
              <Typography variant="body1" paragraph>
                Our app is designed to enhance your understanding of projects by
                providing a seamless way to interact with{" "}
                <span style={{ fontWeight: "bold" }}>PDF documents</span>. The
                first version includes the following features and limitations:
              </Typography>
              <Typography variant="body1" component="ul">
                {[
                  "Upload and interact with small-sized PDF documents.",
                  "A minimum of two PDF documents is required for interaction.",
                  "Pro version with more advanced features coming soon.",
                ].map((text, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <PictureAsPdfIcon style={{ color: "black" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography fontWeight={"bold"}>{text}</Typography>
                      }
                    />
                  </ListItem>
                ))}
              </Typography>
              <Box mt={2}>
                <Typography variant="body1" paragraph>
                  Please note that the current version is focused on smaller PDF
                  files, but we are actively working on expanding the
                  capabilities.
                </Typography>
                <Typography variant="body1" paragraph>
                  The project is scheduled to be completed within 15 days. Stay
                  tuned for more updates and upcoming projects from{" "}
                  <span style={{ fontWeight: "bold" }}>BTM INDUSTRIES</span>.
                </Typography>
                <Typography
                  color={"red"}
                  textAlign={"end"}
                  variant="body1"
                  fontWeight={"bold"}
                  paragraph
                >
                  - Britto Thomas
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Samples;
