import { create } from "zustand";
import axios from "axios";
import {useState} from 'react'

const useUserStore = create((set) => ({
    
    users:[],
    

    // Fetch Users from API
    fetchUsers: async () => {
        
        try {
            const response = await axios.get("http://127.0.0.1:5000/api/friends"); // Replace with your API
            set({ users: response.data });
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    },

     // Add a New User
     addUser: async (newUser) => {
        try {
            const response = await axios.post("http://127.0.0.1:5000/friends", newUser,{
                headers: { "Content-Type": "application/json" }
            }); // Replace API
            set((state) => ({
                users: [...state.users, response.data] // Add new user to state
            }));
        } catch (error) {
            console.error("Error adding user:", error);
        }
    },

    // Remove User
    removeUser: async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:5000/friends/${id}`);
            set((state) => ({
                users: state.users.filter(user => user.id !== id),
            }));
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    },

    updateUser: async (newUser) =>{
        try{
        const response = await axios.put(`http://127.0.0.1:5000/friend/${newUser.id}`,  newUser,{
            headers: { "Content-Type": "application/json" }
         })
         set((state) => ({
            users: state.users.map((user) =>
                user.id === newUser.id ? { ...user, ...newUser } : user
            ),
        }));
        }
        catch(error){
            console.error("Error Updating user:", error);
        }
    }
}))

export default useUserStore;