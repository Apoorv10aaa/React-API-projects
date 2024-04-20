import { Client,ID,Databases,Storage,Query } from "appwrite";
import conf from "../conf/conf";

export class Service{
    client=new Client();
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases=new Databases(this.client);
        this.bucket=new Storage(this.client);
    }
    // database related services

    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,content,featuredImage,status,userId
                }
            )
        } catch (error) {
            console.log("appwrite Database error ",error);
        }
    }

    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,content,featuredImage,status
                }
            )
        } catch (error) {
            console.log("appwrite Database error ",error);
        }
    }
    
    async deletePost(slug){
        try {
            return await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("appwrite Database error ",error);
        }
    }

    async getPost(slug){
        // return the document not true or false.
        try {
            const document=await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return document;
        } catch (error) {
            console.log("appwrite Database error ",error);
        }
    }

    async getPosts(){
        try {
            const posts=await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
            )
            return posts;
        } catch (error) {
            console.log("appwrite Database error ",error.message);
        }
    }

    // Storage related services

    async uploadFle(file){
        // do not return true return fileData as it will used for the id.
        try {
            const fileData=await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
            return fileData;
        } catch (error) {
            console.log("appwrite Database error ",error);
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("appwrite Database error ",error);
        }
    }

    getPreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}
const  service=new Service();
export default service;