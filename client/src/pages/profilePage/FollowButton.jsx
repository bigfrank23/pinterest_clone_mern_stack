import { useMutation, useQueryClient } from "@tanstack/react-query"
import apiRequest from "../../utils/apiRequest"

const followUser = async(username) => {
    const res = await apiRequest.post(`/user/follow/${username}`)

    return res.data
}

const FollowButton = ({isFollowing, username}) => {
     const queryClient = useQueryClient()
    
      const mutation = useMutation({
        mutationFn: followUser,
        onSuccess: () => {
          queryClient.invalidateQueries(["profile", username])
        },
      })

  return (
    <button onClick={()=> mutation.mutate(username)} disabled={mutation.isPending}>{isFollowing ? "Unfollow" : "Follow"}</button>
  )
}

export default FollowButton