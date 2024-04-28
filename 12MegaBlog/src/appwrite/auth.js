import conf from "../conf/conf";
import {Client, Account, ID} from 'appwrite';


export class AuthService {

    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl) // Your API Endpoint
            .setProject(conf.appwriteProjectId);   

        this.account = new Account(this.client);
    }

    // Sign Up process / Account Creation
    async createAccount({email, password, name}) {
        try {
            const userAccount =  await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call for login
                return this.login({email, password});
            }
            else {
                return userAccount;
            }
        }
        catch(error) {
            throw error;
        }
    }

    // login service
    async login({email, password}) {
        try {
            return await this.account.createEmailSession(email, password);
        }
        catch(error) {
            throw error;
        }
    }

    // getting the user info if successfully loggedIn    
    async getCurrentUser() {
        try {
            return await this.account.get();  
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error ", error);
        } 

        return null;
    }

    // Logout     
    async logout() {
        try {
            await this.account.deleteSessions();  
        } catch (error) {
            console.log("Appwrite service :: logout :: error ", error);
        } 
        return null;
    }
}

const authService = new AuthService();
export default authService;