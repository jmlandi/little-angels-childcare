import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "./adminSidebar";

interface CMSProps {
  pageName: string;
  contentStructure: { [key: string]: string };
}

const CMS: React.FC<CMSProps> = ({ pageName, contentStructure }) => {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<{ [key: string]: string }>(contentStructure);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "LittleAngelsAdmin123#") {
      setIsAuthenticated(true);
      setErrorMessage("");
    } else {
      setErrorMessage("Incorrect password");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
  };

  const fetchContent = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/content/read", {
        params: { pageName },
      });
      const data = response.data.content;
      setContent({
        ...contentStructure,
        ...data,
      });
    } catch (error) {
      console.error("Error fetching content:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const response = await axios.post("/api/content/update", {
        pageName,
        content,
      });
      if (response.status === 200) {
        alert("Content saved successfully!");
      }
    } catch (error) {
      console.error("Error saving content:", error);
      alert("Failed to save content.");
    }
  };

  const handleContentChange = (key: string, value: string) => {
    setContent((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchContent();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-baby-blue text-white">
        <h1 className="text-2xl font-bold mb-4 text-center">Admin Authentication</h1>
        <form onSubmit={handlePasswordSubmit} className="max-w-sm w-full">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full p-2 mb-4 border rounded text-black"
          />
          <button type="submit" className="bg-white text-baby-blue p-2 rounded">
            Submit
          </button>
          {errorMessage && <p className="text-red-300 mt-2 text-center">{errorMessage}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-baby-blue text-white">
      <AdminSidebar /> {/* Componente Sidebar */}
      <div className="flex-1 overflow-auto p-6">
        <div className="flex justify-between mb-4">
          <button onClick={handleLogout} className="bg-white text-baby-blue p-2 rounded">
            Logout
          </button>
          <button onClick={fetchContent} className="bg-white text-baby-blue p-2 rounded">
            Refresh
          </button>
        </div>
        <h1 className="text-2xl font-bold mb-4">{pageName} Page CMS</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {Object.keys(content).map((key) => (
              <div key={key} className="mb-6">
                <h2 className="text-lg font-semibold mb-2">{key.replace("_", " ")}</h2>
                {key.includes("image") ? (
                  <>
                    <input
                      type="text"
                      value={content[key]}
                      onChange={(e) => handleContentChange(key, e.target.value)}
                      className="w-full p-2 mb-4 border rounded text-black"
                      placeholder={`Enter the ${key.replace("_", " ")} URL here...`}
                    />
                    {content[key] && (
                      <img
                        src={content[key]}
                        alt={key}
                        className="w-full max-w-md mt-2"
                      />
                    )}
                  </>
                ) : (
                  <textarea
                    value={content[key]}
                    onChange={(e) => handleContentChange(key, e.target.value)}
                    className="w-full p-2 mb-4 border rounded text-black"
                    rows={3}
                    placeholder={`Enter the ${key.replace("_", " ")} here...`}
                  />
                )}
              </div>
            ))}
            <button
              onClick={handleSave}
              className="bg-white text-baby-blue p-2 rounded"
            >
              Save Content
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CMS;