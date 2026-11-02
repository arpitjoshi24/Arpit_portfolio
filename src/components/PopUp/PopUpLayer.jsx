export default function PopUpLayer({ z = 0, flat = false, children }) {
  return (
    <div
      data-layer
      data-z={z}
      data-flat={flat ? "1" : "0"}
      style={{
        position: "absolute",
        inset: 0,
        transformOrigin: "50% 100%",
        pointerEvents: "none",
        willChange: "transform",
        filter: flat ? "none" : "drop-shadow(0 6px 5px rgba(50, 30, 10, 0.3))",
      }}
    >
      {children}
    </div>
  );
}