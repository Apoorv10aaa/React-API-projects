import {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import {Container, PostCard} from '../components'
import { useSelector } from 'react-redux';

function Home() {
    const [posts, setPosts] = useState([])
    const authStatus=useSelector((state)=>state.status)
    const userData=useSelector((state)=>state.userData)

    useEffect(() => {
        if(authStatus){
            appwriteService.getPosts().then((posts) => {
                if (posts) {
                    setPosts(posts.documents)
                }
            })
        }
        
    }, [authStatus])
  
    if (authStatus==false) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }else{
        return (
            <div className='w-full py-4'>
                <Container>
                    <div className='py-5'>
                        <h1 className='text-center text-2xl font-bold'>Your Blogs</h1>
                    </div>
                    <div className='flex flex-wrap'>
                        {posts.map((post) => (
                            post.userId===userData.$id ? (<div key={post.$id} className='p-2 w-1/4'>
                                <PostCard {...post} />
                            </div>) : null 
                        ))}
                    </div>
                </Container>
            </div>
        )
    }
}

export default Home