import { userUrls,todoUrls } from "../endPoints";
import apiCalls from "./apiCalls";
import { FormValues } from "../../../utils/validation/signUpValidation";
import { TodoFormValues } from "../../../utils/validation/TodoValidation";
import { todo } from "node:test";



export const postLogin = (userData:{email:string,password:string}) => {
    console.log(userData);
    
    return new Promise((resolve, reject) => {
        try {
            apiCalls('post', userUrls.login, userData).then((response)=>{
                resolve(response);
            }).catch((err)=>{
                reject(err);
            })
        } catch (error) {
            resolve({ status: 500, message:"Somethings wrong." });
        }
    })
  
  }

  export const postRegister = (userData: FormValues) => { 
    console.log(userData);
    
    return new Promise((resolve, reject) => {
      try {
        apiCalls("post", userUrls.register, userData)
          .then((response) => {
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
      } catch (error) {
        reject({ status: 500, message: "Error" });
      }
    });
  };

  export const postOtp = (email: string, otp: string) => {
    const data = { email, otp };
  
    console.log("Sending OTP Verification Request:", data);
  
    return new Promise((resolve, reject) => {
      try {
        apiCalls("post", userUrls.verifyOTP, data)
          .then((response) => {
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
      } catch (error) {
        reject({ status: 500, message: "Something went wrong" });
      }
    });
  };
  
  
  export const postResendOtp=(email:{email:string})=>{
    return new Promise((resolve,reject)=>{
      try{
        apiCalls("post",userUrls.resendOTP,email).then((response)=>{
          resolve(response)
        }).catch((err)=>{
          reject(err)
        })
      }catch(error){
        resolve({status:500,message:"something went wrong"})
      }
    })
  }

  export const postTodo = (todos: TodoFormValues, token: string) => {
    return new Promise((resolve, reject) => {
      try {
        apiCalls("post", todoUrls.addTodo, todos, ) 
          .then((response) => resolve(response))
          .catch((err) => reject(err));
      } catch (error) {
        resolve({ status: 500, message: "Something went wrong" });
      }
    });
  };
  
  
  export const deleteTodoApi = (todoId: string, accessToken: string) => { 
    return new Promise((resolve, reject) => {
      try {
        apiCalls("delete", `${todoUrls.deleteTodo}/${todoId}`, {}) 
          .then((response) => resolve(response))
          .catch((err) => reject(err));
      } catch (error) {
        resolve({ status: 500, message: "Something went wrong" });
      }
    });
  };
  
  export const getAllTodo = async ( userId:string) => { 
    try {
      const response = await apiCalls("get", `${todoUrls.getTodo}/${userId}`, {}) 
      return response;
    } catch (error) {
      return { status: 500, message: "Something went wrong" };
    }
  };


  export const markTodoCompletedApi= (todoId: string) => { 
    return new Promise((resolve, reject) => {
      try {
        console.log(todoId);

        apiCalls("patch", `${todoUrls.markAsCompleted}/${todoId}`, {}) 
        
          .then((response) => resolve(response))
          .catch((err) => reject(err));
      } catch (error) {
        resolve({ status: 500, message: "Something went wrong" });
      }
    });
  };


  
  
  
  
  