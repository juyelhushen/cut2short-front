import React from "react";
import {
  Card,
  CardContent,
  Button,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import qrcodesImg from "../../assets/qrcode.jpg";
import analyticesImg from "../../assets/analytices.jpg";
import urlImg from "../../assets/url.jpg";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const features = [
    {
      title: "Make it short",
      description: "Go to links",
      image: urlImg,
      link: "/dashboard/links",
    },
    {
      title: "Make it scannable",
      description: "Go to Codes",
      image: qrcodesImg,
      link: "/qrcodes",
    },
    {
      title: "Analytics",
      description: "View Analytics",
      image: analyticesImg,
      link: "/analytics",
    },
  ];

  return (
    <Box className="p-6 bg-gray-100 h-full">
      <Typography variant="h5" fontWeight="bold" className="mb-4">
        Your Connections Platform
      </Typography>

      <Box className="bg-blue-50 text-blue-600 p-3 rounded-md mb-4 text-sm">
        ✨ Get custom links and a complimentary domain.{" "}
        <a href="/upgrade" className="text-blue-500 font-semibold">
          Upgrade now
        </a>
      </Box>

      <Box className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="shadow-md rounded-lg overflow-hidden  p-3 "
          >
            <CardContent className="flex flex-row space-x-5 items-center justify-center text-center bg-blue-50">
              <img
                src={feature.image}
                alt={feature.title}
                className="w-32 h-32 mb-2"
              />
              <Divider
                orientation="vertical"
                flexItem
                sx={{ marginX: "5px" }}
                className="bg-gray-300"
              />
              <Box display={"flex"} flexDirection={"column"} gap={"10px"}>
                <Typography variant="h6" fontWeight="bold">
                  {feature.title}
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => navigate(feature.link)}
                  className="mt-2"
                >
                  {feature.description}
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Home;
