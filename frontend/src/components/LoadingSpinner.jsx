function LoadingSpinner({
  size = 18,
  color = "white",
}) {
  return (
    <>
      <span
        style={{
          width: size,
          height: size,

          border: `2px solid rgba(255,255,255,.35)`,

          borderTop: `2px solid ${color}`,

          borderRadius: "50%",

          display: "inline-block",

          animation: "spin .8s linear infinite",
        }}
      />

      <style>
        {`
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }

            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </>
  );
}

export default LoadingSpinner;