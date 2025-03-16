import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getUrlsByUserId } from "../../services/UrlService";
import { useSelector } from "react-redux";
import { Button, Card, Input } from "@mui/material";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import {
  Copy,
  Share2,
  Edit,
  Trash,
  MoreVertical,
  BarChart,
} from "lucide-react";
import chainIcon from "../../assets/chain.png";

const Links = () => {
  const userId = useSelector((state) => state.userData.userId);
  const navigate = useNavigate();

  const [urls, setUrls] = useState([]);
  const [newUrl, setNewUrl] = useState("");

  useEffect(() => {
    if (userId != null) fetchUrls(userId);
  }, [userId]);

  const fetchUrls = async (userId) => {
    try {
      const response = await getUrlsByUserId(userId);
      setUrls(response.data);
    } catch (error) {
      console.error("Error fetching URLs:", error);
    }
  };

  // const createUrl = async () => {
  //     if (!newUrl) return;
  //     try {
  //         await axios.post("http://localhost:8080/api/urls", { originalUrl: newUrl, userId: 1 });
  //         setNewUrl("");
  //         fetchUrls();
  //     } catch (error) {
  //         console.error("Error creating URL:", error);
  //     }
  // };

  // const deleteUrl = async (id) => {
  //     try {
  //         await axios.delete(`http://localhost:8080/api/urls/${id}`);
  //         fetchUrls();
  //     } catch (error) {
  //         console.error("Error deleting URL:", error);
  //     }
  // };

  return (
    <div className="container">
      <div className="max-w-6xl my-5 mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">C2S Links</h2>
          <Button
            variant="outlined"
            startIcon={<PlaylistAddIcon />}
            onClick={() => navigate("/links/create")}
          >
            Create Link
          </Button>
        </div>

        <Input placeholder="Search links..." className="mb-4 " />

        {urls.map((url) => (
          <Card
            key={url.id}
            className="mb-4 p-4 flex items-center gap-4 shadow-md"
          >
            <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full">
              <img src={chainIcon} alt="Logo" className="w-8 h-8" />
            </div>

            <div className="flex-1 text-left space-y-2 ">
              {" "}
              <h3 className="font-semibold">{url.title}</h3>
              <a
                href={`https://${url.shortenUrl}`}
                className="text-blue-600 block"
              >
                {url.shortenUrl}
              </a>
              <p className="text-gray-500 text-sm">{url.originalUrl}</p>
              <div className="text-gray-400 text-xs flex items-center gap-2 mt-1">
                <BarChart size={14} />
                <span>Click data</span>
                <span>•</span>
                <span>{url.createdAt}</span>
                <span>•</span>
                <span>No tags</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Copy size={16} />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 size={16} />
              </Button>
              <Button variant="outline" size="icon">
                <Edit size={16} />
              </Button>
              <Button variant="outline" size="icon">
                <Trash size={16} />
              </Button>
              <Button variant="outline" size="icon">
                <MoreVertical size={16} />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Links;
