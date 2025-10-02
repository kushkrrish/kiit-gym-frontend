import { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";  // ✅ Correct import
import api from "../api/axios";

const QRScannerComponent = () => {
  const [scanResult, setScanResult] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [isCooldown, setIsCooldown] = useState(false); 

  const verifyEntry = async (qrData) => {
    try {
      setLoading(true);
      setStatus("");

      // QR codes are usually encoded as strings, so parse them
      let parsedData;
      try {
        parsedData = JSON.parse(qrData);
      } catch {
        parsedData = { qrData }; // fallback if not JSON
      }

      const res = await api.post("/admin/scan-entry", parsedData);

      if (res.status === 200) {
        setStatus(` Entry Allowed: ${res.data.message || "Success"}`);
      } else {
        setStatus(`Entry Denied: ${res.data.message || "Invalid QR"}`);
      }
    } catch (e) {
      console.error(e);
      if(e.Error===" entry exist already"){
            setStatus("Server error. already exist.");
      }
      setStatus("Server error. entry already exist. "  );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Admin QR Code Scanner</h1>

      <div className="w-full max-w-md bg-white p-4 rounded-2xl shadow-lg">
        <Scanner
          onScan={(results) => {
            if (!results || results.length === 0) return;
            const result = results[0].rawValue; 
            if (result && result !== scanResult) {
              setScanResult(result);
              verifyEntry(result);
              setIsCooldown(true);
              setTimeout(() => {
                setIsCooldown(false);
                setScanResult("");
              }, 3000);
            }
            
          }}
          onError={(err) => console.error("Scanner Error:", err?.message)}
          constraints={{ facingMode: "environment" }}
          style={{ width: "100%" }}
        />
      </div>

      {loading && (
        <p className="mt-3 text-blue-600 font-medium">⏳ Verifying entry...</p>
      )}

      {status && (
        <div
          className={`mt-4 p-3 rounded-lg shadow-md w-full max-w-md text-center ${
            status.startsWith("✅")
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {status}
        </div>
      )}
    </div>
  );
};

export default QRScannerComponent;
