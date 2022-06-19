import axios from "axios";

const API = axios.create({
    baseURL: 'http://localhost:5000/api', 
    validateStatus: function (status) { 
        return true 
    }
});

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`; 
    }
    return req;
});
// FONDS
export const fetchFonds = () => API.get('/fonds');
export const searchFonds = (search, location, category) => API.get(`/fonds?search=${search}&location=${location}&category=${category}`);
export const fetchFondById = (id) => API.get(`/fonds/${id}`);
export const createFond = async (fond) => API.post(`/fonds/add-fond`, fond);
export const updateFond = async (fond) => API.post(`/fonds/${fond.id}/update-fond`, fond);
// EVENTS
export const fetchEvents = () =>API.get('/events');
export const fetchEventsByFondId = (fondId) =>API.get(`/events/fond/${fondId}`);
export const fetchEventsByUserId = (userId) =>API.get(`/events/user/${userId}`);
export const fetchEventById = (id) => API.get(`/events/${id}`);
export const createEvent = (event, fondId, userId) => API.post(`/events/add-event?fondId=${fondId}&userId=${userId}`, event);
// DONATIONS
export const fetchDonationsByFondId = (fondId) => API.get(`donations/fond/${fondId}`);
export const fetchDonationsByEventId = (eventId) => API.get(`donations/event/${eventId}`);
export const fetchDonationsByUserId = (userId) => API.get(`donations/user/${userId}`);
export const donate = (donation, fondId, eventId, userId) =>API.post(`donations/add-donation?fondId=${fondId}${eventId ? `&eventId=${eventId}`: ''}${userId ? `&userId=${userId}`: ''}`, donation);
// AUTH
export const isExists = (email) => API.post(`/users/ifexists?email=${email}`);
export const updateUser = (formData) => API.post(`/users/${formData.id}/update-user`, formData);
export const signIn = (formData) => API.post('/login', formData);
export const signUp = (formData) => API.post('/signup', formData);

// QUESTION
export const sendQuestion = (formData) => API.post('/send-question-email', formData);
export const sendRequest = (formData) => API.post('/send-request-email', formData);