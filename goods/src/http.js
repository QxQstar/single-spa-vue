import axios from "axios";
import vue from 'vue'
const instance = axios.create({
    timeout: 1000,
    headers:{
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
});
vue.prototype.http = instance;
export default  instance
