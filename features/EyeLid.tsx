//features\EyeLid.tsx
type Props = {
  position: "top" | "bottom";
  open: boolean;
};

export default function Eyelid({
  position,
  open,
}: Props) {
  const isTop = position === "top";

  return (
    <svg
      viewBox="0 0 1000 500"
      preserveAspectRatio="none"
      style={{
        position: "absolute",
        left: 0,
        width: "100%",
        height: "75%",
        [isTop ? "top" : "bottom"]: 0,
        transform: open
          ? `translateY(${isTop ? "-75%" : "75%"})`
          : "translateY(0)",
        transition: "transform .45s ease-in-out",
        zIndex: 1000,
        pointerEvents: "none",
      }}
    >
      {isTop ? (
        <path
          d="
            M0,0
            L1000,0
            L1000,220
            Q500,500 0,220
            Z
          "
          fill="#111"
        />
      ) : (
        <path
          d="
            M0,280
            Q500,0 1000,280
            L1000,500
            L0,500
            Z
          "
          fill="#111"
        />
      )}
    </svg>
  );
}