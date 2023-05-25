import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Car } from "../components/models/car-model";
import { environment } from "src/environment/environment";
import { Endpoints } from "./endpoints";

@Injectable({
    providedIn: 'root'
})
export class CarService {
    constructor(private http: HttpClient) { }

    getCars() {
        return this.http.get(`${environment.baseUrl}${Endpoints.car.getCar.path()}`);
    }

    createCar(car: Car) {
        return this.http.post(`${environment.baseUrl}${Endpoints.car.createCar.path()}`, car);
    }
}