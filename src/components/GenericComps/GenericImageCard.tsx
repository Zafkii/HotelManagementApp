import React, { useState } from "react"
import "./GenericImageCard.css"

export interface AssetItem {
  image: string
  gif: string
}

interface GenericImageCardProps {
  itemType?: string | null // Acepta null explícitamente
  defaultImage: AssetItem
  customTypes?: Record<string, AssetItem>
}

export const GenericImageCard: React.FC<GenericImageCardProps> = ({
  itemType = null,
  defaultImage,
  customTypes = {},
}) => {
  const [hovered, setHovered] = useState(false)

  const currentAsset =
    itemType && customTypes[itemType] ? customTypes[itemType] : defaultImage

  return (
    <div className="generic-image-card">
      {" "}
      <img
        className="generic-image"
        src={hovered ? currentAsset.gif : currentAsset.image}
        alt={itemType ? `${itemType} preview` : "Default preview"}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      />
    </div>
  )
}
