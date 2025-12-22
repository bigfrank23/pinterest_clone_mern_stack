import { Image } from "@imagekit/react"

const ImageComponent = ({path,alt,className,w,h}) => {
  return (
    <Image
      urlEndpoint={import.meta.env.VITE_URL_IK_ENDPOINT}
      src={path}
      transformation={[{ width: w, height: h }]}
      loading="lazy" // Use "eager" to load immediately. `lazy` is the default value
      // lqip={{ active: true, quality: 20, blur: 10 }}
      alt={alt}
      className={className}
    />
  )
}

export default ImageComponent