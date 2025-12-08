// import { axiosPrivate } from "../api/axios";
// import { useEffect } from "react";
// import useRefreshToken from "./useRefreshToken";
// import {useAuth} from '../Context/AuthContext'

// const useAxiosPrivate = () => {
//     const refresh = useRefreshToken();
//     const { auth } = useAuth();

//     useEffect(() => {

//         const requestIntercept = axiosPrivate.interceptors.request.use(
//             config => {
//                 if (!config.headers['authorization']) {
//                     config.headers['authorization'] = `Bearer ${auth?.accessToken}`;
//                 }
//                 return config;
//             }, (error) => Promise.reject(error)
//         );

//         const responseIntercept = axiosPrivate.interceptors.response.use(
//             response => response,
//             async (error) => {
//                 const prevRequest = error?.config;
//                 if (error?.response?.status === 403 && !prevRequest?.sent) {
//                     prevRequest.sent = true;
//                     const newAccessToken = await refresh();
//                     prevRequest.headers['authorization'] = `Bearer ${newAccessToken}`;
//                     return axiosPrivate(prevRequest);
//                 }
//                 return Promise.reject(error);
//             }
//         );

//         return () => {
//             axiosPrivate.interceptors.request.eject(requestIntercept);
//             axiosPrivate.interceptors.response.eject(responseIntercept);
//         }
//     }, [auth, refresh])

//     return axiosPrivate;
// }

// export default useAxiosPrivate;




// import { axiosPrivate } from "../api/axios";
// import { useEffect } from "react";
// import useRefreshToken from "./useRefreshToken";
// import { useAuth } from '../Context/AuthContext';


// const useAxiosPrivate = () => {
//     const refresh = useRefreshToken();
//     const { auth, setAuth } = useAuth();

//     useEffect(() => {
//         const requestIntercept = axiosPrivate.interceptors.request.use(
//             (config) => {
//                 if (!config.headers['authorization']) {
//                     config.headers['authorization'] = `Bearer ${auth?.accessToken}`;
//                 }
//                 console.log("Outgoing Request Config:", config); // Debugging
//                 return config;
//             },
//             (error) => Promise.reject(error)
//         );

//         const responseIntercept = axiosPrivate.interceptors.response.use(
//             (response) => response,
//             async (error) => {
//                 const prevRequest = error?.config;
//                 if (error?.response?.status === 403 && !prevRequest?.sent) {
//                     prevRequest.sent = true;
//                     try {
//                         const newAccessToken = await refresh();
//                         console.log("New AccessToken:", newAccessToken); // Debugging
//                         setAuth((prev) => ({ ...prev, accessToken: newAccessToken }));
//                         prevRequest.headers['authorization'] = `Bearer ${newAccessToken}`;
//                         return axiosPrivate(prevRequest);
//                     } catch (refreshError) {
//                         console.error("Token refresh failed:", refreshError);
//                         return Promise.reject(refreshError);
//                     }
//                 }
//                 return Promise.reject(error);
//             }
//         );

//         return () => {
//             axiosPrivate.interceptors.request.eject(requestIntercept);
//             axiosPrivate.interceptors.response.eject(responseIntercept);
//         };
//     }, [auth, refresh, setAuth]);

//     return axiosPrivate;
// };


// export default useAxiosPrivate;


import { axiosPrivate } from '../api/axios';
import { useEffect } from 'react';
import useRefreshToken from './useRefreshToken';
import { useAuth } from '../Context/ThemeContext';

// const useAxiosPrivate = () => {
//     const refresh = useRefreshToken();
//     const { auth, setAuth } = useAuth();

//     useEffect(() => {
//         const requestIntercept = axiosPrivate.interceptors.request.use(
//             (config) => {
//                 if (!config.headers['authorization']) {
//                     config.headers['authorization'] = `Bearer ${auth?.accessToken}`;
//                 }
//                 return config;
//             },
//             (error) => Promise.reject(error)
//         );

//         const responseIntercept = axiosPrivate.interceptors.response.use(
//             (response) => response,
//             async (error) => {
//                 const prevRequest = error?.config;
//                 if (error?.response?.status === 403 && !prevRequest?.sent) {
//                     prevRequest.sent = true;
//                     try {
//                         const newAccessToken = await refresh();
//                         prevRequest.headers['authorization'] = `Bearer ${newAccessToken}`;
//                         return axios(prevRequest);
//                     } catch (refreshError) {
//                         console.error("Token refresh failed:", refreshError);
//                         return Promise.reject(refreshError);
//                     }
//                 }
//                 return Promise.reject(error);
//             }
//         );

//         return () => {
//             axios.interceptors.request.eject(requestIntercept);
//             axios.interceptors.response.eject(responseIntercept);
//         };
//     }, [auth, refresh, setAuth]);

//     return axios;
// };


const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { user } = useAuth();

    useEffect(() => {
        console.log("Auth state in useAxiosPrivate:", user);
        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config) => {
                console.log("Request Interceptor Triggered:");
                console.log("Auth object:", user); // Log the auth object
                console.log("Config before setting Authorization:", config);

                if (!config.headers['authorization']) {
                    const token = user?.accessToken;
                    console.log("Setting Authorization header with token:", token);
                    config.headers['authorization'] = `Bearer ${token}`;
                }

                console.log("Config after setting Authorization:", config);
                return config;
            },
            (error) => {
                console.error("Request Interceptor Error:", error);
                return Promise.reject(error);
            }
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            (response) => {
                console.log("Response Interceptor Success:", response);
                return response;
            },
            async (error) => {
                console.error("Response Interceptor Error:", error);

                const prevRequest = error?.config;
                console.log("Previous Request:", prevRequest);

                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    console.log("Access token might be expired. Attempting refresh...");
                    prevRequest.sent = true;

                    try {
                        const AccessToken = await refresh();
                        console.log("New Access Token obtained:", AccessToken);

                        prevRequest.headers['authorization'] = `Bearer ${AccessToken}`;
                        console.log("Retrying request with new token:", prevRequest);

                        return axiosPrivate(prevRequest);
                    } catch (refreshError) {
                        console.error("Token refresh failed:", refreshError);
                        return Promise.reject(refreshError);
                    }
                }

                console.error("Response Interceptor Error (unhandled):", error);
                return Promise.reject(error);
            }
        );

        return () => {
            console.log("Ejecting interceptors...");
            axios.interceptors.request.eject(requestIntercept);
            axios.interceptors.response.eject(responseIntercept);
        };
    }, [user, refresh]);

    return axiosPrivate;
};


export default useAxiosPrivate;
