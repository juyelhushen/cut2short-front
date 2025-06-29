import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteUrlsId, getUrlsByUserId } from "../../services/UrlService";
import { useSelector } from "react-redux";
import { Button, Card, Input } from "@mui/material";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { Copy, Share2, Edit, Trash, MoreVertical, BarChart } from "lucide-react";
import chainIcon from "../../assets/chain.png";
import { toast } from "react-toastify";
import useConfirmation from "../../hooks/useConfirmation";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import useLoading from "../../hooks/useLoading";
import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion

const Links = () => {
  const userId = useSelector((state) => state.userData.userId);
  const navigate = useNavigate();
  const { openDialog, ConfirmationDialog } = useConfirmation();
  const { LoadingComponent, startLoading, stopLoading } = useLoading();

  const [urls, setUrls] = useState([]);
  const [newUrl, setNewUrl] = useState("");

  useEffect(() => {
    if (userId != null) fetchUrls(userId);
  }, [userId]);

  const fetchUrls = async (userId) => {
    try {
      startLoading();
      const response = await getUrlsByUserId(userId);
      setUrls(response.data);
    } catch (error) {
      console.error("Error fetching URLs:", error);
    } finally {
      stopLoading();
    }
  };

  const handleDelete = (id) => {
    openDialog(
      "Delete Short URL",
      "This will permanently delete the short URL and all its analytics data.",
      async () => {
        try {
          startLoading();
          const response = await deleteUrlsId(id);
          if (response.success) {
            stopLoading();
            fetchUrls(userId);
            toast.success("URL deleted successfully");
          }
        } catch (error) {
          toast.error("Failed to delete URL", error);
        }
      },
      {
        confirmText: "Delete",
        cancelText: "Keep it",
        icon: DeleteOutlineIcon,
      }
    );
  };

  const handleEdit = (id) => {
    navigate(`edit/${id}`, { relative: "path" });
  };

  // Animation variants for Framer Motion
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { scale: 1.02, transition: { duration: 0.2 } },
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <ConfirmationDialog />
      <LoadingComponent />

      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-2xl p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4 md:mb-0">
            C2S Links
          </h2>
          <Button
            variant="contained"
            startIcon={<PlaylistAddIcon />}
            onClick={() => navigate("create", { relative: "path" })}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
          >
            Create Link
          </Button>
        </div>

        <Input
          placeholder="Search links..."
          className="w-full mb-6 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <AnimatePresence>
          {urls.map((url) => (
            <motion.div
              key={url.id}
              className="mb-6"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={cardVariants}
              whileHover="hover"
            >
              <Card
                className="p-6 flex items-center gap-6 bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:shadow-lg transition-shadow duration-300 rounded-xl"
              >
                <div className="w-16 h-16 flex items-center justify-center bg-blue-100 rounded-full">
                  <img
                    src={chainIcon}
                    alt="Chain Icon"
                    className="w-10 h-10 transition-transform duration-300 hover:scale-110"
                  />
                </div>

                <div className="flex-1 text-left space-y-2">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {url.title}
                  </h3>
                  <a
                    href={`https://${url.shortenUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 font-medium block transition-colors duration-200"
                  >
                    {url.shortenUrl}
                  </a>
                  <p className="text-gray-600 text-sm truncate max-w-xs">
                    {url.originalUrl}
                  </p>
                  <div className="text-gray-500 text-xs flex items-center gap-3 mt-2">
                    <BarChart size={14} />
                    <span>{url.hitCount} Clicks</span>
                    <span className="text-gray-400">•</span>
                    <span>{new Date(url.createdAt).toLocaleDateString()}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-400">No tags</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      className="text-blue-600 border-blue-600 hover:bg-blue-50"
                    >
                      <Copy size={16} />
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      className="text-green-600 border-green-600 hover:bg-green-50"
                    >
                      <Share2 size={16} />
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      className="text-yellow-600 border-yellow-600 hover:bg-yellow-50"
                      onClick={() => handleEdit(url.id)}
                    >
                      <Edit size={16} />
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      className="text-red-600 border-red-600 hover:bg-red-50"
                      onClick={() => handleDelete(url.id)}
                    >
                      <Trash size={16} />
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      className="text-gray-600 border-gray-600 hover:bg-gray-50"
                    >
                      <MoreVertical size={16} />
                    </Button>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Links;