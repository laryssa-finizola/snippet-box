export function PackageIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      {...props} 
      viewBox="0 0 200 200" 
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Lado esquerdo da caixa (cor mais escura) */}
      <path
        d="M100 50 L50 75 L50 125 L100 150 L100 100 Z"
        fill="#E879F9" 
        stroke="#C026D3"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Lado direito da caixa (cor média) */}
      <path
        d="M100 50 L150 75 L150 125 L100 150 L100 100 Z"
        fill="#F0ABFC" 
        stroke="#C026D3"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Topo da caixa (cor clara) */}
      <path
        d="M100 50 L50 75 L100 100 L150 75 Z"
        fill="#FAE8FF" 
        stroke="#C026D3" 
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Linha central do topo */}
      <line
        x1="100"
        y1="50"
        x2="100"
        y2="100"
        stroke="#C026D3"  
        strokeWidth="2"
      />
    </svg>
  );
}