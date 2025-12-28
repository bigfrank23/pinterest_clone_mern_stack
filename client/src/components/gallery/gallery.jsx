import './gallery.css'
import GalleryItem from '../galleryItem/galleryItem.jsx'
import { useInfiniteQuery} from '@tanstack/react-query'
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios'

const fetchPins = async({pageParam, search, userId, boardId}) => {
  ///THIS 
  // const res = await axios.get(`${import.meta.env.VITE_URL_API_ENDPOINT}/pins?cursor=${pageParam}&search=${search || ""}&userId=${userId || ""}&boardId=${boardId || ""}`)
  ///OR THIS. CLEARNER APPROACH
  const res = await axios.get(
  `${import.meta.env.VITE_URL_API_ENDPOINT}/pins`,
  {
    params: {
      cursor: pageParam,
      search,
      userId,
      boardId,
    },
  }
)

  return res.data
}

const Gallery = ({search, userId, boardId}) => {

   const {data, fetchNextPage, hasNextPage, status} = useInfiniteQuery({ 
    queryKey: ['pins', search, userId, boardId], 
    queryFn: ({pageParam = 0})=> fetchPins({pageParam, search, userId, boardId}),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor
  })

  if (status === "pending") return "Loading..."
  if (status === "error") return "An error has occurred "

  //  console.log(data);

   const allPins = data?.pages?.flatMap((page)=> page.pins) || []
   
  return (
    <InfiniteScroll
      dataLength={allPins.length} //This is important field to render the next data
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
        <div className="gallery">
          {allPins?.map((item) => (
            <GalleryItem key={item._id} item={item} />
          ))
          }
        </div>
    </InfiniteScroll>
  )
}

export default Gallery