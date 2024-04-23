import {useForm} from 'react-hook-form'
import {useNavigate} from 'react-router-dom'
import appwriteService from '../appwrite/config'
import {useSelector} from 'react-redux'
import { useCallback, useEffect } from 'react';
import {Input,Button,RTE,Select} from './index'


export default function PostForm({post}){
    const navigate=useNavigate();
    const {register,handleSubmit,watch,control,setValue,getValues}=useForm({
        defaultValues:{
            title:post?.title || "",
            slug:post?.$id || "",
            status:post?.status || "",
            content:post?.content || "active"
        }
    });
    const userData=useSelector((state)=> state.userData)

    const submit=async(data)=>{
        //if there is a post then update functionality
        if(post){
            //uploading file or image.
            const file=data.image[0] ? await appwriteService.uploadFle(data.image[0]) : null;
            //delete previous image only if new image is added
            if (file) {
                appwriteService.deleteFile(post.featuredImage);
            }
            //updatingPost
            const dbPost=await appwriteService.updatePost(post.$id,{
                ...data,
                featuredImage:file ? file.$id : undefined
            })
            if(dbPost) navigate(`/post/${dbPost.$id}`)
            //if there was no earlier post
        }else{
            const file=await appwriteService.uploadFle(data.image[0]);
            console.log("fileData",file);
            //create post with userId
            const dbPost=await appwriteService.createPost({
                ...data,
                featuredImage:file ? file.$id : undefined,
                userId:userData.$id
            })
            console.log("dbPost",dbPost);
            if(dbPost) navigate(`/post/${dbPost.$id}`)
        }
    }

    // why useCallback: u will see that this slug Transform function will be called
    // as many times as title field will change so it better to memoize this function. 
    const slugTransform=useCallback((value)=>{
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    },[])

    //why useEffect: track any changes in watch and other dependencies
    // watch function is used to subscribe to specific form field values. 
    // It allows the component to re-render whenever the watched fields change,
    // making it useful for dynamically updating other parts of the UI based on input values.

    useEffect(()=>{
        const subscription=watch((value,{name})=>{
            if(name=="title"){
                setValue("slug",slugTransform(value.title))
            }
        })
        return ()=>subscription.unsubscribe()
    },[watch,setValue])
    // Subscribe and UnSubscribe part : set up subscription of watch ki dhyan dena shuru karo uspe
    // Unsubscribe :it tells watch to stop notifying your callback about changes.
    // to prevent unnecessary memory use after component is of no use or "unmounted"
    
    return (
        <>
        <div className='text-center' >
        {post ? 
            (<h1 className='font-bold text-2xl'>
                Update Post
            </h1>)
            : 
            (<h1 className='font-bold text-2xl'>
                Create Post
            </h1>)
        }
            
        </div>
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue="Write your content here" />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getPreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
        </>
    );
}