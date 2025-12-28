import { Image } from "@imagekit/react"

const ImageComponent = ({path,src,alt,className,w,h}) => {
  const imageSrc = path || src

  if (!imageSrc) return null

  return (
    <Image
      urlEndpoint={import.meta.env.VITE_URL_IK_ENDPOINT}
      src={imageSrc}
      // path={path}
      // src={src}
      transformation={[{ width: w, height: h }]}
      loading="lazy" // Use "eager" to load immediately. `lazy` is the default value
      // lqip={{ active: true, quality: 20, blur: 10 }}
      alt={alt}
      className={className}
    />
  )
}

export default ImageComponent