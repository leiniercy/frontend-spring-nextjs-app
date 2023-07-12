import axios from 'axios';

export default class EmployeeService {
    baseUrl = "http://localhost:8080/api/v1/book/";
    getAll() {
        return axios.get(this.baseUrl + "all").then(res => res.data);
    }
    save(book){
        return axios.post(this.baseUrl + "save",employee).then(res => res.data);
    }

    delete(id){
        return axios.delete(this.baseUrl +"delete/"+id).then(res => res.data);
    }
}