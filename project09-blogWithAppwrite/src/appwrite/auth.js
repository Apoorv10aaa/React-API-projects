import conf from '../conf/conf';
import { Client, Account, ID } from "appwrite";

export class AuthService{
    client=new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId); 

        this.account=new Account(this.client);
    }

    // auth services functions here

    async createAccount({email,password,name}){
        try {
            const userAccount= await this.account.create(ID.unique(),email,password,name);
            if (userAccount) {
                this.login({email,password})
            }
            return userAccount;
            /* if (userAccount) {
                    return this.login({email, password});
                } else {
                    return  userAccount;
                }
            */
            // if account is created we were not sending the userAccount just loggin in
        } catch (error) {
            console.log("appwrite service error | ",error);
            throw error;
        }
    }

    async login({email,password}){
        try {
            return await this.account.createEmailPasswordSession(email,password);
            
        } catch (error) {
            console.log("appwrite service error | ",error);
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("appwrite service error | ",error);
        }
        return null;
    }

    async logout(){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("appwrite service error | ",error);
        }
    }
}
const authService=new AuthService();
export default authService;