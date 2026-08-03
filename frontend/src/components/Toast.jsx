import { CheckCircle, AlertCircle } from "lucide-react";

function Toast({ show, message, type = "success" }) {
  if (!show) return null;

  const isSuccess = type === "success";

  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",

        display: "flex",
        alignItems: "center",
        gap: "10px",

        padding: "14px 18px",

        borderRadius: "12px",

        background: isSuccess ? "#16A34A" : "#DC2626",

        color: "white",

        fontWeight: 600,

        boxShadow: "0 12px 30px rgba(0,0,0,.15)",

        zIndex: 9999,

        animation: "toastFade .25s ease",
      }}
    >
      {isSuccess ? <CheckCircle size={20} /> : <AlertCircle size={20} />}

      {message}

      <style>
        {`
          @keyframes toastFade {

            from{

              opacity:0;

              transform:translateY(12px);

            }

            to{

              opacity:1;

              transform:translateY(0);

            }

          }
        `}
      </style>
    </div>
  );
}

export default Toast;
